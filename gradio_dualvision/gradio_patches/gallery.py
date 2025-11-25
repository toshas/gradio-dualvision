from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor

from gradio_client import utils as client_utils
from gradio.components.gallery import GalleryImage, GalleryData, GalleryMediaType, CaptionedGalleryMediaType, GalleryVideo
from pathlib import Path
from urllib.parse import quote, urlparse

import gradio
import numpy as np
import PIL.Image
from gradio_client.utils import is_http_url_like

from gradio import processing_utils, utils, image_utils
from gradio.data_classes import FileData, ImageData


class Gallery(gradio.Gallery):
    def postprocess(
            self,
            value: list[GalleryMediaType | CaptionedGalleryMediaType] | None,
    ) -> GalleryData:
        """
            This is a patched version of the original function, wherein the format for PIL is computed based on the data type:
            format = "png" if img.mode == "I;16" else "webp"

            Parameters:
                value: Expects the function to return a `list` of images or videos, or `list` of (media, `str` caption) tuples. Each image can be a `str` file path, a `numpy` array, or a `PIL.Image` object. Each video can be a `str` file path.
            Returns:
                a list of images or videos, or list of (media, caption) tuples
            """
        if value is None:
            return GalleryData(root=[])
        if isinstance(value, str):
            raise ValueError(
                "The `value` passed into `gr.Gallery` must be a list of images or videos, or list of (media, caption) tuples."
            )
        output = []

        def _save(img):
            url = None
            caption = None
            orig_name = None
            mime_type = None
            if isinstance(img, (tuple, list)):
                img, caption = img
            if isinstance(img, np.ndarray):
                file = processing_utils.save_img_array_to_cache(
                    img, cache_dir=self.GRADIO_CACHE, format=self.format
                )
                file_path = str(utils.abspath(file))
            elif isinstance(img, PIL.Image.Image):
                format = "png" if img.mode == "I;16" else "webp"  # Patch 1: change format based on the inbound dtype
                file = processing_utils.save_pil_to_cache(
                    img, cache_dir=self.GRADIO_CACHE, format=format
                )
                file_path = str(utils.abspath(file))
            elif isinstance(img, str):
                mime_type = client_utils.get_mimetype(img)
                if img.lower().endswith(".svg"):
                    svg_content = image_utils.extract_svg_content(img)
                    orig_name = Path(img).name
                    url = f"data:image/svg+xml,{quote(svg_content)}"
                    file_path = None
                elif is_http_url_like(img):
                    url = img
                    orig_name = Path(urlparse(img).path).name
                    file_path = img
                else:
                    url = None
                    orig_name = Path(img).name
                    file_path = img
            elif isinstance(img, Path):
                file_path = str(img)
                orig_name = img.name
                mime_type = client_utils.get_mimetype(file_path)
            else:
                raise ValueError(f"Cannot process type as image: {type(img)}")
            if mime_type is not None and "video" in mime_type:
                return GalleryVideo(
                    video=FileData(
                        path=file_path,  # type: ignore
                        url=url,
                        orig_name=orig_name,
                        mime_type=mime_type,
                    ),
                    caption=caption,
                )
            else:
                return GalleryImage(
                    image=ImageData(
                        path=file_path,
                        url=url,
                        orig_name=orig_name,
                        mime_type=mime_type,
                    ),
                    caption=caption,
                )

        with ThreadPoolExecutor() as executor:
            for o in executor.map(_save, value):
                output.append(o)
        return GalleryData(root=output)
