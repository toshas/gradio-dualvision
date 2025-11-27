# Copyright 2023-2025 Marigold Team, ETH Zürich. All rights reserved.
# This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
# See https://creativecommons.org/licenses/by-sa/4.0/ for details.
# --------------------------------------------------------------------------
# DualVision is a Gradio template app for image processing. It was developed
# to support the Marigold project. If you find this code useful, we kindly
# ask you to cite our most relevant papers.
# More information about Marigold:
#   https://marigoldmonodepth.github.io
#   https://marigoldcomputervision.github.io
# Efficient inference pipelines are now part of diffusers:
#   https://huggingface.co/docs/diffusers/using-diffusers/marigold_usage
#   https://huggingface.co/docs/diffusers/api/pipelines/marigold
# Examples of trained models and live demos:
#   https://huggingface.co/prs-eth
# Related projects:
#   https://marigolddepthcompletion.github.io/
#   https://rollingdepth.github.io/
# Citation (BibTeX):
#   https://github.com/prs-eth/Marigold#-citation
#   https://github.com/prs-eth/Marigold-DC#-citation
#   https://github.com/prs-eth/rollingdepth#-citation
# --------------------------------------------------------------------------
import json
import os.path
import tempfile
from pathlib import Path
from typing import Union, Tuple, Optional

import gradio
import numpy as np
from PIL import Image
from gradio import image_utils
from gradio_client import utils as client_utils
from gradio.components.imageslider import image_tuple
from gradio.data_classes import GradioRootModel, JsonData, ImageData


class ImageSliderPlusData(GradioRootModel):
    root: Union[
        Tuple[ImageData | None, ImageData | None, JsonData | None],
        Tuple[ImageData | None, ImageData | None],
        None,
    ]


class ImageSlider(gradio.ImageSlider):
    data_model = ImageSliderPlusData

    def postprocess(
        self,
        value: image_tuple,
    ) -> ImageSliderPlusData:
        if value is None:
            return ImageSliderPlusData(root=(None, None, None))

        settings = None
        if type(value[0]) is str:
            settings_candidate_path = value[0] + ".settings.json"
            if os.path.isfile(settings_candidate_path):
                with open(settings_candidate_path, "r") as fp:
                    settings = json.load(fp)

        fn_format_selector = lambda x: "png" if (isinstance(x, np.ndarray) and x.dtype == np.uint16 and x.squeeze().ndim == 2) or (isinstance(x, Image.Image) and x.mode == "I;16") else self.format
        format_0 = fn_format_selector(value[0])
        format_1 = fn_format_selector(value[1])

        return ImageSliderPlusData(
            root=(
                image_utils.postprocess_image(
                    value[0], cache_dir=self.GRADIO_CACHE, format=format_0
                ),
                image_utils.postprocess_image(
                    value[1], cache_dir=self.GRADIO_CACHE, format=format_1
                ),
                JsonData(settings),
            ),
        )

    def preprocess(self, payload: ImageSliderPlusData) -> image_tuple:
        if payload is None:
            return None
        if payload.root is None:
            raise ValueError("Payload is None.")

        out_0 = image_utils.preprocess_image(
            payload.root[0],
            cache_dir=self.GRADIO_CACHE,
            format=self.format,
            image_mode=self.image_mode,
            type=self.type,
        )
        out_1 = image_utils.preprocess_image(
            payload.root[1],
            cache_dir=self.GRADIO_CACHE,
            format=self.format,
            image_mode=self.image_mode,
            type=self.type,
        )

        if len(payload.root) > 2 and payload.root[2] is not None:
            with open(out_0 + ".settings.json", "w") as fp:
                json.dump(payload.root[2].root, fp)

        return out_0, out_1

    @staticmethod
    def resize_and_save(image_path: str, max_dim: int, square: bool = False) -> str:
        img = Image.open(image_path).convert("RGB")
        if square:
            width, height = img.size
            min_side = min(width, height)
            left = (width - min_side) // 2
            top = (height - min_side) // 2
            right = left + min_side
            bottom = top + min_side
            img = img.crop((left, top, right, bottom))
        img.thumbnail((max_dim, max_dim))
        temp_file = tempfile.NamedTemporaryFile(suffix=".webp", delete=False)
        img.save(temp_file.name, "WEBP")
        return temp_file.name

    def process_example_dims(
        self, input_data: tuple[str | Path | None] | None, max_dim: Optional[int] = None, square: bool = False
    ) -> image_tuple:
        if input_data is None:
            return None
        input_data = (str(input_data[0]), str(input_data[1]))
        if self.proxy_url or client_utils.is_http_url_like(input_data[0]):
            return input_data[0]
        if max_dim is not None:
            input_data = (
                self.resize_and_save(input_data[0], max_dim, square),
                self.resize_and_save(input_data[1], max_dim, square),
            )
        return (
            self.move_resource_to_block_cache(input_data[0]),
            self.move_resource_to_block_cache(input_data[1]),
        )

    def process_example(
        self, input_data: tuple[str | Path | None] | None
    ) -> image_tuple:
        return self.process_example_dims(input_data, 256, True)

