from __future__ import annotations

import warnings
from pathlib import Path
from typing import Literal, cast

import gradio
from gradio.image_utils import decode_base64_to_file, decode_base64_to_image, decode_base64_to_image_array, format_image
import numpy as np
import PIL.Image
from PIL import ImageOps

from gradio import processing_utils
from gradio.data_classes import ImageData
from gradio.exceptions import Error

PIL.Image.init()  # fixes https://github.com/gradio-app/gradio/issues/2843 (remove when requiring Pillow 9.4+)


def patched_preprocess_image(
    payload: ImageData | None,
    cache_dir: str,
    format: str,
    image_mode: Literal[
        "1", "L", "P", "RGB", "RGBA", "CMYK", "YCbCr", "LAB", "HSV", "I", "F"
    ]
    | None,
    type: Literal["numpy", "pil", "filepath"],
) -> np.ndarray | PIL.Image.Image | str | None:
    if payload is None:
        return payload

    if payload.url and payload.url.startswith("data:"):
        if type == "pil":
            print("Preprocessing payload as PIL image")
            return decode_base64_to_image(payload.url)
        elif type == "numpy":
            print("Preprocessing payload as numpy array")
            return decode_base64_to_image_array(payload.url)
        elif type == "filepath":
            print("Preprocessing payload as file path")
            return decode_base64_to_file(payload.url, cache_dir, format)

    if payload.path is None:
        raise ValueError("Image path is None.")

    file_path = Path(payload.path)

    if payload.orig_name:
        p = Path(payload.orig_name)
        name = p.stem
        suffix = p.suffix.replace(".", "")
        if suffix in ["jpg", "jpeg"]:
            suffix = "jpeg"
    else:
        name = "image"
        suffix = "webp"

    if suffix.lower() == "svg":
        if type == "filepath":
            return str(file_path)
        raise Error("SVG files are not supported as input images for this app.")

    im = PIL.Image.open(file_path)
    exif = im.getexif()

    if suffix.lower() in ["heif", "heic"] and type == "filepath":
        im = im.convert("RGB")

    if exif.get(274, 1) != 1 and hasattr(ImageOps, "exif_transpose"):
        # 274 is the code for image rotation and 1 means "correct orientation"
        try:
            im = ImageOps.exif_transpose(im)
            Path(file_path).resolve().write_bytes(processing_utils.encode_pil_to_bytes(im, format="webp"))
        except Exception:
            warnings.warn(f"Failed to transpose image {file_path} based on EXIF data.")

    max_dim = max(im.width, im.height)
    if max_dim > 2048:
        scale = min(1.0, 2048 / max_dim)
        im = im.resize((round(im.width * scale), round(im.height * scale)), PIL.Image.BILINEAR)
        Path(file_path).resolve().write_bytes(processing_utils.encode_pil_to_bytes(im, format="webp"))

    if type == "filepath" and (image_mode in [None, im.mode]):
        return str(file_path)

    if suffix.lower() != "gif" and im is not None:
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            if image_mode is not None:
                im = im.convert(image_mode)

    return format_image(
        im,
        type=cast(Literal["numpy", "pil", "filepath"], type),
        cache_dir=cache_dir,
        name=name,
        format=suffix,
    )


gradio.image_utils.preprocess_image = patched_preprocess_image
