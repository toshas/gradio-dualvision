# Copyright 2023-2025 Marigold Team, ETH Zürich. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
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
from pathlib import Path
from typing import Union, Tuple

from PIL import Image
from gradio import processing_utils
from gradio.data_classes import FileData, GradioRootModel, JsonData
from gradio_client import utils as client_utils
from gradio_imageslider import ImageSlider
from gradio_imageslider.imageslider import image_tuple


class ImageSliderPlusData(GradioRootModel):
    root: Union[Tuple[FileData | None, FileData | None, JsonData | None], None]


class ImageSliderPlus(ImageSlider):
    data_model = ImageSliderPlusData

    def as_example(self, value):
        return self.process_example(value)

    def _format_image(self, im: Image):
        if self.type != "filepath":
            raise ValueError("ImageSliderPlus can be only created with type='filepath'")
        if im is None:
            return im
        fmt = im.format
        path = processing_utils.save_pil_to_cache(
            im, cache_dir=self.GRADIO_CACHE, format=fmt or "png"
        )
        self.temp_files.add(path)
        return path

    def postprocess(
        self,
        y: image_tuple,
    ) -> ImageSliderPlusData | None:
        if y is None:
            return None

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

        if x.root[2] is not None:
            with open(out_0 + ".settings.json", "w") as fp:
                json.dump(x.root[2].root, fp)

        return out_0, out_1

    def process_example(
        self, input_data: tuple[str | Path | None] | None
    ) -> image_tuple:
        if input_data is None:
            return None
        input_data = (str(input_data[0]), str(input_data[1]))
        if self.proxy_url or client_utils.is_http_url_like(input_data[0]):
            return input_data[0]
        return (
            self.move_resource_to_block_cache(input_data[0]),
            self.move_resource_to_block_cache(input_data[1]),
        )
