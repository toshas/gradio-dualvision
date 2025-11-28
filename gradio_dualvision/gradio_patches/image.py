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

import PIL
import gradio
import numpy as np
from PIL import Image as PILImage
from gradio import image_utils
from gradio.data_classes import ImageData


class Image(gradio.Image):
    def postprocess(
        self,
        value,
    ) -> ImageData:
        fn_format_selector = lambda x: (
            "png"
            if (
                isinstance(x, np.ndarray)
                and x.dtype == np.uint16
                and x.squeeze().ndim == 2
            )
            or (isinstance(x, PILImage.Image) and x.mode == "I;16")
            else self.format
        )
        format = fn_format_selector(value)

        out = image_utils.postprocess_image(
            value,
            cache_dir=self.GRADIO_CACHE,
            format=format,
        )

        if type(value) is str:
            settings_candidate_path = value + ".settings.json"
            if os.path.isfile(settings_candidate_path):
                with open(settings_candidate_path, "r") as fp:
                    settings = json.load(fp)
                out.meta["settings"] = settings

        return out

    def preprocess(
        self, payload: ImageData
    ) -> str | PIL.Image.Image | np.ndarray | None:
        out = super().preprocess(payload)

        if "settings" in payload.meta:
            with open(out + ".settings.json", "w") as fp:
                json.dump(payload.meta["settings"], fp)

        return out

    @staticmethod
    def resize_and_save(image_path: str, max_dim: int, square: bool = False) -> str:
        img = PILImage.open(image_path).convert("RGB")

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

    def process_example(
        self, input_data: str | Path | None
    ) -> str | PIL.Image.Image | np.ndarray | None:
        thumbnail = self.resize_and_save(input_data, 256, True)
        out = super().process_example(thumbnail)
        return out
