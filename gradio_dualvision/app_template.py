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
import glob
import json
import os
import re
from typing import Dict, Any, Optional

import gradio as gr
import spaces
from PIL import Image
from gradio.components.base import Component

from .gradio_patches.examples import Examples
from .gradio_patches.imagesliderplus import ImageSliderPlus
from .gradio_patches.radio import Radio


class DualVisionApp(gr.Blocks):
    def __init__(
        self,
        title,
        examples_path="examples",
        examples_per_page=5,
        examples_cache="lazy",
        squeeze_canvas=True,
        squeeze_viewport_height_pct=75,
        key_original_image="Original",
        spaces_zero_gpu_enabled=False,
        spaces_zero_gpu_duration=None,
        slider_position=0.5,
        slider_line_color="#FFF",
        slider_line_width="4px",
        slider_arrows_color="#FFF",
        slider_arrows_width="2px",
        **kwargs,
    ):
        """
        A wrapper around Gradio Blocks class that implements an image processing demo template. All the user has to do
        is to subclass this class and implement two methods: `process` implementing the image processing, and
        `build_user_components` implementing Gradio components reading the additional processing arguments.
        Args:
            title: Title of the application (str, required).
            examples_path: Base path where examples will be searched (Default: `"examples"`).
            examples_per_page: How many examples to show at the bottom of the app (Default: `5`).
            examples_cache: Examples caching policy, corresponding to `cache_examples` argument of gradio.Examples (Default: `"lazy"`).
            squeeze_canvas: When True, the image is fit to the browser viewport. When False, the image is fit to width (Default: `True`).
            squeeze_viewport_height_pct: Percentage of the browser viewport height (Default: `75`).
            key_original_image: Name of the key under which the input image is shown in the modality selectors (Default: `"Original"`).
            spaces_zero_gpu_enabled: When True, the app wraps the processing function with the ZeroGPU decorator.
            spaces_zero_gpu_duration: Defines an integer duration in seconds passed into the ZeroGPU decorator.
            slider_position: Position of the slider between 0 and 1 (Default: `0.5`).
            slider_line_color: Color of the slider line (Default: `"#FFF"`).
            slider_line_width: Width of the slider line (Default: `"4px"`).
            slider_arrows_color: Color of the slider arrows (Default: `"#FFF"`).
            slider_arrows_width: Width of the slider arrows (Default: `2px`).
            **kwargs: Any other arguments that Gradio Blocks class can take.
        """
        squeeze_viewport_height_pct = int(squeeze_viewport_height_pct)
        if not 50 <= squeeze_viewport_height_pct <= 100:
            raise gr.Error(
                "`squeeze_viewport_height_pct` should be an integer between 50 and 100."
            )
        if not os.path.isdir(examples_path):
            raise gr.Error("`examples_path` should be a directory.")
        if not 0 <= slider_position <= 1:
            raise gr.Error("`slider_position` should be between 0 and 1.")
        kwargs = {k: v for k, v in kwargs.items()}
        kwargs["title"] = title
        self.examples_path = examples_path
        self.examples_per_page = examples_per_page
        self.examples_cache = examples_cache
        self.key_original_image = key_original_image
        self.slider_position = slider_position
        self.input_keys = None
        if spaces_zero_gpu_enabled:
            self.process_components = spaces.GPU(
                self.process_components, duration=spaces_zero_gpu_duration
            )
        self.head = ""
        self.head += """
            <script>
                let observerFooterButtons = new MutationObserver((mutationsList, observer) => {
                    const oldButtonLeft = document.querySelector(".show-api");
                    const oldButtonRight = document.querySelector(".built-with");
                    if (!oldButtonRight || !oldButtonLeft) {
                        return;
                    }
                    observer.disconnect();
                    const newButtonLeft = document.createElement("a");
                    newButtonLeft.href = "https://github.com/toshas/gradio-dualvision";
                    newButtonLeft.className = oldButtonLeft.className;
                    newButtonLeft.text = "Built with Gradio DualVision";
                    newButtonLeft.style.textDecoration = "none";
                    newButtonLeft.style.display = "inline-block";
                    newButtonLeft.style.cursor = "pointer";
                    oldButtonLeft.parentNode.replaceChild(newButtonLeft, oldButtonLeft);
                    const newButtonRight = document.createElement("a");
                    newButtonRight.href = "https://www.obukhov.ai";
                    newButtonRight.className = oldButtonRight.className;
                    newButtonRight.text = "Template by Anton Obukhov";
                    newButtonRight.style.textDecoration = "none";
                    newButtonRight.style.display = "inline-block";
                    newButtonRight.style.cursor = "pointer";
                    oldButtonRight.parentNode.replaceChild(newButtonRight, oldButtonRight);
                });
                observerFooterButtons.observe(document.body, { childList: true, subtree: true });
            </script>
        """
        if kwargs.get("analytics_enabled") is not False:
            self.head += f"""
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-1FWSVCGZTG"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {{dataLayer.push(arguments);}}
                    gtag('js', new Date());
                    gtag('config', 'G-1FWSVCGZTG');
                </script>
            """
        self.css = f"""
            .sliderrow {{                /* center the slider */
                display: flex;
                justify-content: center;
            }}
            .slider {{                   /* center the slider */
                display: flex;
                justify-content: center;
                width: 100%;
            }}
            .slider .disabled {{         /* hide the main slider before image load */
                visibility: hidden;
            }}
            .slider .svelte-9gxdi0 {{    /* hide the component label in the top-left corner before image load */
                visibility: hidden;
            }}
            .slider .svelte-kzcjhc .icon-wrap {{
                height: 0px;             /* remove unnecessary spaces in captions before image load */
            }}
            .slider .svelte-kzcjhc.wrap {{
                padding-top: 0px;        /* remove unnecessary spaces in captions before image load */
            }}
            .slider .svelte-3w3rth {{    /* hide the dummy icon from the right pane before image load */
                visibility: hidden;
            }}
            .slider .svelte-106mu0e a {{ /* hide the download button */
                visibility: hidden;
            }}
            .slider .fixed {{            /* fix the opacity of the right pane image */
                background-color: var(--anim-block-background-fill);
            }}
            .slider .inner {{            /* style slider line */
                width: {slider_line_width};
                background: {slider_line_color};
            }}
            .slider .icon-wrap svg {{    /* style slider arrows */
                stroke: {slider_arrows_color};
                stroke-width: {slider_arrows_width};
            }}
            .slider .icon-wrap path {{    /* style slider arrows */
                fill: {slider_arrows_color};
            }}
            .gallery.svelte-l4wpk0 {{        /* make examples gallery tiles square */
                width: calc(100vw / 8);
                height: calc(100vw / 8);
            }}
            .gallery.svelte-l4wpk0 img {{    /* make examples gallery tiles square */
                width: calc(100vw / 8);
                height: calc(100vw / 8);
                clip-path: inset(0 0 0 0);  /* remove slider line from previews */
            }}
            .gallery.svelte-l4wpk0 span {{   /* remove slider line from previews */
                visibility: hidden;
            }}
            h1, h2, h3 {{                    /* center markdown headings */
                text-align: center;
                display: block;
            }}
        """
        if squeeze_canvas:
            self.head += """
                <script>
                    // fixes gradio-imageslider wrong position behavior when using fitting to content by triggering resize
                    let observerSlider = new MutationObserver((mutationsList, observer) => {
                        let slider = document.querySelector(".slider");
                        if (!slider) {
                            return;
                        }
                        observer.disconnect();
                        let observerSliderImage = new MutationObserver((mutations) => {
                            let img = slider.querySelector("img");
                            if (img && img.complete) {
                                window.dispatchEvent(new Event('resize'));
                            }
                        });
                        observerSliderImage.observe(slider, { childList: true, subtree: true });
                    });
                    observerSlider.observe(document.body, { childList: true, subtree: true });
                </script>
            """
            self.css += f"""
                .slider {{               /* make the slider dimensions fit to the uploaded content dimensions */
                    max-width: fit-content;
                }}
                .slider .half-wrap {{    /* make the empty component width almost full before image load */
                    width: 70vw;
                }}
                .slider img {{           /* Ensures image fits inside the viewport */
                    max-height: {squeeze_viewport_height_pct}vh;
                }}
            """
        else:
            self.css += f"""
                .slider .half-wrap {{    /* make the upload area full width */
                    width: 100%;
                }}
            """
        kwargs["css"] = kwargs.get("css", "") + self.css
        kwargs["head"] = kwargs.get("head", "") + self.head
        super().__init__(**kwargs)
        with self:
            self.make_interface()

    def process(self, image_in: Image.Image, **kwargs):
        """
        Process an input image into multiple modalities using the provided arguments or default settings.
        Returns two dictionaries: one containing the modalities and another with the actual settings.
        Override this method in a subclass.
        """
        raise NotImplementedError("Please override the `process` method.")

    def build_user_components(self):
        """
        Create gradio components for the Advanced Settings dropdown, that will be passed into the `process` method.
        Use gr.Row(), gr.Column(), and other context managers to arrange the components. Return them as a flat dict.
        Override this method in a subclass.
        """
        raise NotImplementedError("Please override the `build_user_components` method.")

    def discover_examples(self):
        """
        Looks for valid image filenames.
        """
        pattern = re.compile(r".*\.(jpg|JPG|jpeg|JPEG|png|PNG)$")
        paths = glob.glob(f"{self.examples_path}/*")
        out = list(sorted(filter(pattern.match, paths)))
        return out

    def process_components(
        self, image_in, modality_selector_left, modality_selector_right, **kwargs
    ):
        """
        Wraps the call to `process`. Returns results in a structure used by the gallery, slider, radio components.
        """
        if image_in is None:
            raise gr.Error("Input image is required")

        image_settings = {}
        if isinstance(image_in, str):
            image_settings_path = image_in + ".settings.json"
            if os.path.isfile(image_settings_path):
                with open(image_settings_path, "r") as f:
                    image_settings = json.load(f)
            image_in = Image.open(image_in).convert("RGB")
        else:
            if not isinstance(image_in, Image.Image):
                raise gr.Error(f"Input must be a PIL image, got {type(image_in)}")
            image_in = image_in.convert("RGB")
        image_settings.update(kwargs)

        results_dict, results_settings = self.process(image_in, **image_settings)

        if not isinstance(results_dict, dict):
            raise gr.Error(
                f"`process` must return a dict[str, PIL.Image]. Got type: {type(results_dict)}"
            )
        if len(results_dict) == 0:
            raise gr.Error("`process` did not return any modalities")
        for k, v in results_dict.items():
            if not isinstance(k, str):
                raise gr.Error(
                    f"Output dict must have string keys. Found key of type {type(k)}: {repr(k)}"
                )
            if k == self.key_original_image:
                raise gr.Error(
                    f"Output dict must not have an '{self.key_original_image}' key; it is reserved for the input"
                )
            if not isinstance(v, Image.Image):
                raise gr.Error(
                    f"Value for key '{k}' must be a PIL Image, got type {type(v)}"
                )
        if len(results_settings) != len(self.input_keys):
            raise gr.Error(
                f"Expected number of settings ({len(self.input_keys)}), returned ({len(results_settings)})"
            )
        if any(k not in results_settings for k in self.input_keys):
            raise gr.Error(f"Mismatching setgings keys")
        results_settings = {k: results_settings[k] for k in self.input_keys}

        results_dict = {
            self.key_original_image: image_in,
            **results_dict,
        }

        results_state = [[v, k] for k, v in results_dict.items()]
        modalities = list(results_dict.keys())

        modality_left = (
            modality_selector_left
            if modality_selector_left in modalities
            else modalities[0]
        )
        modality_right = (
            modality_selector_right
            if modality_selector_right in modalities
            else modalities[1]
        )

        return [
            results_state,  # goes to a gr.Gallery
            [
                results_dict[modality_left],
                results_dict[modality_right],
            ],  # ImageSliderPlus
            Radio(
                choices=modalities,
                value=modality_left,
                label="Left",
                key="Left",
            ),
            Radio(
                choices=modalities,
                value=modality_right,
                label="Right",
                key="Right",
            ),
            *results_settings.values(),
        ]

    def on_process_first(
        self,
        image_slider,
        modality_selector_left=None,
        modality_selector_right=None,
        *args,
    ):
        image_in = image_slider[0]
        input_dict = {}
        if len(args) > 0:
            input_dict = {k: v for k, v in zip(self.input_keys, args)}
        return self.process_components(
            image_in, modality_selector_left, modality_selector_right, **input_dict
        )

    def on_process_subsequent(
        self, results_state, modality_selector_left, modality_selector_right, *args
    ):
        if results_state is None:
            raise gr.Error("Upload an image first or use an example below.")
        results_state = {k: v for v, k in results_state}
        image_in = results_state[self.key_original_image]
        input_dict = {k: v for k, v in zip(self.input_keys, args)}
        return self.process_components(
            image_in, modality_selector_left, modality_selector_right, **input_dict
        )

    def on_selector_change_left(
        self, results_state, image_slider, modality_selector_left
    ):
        results_state = {k: v for v, k in results_state}
        return [results_state[modality_selector_left], image_slider[1]]

    def on_selector_change_right(
        self, results_state, image_slider, modality_selector_right
    ):
        results_state = {k: v for v, k in results_state}
        return [image_slider[0], results_state[modality_selector_right]]

    def make_interface(self):
        """
        Constructs the entire Gradio Blocks interface.
        """
        self.make_header()

        results_state = gr.Gallery(visible=False)

        image_slider = self.make_slider()
        modality_selector_left, modality_selector_right = self.make_modality_selectors()

        user_components, btn_clear, btn_submit = self.make_advanced_settings()

        self.make_examples(
            image_slider,
            [
                results_state,
                image_slider,
                modality_selector_left,
                modality_selector_right,
                *user_components.values(),
            ],
        )

        image_slider.upload(
            fn=self.on_process_first,
            inputs=[
                image_slider,
                modality_selector_left,
                modality_selector_right,
                *user_components.values(),
            ],
            outputs=[
                results_state,
                image_slider,
                modality_selector_left,
                modality_selector_right,
                *user_components.values(),
            ],
        )

        btn_submit.click(
            fn=self.on_process_subsequent,
            inputs=[
                results_state,
                modality_selector_left,
                modality_selector_right,
                *user_components.values(),
            ],
            outputs=[
                results_state,
                image_slider,
                modality_selector_left,
                modality_selector_right,
                *user_components.values(),
            ],
        )

        btn_clear.click(
            fn=lambda: None,
            inputs=[],
            outputs=image_slider,
        )

        modality_selector_left.input(
            fn=self.on_selector_change_left,
            inputs=[results_state, image_slider, modality_selector_left],
            outputs=image_slider,
        )
        modality_selector_right.input(
            fn=self.on_selector_change_right,
            inputs=[results_state, image_slider, modality_selector_right],
            outputs=image_slider,
        )

    def make_header(self):
        """
        Create a header section with Markdown and HTML.
        Default: just the project title.
        """
        gr.Markdown(f"# {self.title}")

    def make_slider(self):
        with gr.Row(elem_classes="sliderrow"):
            return ImageSliderPlus(
                label=self.title,
                type="filepath",
                elem_classes="slider",
                position=self.slider_position,
            )

    def make_modality_selectors(self):
        with gr.Row():
            modality_selector_left = Radio(
                choices=None,
                value=None,
                label="Left",
                key="Left",
                show_label=False,
                container=False,
            )
            modality_selector_right = Radio(
                choices=None,
                value=None,
                label="Right",
                key="Right",
                show_label=False,
                container=False,
            )
        return modality_selector_left, modality_selector_right

    def make_examples(self, inputs, outputs):
        examples = self.discover_examples()
        if not isinstance(examples, list):
            raise gr.Error("`discover_examples` must return a list of paths")
        if any(not os.path.isfile(path) for path in examples):
            raise gr.Error("Not all example paths are valid files")
        examples_dirname = os.path.basename(os.path.normpath(self.examples_path))
        return Examples(
            examples=[
                (e, e) for e in examples
            ],  # tuples like this seem to work better with the gallery
            inputs=inputs,
            outputs=outputs,
            examples_per_page=self.examples_per_page,
            cache_examples=self.examples_cache,
            fn=self.on_process_first,
            directory_name=examples_dirname,
        )

    def make_advanced_settings(self):
        with gr.Accordion("Advanced Settings", open=False):
            user_components = self.build_user_components()
            if not isinstance(user_components, dict) or any(
                not isinstance(k, str) or not isinstance(v, Component)
                for k, v in user_components.items()
            ):
                raise gr.Error(
                    "`build_user_components` must return a dict of Gradio components with string keys. A dict of the "
                    "same structure will be passed into the `process` function."
                )
            with gr.Row():
                btn_clear, btn_submit = self.make_buttons()
        self.input_keys = list(user_components.keys())
        return user_components, btn_clear, btn_submit

    def make_buttons(self):
        btn_clear = gr.Button("Clear")
        btn_submit = gr.Button("Apply", variant="primary")
        return btn_clear, btn_submit
