from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from gradio.components.gallery import (
    GalleryImageType,
    CaptionedGalleryImageType,
    GalleryImage,
    GalleryData,
)
from pathlib import Path
from urllib.parse import urlparse

import gradio
import numpy as np
import PIL.Image
from gradio_client.utils import is_http_url_like

from gradio import processing_utils, utils, wasm_utils
from gradio.data_classes import FileData


class Gallery(gradio.Gallery):
    def postprocess(
        self,
        value: list[GalleryImageType | CaptionedGalleryImageType] | None,
    ) -> GalleryData:
        """
        This is a patched version of the original function, wherein the format for PIL is computed based on the data type:
        format = "png" if img.mode == "I;16" else "webp"
        """
        if value is None:
            return GalleryData(root=[])
        output = []

        def _save(img):
            url = None
            caption = None
            orig_name = None
            if isinstance(img, (tuple, list)):
                img, caption = img
            if isinstance(img, np.ndarray):
                file = processing_utils.save_img_array_to_cache(
                    img, cache_dir=self.GRADIO_CACHE, format=self.format
                )
                file_path = str(utils.abspath(file))
            elif isinstance(img, PIL.Image.Image):
                format = "png" if img.mode == "I;16" else "webp"
                file = processing_utils.save_pil_to_cache(
                    img, cache_dir=self.GRADIO_CACHE, format=format
                )
                file_path = str(utils.abspath(file))
            elif isinstance(img, str):
                file_path = img
                if is_http_url_like(img):
                    url = img
                    orig_name = Path(urlparse(img).path).name
                else:
                    url = None
                    orig_name = Path(img).name
            elif isinstance(img, Path):
                file_path = str(img)
                orig_name = img.name
            else:
                raise ValueError(f"Cannot process type as image: {type(img)}")
            return GalleryImage(
                image=FileData(path=file_path, url=url, orig_name=orig_name),
                caption=caption,
            )

        if wasm_utils.IS_WASM:
            for img in value:
                output.append(_save(img))
        else:
            with ThreadPoolExecutor() as executor:
                for o in executor.map(_save, value):
                    output.append(o)
        return GalleryData(root=output)
