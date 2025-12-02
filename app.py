# Copyright 2023-2025 Marigold Team, ETH Zürich. All rights reserved.
# This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
# See https://creativecommons.org/licenses/by-sa/4.0/ for details.
# --------------------------------------------------------------------------
# DualVision is a Gradio template app for image processing, developed to
# support the Marigold project: https://marigoldcomputervision.github.io

import gradio as gr
from PIL import Image, ImageFilter

from gradio_dualvision import DualVisionApp


class ImageFiltersApp(DualVisionApp):
    DEFAULT_FILTER_SIZE = 15

    def make_header(self):
        """
        Create a header section with Markdown and HTML.
        """
        gr.Markdown(
            f"""
            ## {self.title}
            """
        )
        with gr.Row(elem_classes="remove-elements"):
            gr.Markdown(
                f"""
                <p align="center">
                <a title="Github" href="https://github.com/toshas/gradio-dualvision" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                    <img src="https://img.shields.io/github/stars/toshas/gradio-dualvision?label=GitHub%20%E2%98%85&logo=github&color=C8C" alt="badge-github-stars">
                </a>
                <a title="Social" href="https://twitter.com/antonobukhov1" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                    <img src="https://shields.io/twitter/follow/:?label=Subscribe%20for%20updates!" alt="social">
                </a>
                </p>
                <p align="center" style="margin-top: 0px;">
                    Upload a photo or select an example to process the input in real time.
                    Use the slider to reveal areas of interest.
                    Use the radio-buttons to switch between modalities.
                </p>
                """
            )

    def build_user_components(self):
        """
        Create gradio components for the Advanced Settings dropdown, that will be passed into the `process` method.
        Use gr.Row(), gr.Column(), and other context managers to arrange the components. Return them as a flat dict.
        """
        filter_size = gr.Slider(
            minimum=1,
            maximum=51,
            value=self.DEFAULT_FILTER_SIZE,
            step=2,
            label="Filter size",
        )
        return {
            "filter_size": filter_size,
        }

    def process(self, image_in: Image.Image, **kwargs):
        """
        Process an input image into multiple modalities using the provided arguments or default settings.
        Returns two dictionaries: one containing the modalities and another with the actual settings.
        """
        # Downscale the image to 1024px on the longer side
        scale = min(1.0, 1024 / max(image_in.width, image_in.height))
        image_in = image_in.resize((round(image_in.width * scale), round(image_in.height * scale)), Image.LANCZOS)        

        # Read settings from kwargs or use default
        filter_size = kwargs.get("filter_size", self.DEFAULT_FILTER_SIZE)

        # Process the input image in a variety of ways
        image_out_gray = image_in.convert("L")
        image_out_gaussian = image_in.filter(ImageFilter.GaussianBlur(filter_size // 2))
        image_out_median = image_in.filter(ImageFilter.MedianFilter(filter_size))

        # Return the results and current settings to update the UI
        out_modalities = {
            "Gray": image_out_gray,
            "Gaussian": image_out_gaussian,
            "Median": image_out_median,
        }
        out_settings = {
            "filter_size": filter_size,
        }
        return out_modalities, out_settings


with ImageFiltersApp(
    title="Gradio DualVision",
    examples_path="examples",
    examples_per_page=5,
    squeeze_canvas=True,
    spaces_zero_gpu_enabled=True,
) as demo:
    demo.queue(
        api_open=False,
    ).launch(
        server_name="0.0.0.0",
        server_port=7860,
        ssr_mode=False,
    )
