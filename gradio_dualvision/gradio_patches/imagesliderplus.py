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

import numpy as np
from PIL import Image
from gradio import processing_utils
from gradio import utils
from gradio.data_classes import FileData, GradioRootModel, JsonData
from gradio_client import utils as client_utils
from gradio_imageslider import ImageSlider
from gradio_imageslider.imageslider import image_tuple, image_variants


class ImageSliderPlusData(GradioRootModel):
    root: Union[
        Tuple[FileData | None, FileData | None, JsonData | None],
        Tuple[FileData | None, FileData | None],
        None,
    ]


class ImageSliderPlus(ImageSlider):
    data_model = ImageSliderPlusData

    def as_example(self, value):
        return self.process_example_dims(value, 256, True)

    def _format_image(self, im: Image):
        if self.type != "filepath":
            raise ValueError("ImageSliderPlus can be only created with type='filepath'")
        if im is None:
            return im
        format = "png" if im.mode == "I;16" else "webp"
        path = processing_utils.save_pil_to_cache(
            im, cache_dir=self.GRADIO_CACHE, format=format
        )
        self.temp_files.add(path)
        return path

    def _postprocess_image(self, y: image_variants):
        if isinstance(y, np.ndarray):
            format = "png" if y.dtype == np.uint16 and y.squeeze().ndim == 2 else "webp"
            path = processing_utils.save_img_array_to_cache(
                y, cache_dir=self.GRADIO_CACHE, format=format
            )
        elif isinstance(y, Image.Image):
            format = "png" if y.mode == "I;16" else "webp"
            path = processing_utils.save_pil_to_cache(
                y, cache_dir=self.GRADIO_CACHE, format=format
            )
        elif isinstance(y, (str, Path)):
            path = y if isinstance(y, str) else str(utils.abspath(y))
        else:
            raise ValueError("Cannot process this value as an Image")

        return path

    def postprocess(
        self,
        y: image_tuple,
    ) -> ImageSliderPlusData:
        if y is None:
            return ImageSliderPlusData(root=(None, None, None))

        settings = None
        if type(y[0]) is str:
            settings_candidate_path = y[0] + ".settings.json"
            if os.path.isfile(settings_candidate_path):
                with open(settings_candidate_path, "r") as fp:
                    settings = json.load(fp)

        return ImageSliderPlusData(
            root=(
                FileData(path=self._postprocess_image(y[0])),
                FileData(path=self._postprocess_image(y[1])),
                JsonData(settings),
            ),
        )

    def preprocess(self, x: ImageSliderPlusData) -> image_tuple:
        if x is None:
            return x

        out_0 = self._preprocess_image(x.root[0])
        out_1 = self._preprocess_image(x.root[1])

        if len(x.root) > 2 and x.root[2] is not None:
            with open(out_0 + ".settings.json", "w") as fp:
                json.dump(x.root[2].root, fp)

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
        return self.process_example_dims(input_data)
