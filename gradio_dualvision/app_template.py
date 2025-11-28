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
import glob
import json
import os
import re

import gradio as gr
import spaces
from PIL import Image as PILImage
from gradio import Component, ImageSlider

from .gradio_patches.examples import Examples
from .gradio_patches.gallery import Gallery
from .gradio_patches.image import Image
from .gradio_patches.radio import Radio
from .version import __version__


class DualVisionApp(gr.Blocks):
    def __init__(
        self,
        title,
        examples_path="examples",
        examples_per_page=12,
        examples_cache="lazy",
        squeeze_canvas=True,
        squeeze_viewport_height_pct=75,
        left_selector_visible=False,
        advanced_settings_can_be_half_width=True,
        key_original_image="Original",
        spaces_zero_gpu_enabled=False,
        spaces_zero_gpu_duration=None,
        slider_position=50,
        slider_line_color="#FFF",
        slider_line_width="4px",
        slider_arrows_color="#FFF",
        gallery_thumb_min_size="96px",
        **kwargs,
    ):
        """
        A wrapper around Gradio Blocks class that implements an image processing demo template. All the user has to do
        is to subclass this class and implement two methods: `process` implementing the image processing, and
        `build_user_components` implementing Gradio components reading the additional processing arguments.
        Args:
            title: Title of the application (str, required).
            examples_path: Base path where examples will be searched (Default: `"examples"`).
            examples_per_page: How many examples to show at the bottom of the app (Default: `12`).
            examples_cache: Examples caching policy, corresponding to `cache_examples` argument of gradio.Examples (Default: `"lazy"`).
            squeeze_canvas: When True, the image is fit to the browser viewport. When False, the image is fit to width (Default: `True`).
            squeeze_viewport_height_pct: Percentage of the browser viewport height (Default: `75`).
            left_selector_visible: Whether controls for changing modalities in the left part of the slider are visible (Default: `False`).
            key_original_image: Name of the key under which the input image is shown in the modality selectors (Default: `"Original"`).
            advanced_settings_can_be_half_width: Whether allow placing advanced settings dropdown in half-column space whenever possible (Default: `True`).
            spaces_zero_gpu_enabled: When True, the app wraps the processing function with the ZeroGPU decorator.
            spaces_zero_gpu_duration: Defines an integer duration in seconds passed into the ZeroGPU decorator.
            slider_position: Position of the slider between 0 and 100 (Default: `50`).
            slider_line_color: Color of the slider line (Default: `"#FFF"`).
            slider_line_width: Width of the slider line (Default: `"4px"`).
            slider_arrows_color: Color of the slider arrows (Default: `"#FFF"`).
            gallery_thumb_min_size: Min size of the gallery thumbnail (Default: `96px`).
            **kwargs: Any other arguments that Gradio Blocks class can take.
        """
        if __version__ != gr.__version__:
            raise gr.Error(
                f"gradio version ({gr.__version__}) must match gradio-dualvision version ({__version__}). "
                f"Check the metadata of the README.md in your demo (sdk_version field)."
            )

        squeeze_viewport_height_pct = int(squeeze_viewport_height_pct)
        if not 50 <= squeeze_viewport_height_pct <= 100:
            raise gr.Error(
                "`squeeze_viewport_height_pct` should be an integer between 50 and 100."
            )
        if not os.path.isdir(examples_path):
            raise gr.Error("`examples_path` should be a directory.")
        if not 0 <= slider_position <= 100:
            raise gr.Error("`slider_position` should be between 0 and 100.")
        kwargs = {k: v for k, v in kwargs.items()}
        kwargs["title"] = title
        self.examples_path = examples_path
        self.examples_per_page = examples_per_page
        self.examples_cache = examples_cache
        self.key_original_image = key_original_image
        self.slider_position = slider_position
        self.input_keys = None
        self.input_cls = None
        self.input_kwargs = None
        self.left_selector_visible = left_selector_visible
        self.advanced_settings_can_be_half_width = advanced_settings_can_be_half_width
        if spaces_zero_gpu_enabled:
            self.process_components = spaces.GPU(
                self.process_components, duration=spaces_zero_gpu_duration
            )
        self.head = ""
        self.head += """
            <script>
                let observerFooterButtons = new MutationObserver((mutationsList, observer) => {
                    const origButtonShowAPI = document.querySelector(".show-api");
                    const origButtonBuiltWith = document.querySelector(".built-with");
                    const origButtonSettings = document.querySelector(".settings");
                    const origSeparatorDiv = document.querySelector(".divider");
                    if (!origButtonBuiltWith || !origButtonShowAPI || !origButtonSettings || !origSeparatorDiv) {
                        return;
                    }
                    observer.disconnect();

                    const parentDiv = origButtonShowAPI.parentNode;
                    if (!parentDiv) return;

                    const createButton = (referenceButton, text, href) => {
                        let newButton = referenceButton.cloneNode(true);
                        newButton.href = href;
                        newButton.textContent = text;
                        newButton.className = referenceButton.className;
                        newButton.style.textDecoration = "none";
                        newButton.style.display = "inline-block";
                        newButton.style.cursor = "pointer";
                        return newButton;
                    };

                    document.querySelectorAll(".divider").forEach(divider => {
                        divider.style.marginLeft = "var(--size-2)";
                        divider.style.marginRight = "var(--size-2)";
                    });
                    
                    const newButtonBuiltWith = createButton(origButtonBuiltWith, "Built with Gradio DualVision v""" + __version__ + """", "https://github.com/toshas/gradio-dualvision");
                    const newButtonTemplateBy = createButton(origButtonBuiltWith, "Template by Anton Obukhov", "https://www.obukhov.ai");
                    const newButtonLicensed = createButton(origButtonBuiltWith, "Licensed under CC BY-SA 4.0", "http://creativecommons.org/licenses/by-sa/4.0/");

                    parentDiv.replaceChild(newButtonBuiltWith, origButtonShowAPI);
                    parentDiv.replaceChild(newButtonTemplateBy, origButtonBuiltWith);
                    parentDiv.replaceChild(newButtonLicensed, origButtonSettings);
                    parentDiv.appendChild(origSeparatorDiv.cloneNode(true));
                    parentDiv.appendChild(origButtonSettings);
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
            body {{                      /* tighten the layout */
                flex-grow: 0 !important;
            }}
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
            .slider .svelte-1to105q {{    /* hide the component label in the top-left corner before image load */
                visibility: hidden;
            }}
            .slider .svelte-kzcjhc .icon-wrap {{
                height: 0px;             /* remove unnecessary spaces in captions before image load */
            }}
            .slider .svelte-12ioyct.wrap {{
                padding-top: 0px;        /* remove unnecessary spaces in captions before image load */
            }}
            .slider .svelte-1oiin9d {{    /* hide the dummy icon from the right pane before image load */
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
            .slider .icon-wrap {{    /* style slider arrows */
                background-color: {slider_arrows_color};
            }}
            .row_reverse {{
                flex-direction: row-reverse;
            }}
            .gallery.svelte-a9zvka {{        /* make examples gallery tiles square */
                min-width: max({gallery_thumb_min_size}, calc(100vw / 8));
                min-height: max({gallery_thumb_min_size}, calc(100vw / 8));
                width: max({gallery_thumb_min_size}, calc(100vw / 8));
                height: max({gallery_thumb_min_size}, calc(100vw / 8));
            }}
            .gallery.svelte-p5q82i img {{    /* make examples gallery tiles square */
                min-width: max({gallery_thumb_min_size}, calc(100vw / 8));
                min-height: max({gallery_thumb_min_size}, calc(100vw / 8));
                width: max({gallery_thumb_min_size}, calc(100vw / 8));
                height: max({gallery_thumb_min_size}, calc(100vw / 8));
            }}
            h1, h2, h3 {{                    /* center markdown headings */
                text-align: center;
                display: block;
            }}
        """
        if squeeze_canvas:
            self.head += f"""
                <script>
                    // fixes vertical size of the component when used inside of iframeResizer (on spaces)
                    function squeezeViewport() {{
                        if (typeof window.parentIFrame === "undefined") return;
                        const images = document.querySelectorAll('.slider img');
                        window.parentIFrame.getPageInfo((info) => {{
                            images.forEach((img) => {{
                                const imgMaxHeightNew = (info.clientHeight * {squeeze_viewport_height_pct}) / 100;
                                img.style.maxHeight = `${{imgMaxHeightNew}}px`;
                                // window.parentIFrame.size(0, null);  // tighten the layout; body's flex-grow: 0 is less intrusive
                            }});
                        }});
                    }}
                    window.addEventListener('resize', squeezeViewport);

                    // fixes gradio-imageslider wrong position behavior when using fitting to content by triggering resize
                    let observer = new MutationObserver((mutationsList) => {{
                        const images = document.querySelectorAll('.slider img');
                        images.forEach((img) => {{
                            if (img.complete) {{
                                window.dispatchEvent(new Event('resize'));
                            }} else {{
                                img.onload = () => {{
                                    window.dispatchEvent(new Event('resize'));
                                }}
                            }}
                        }});
                    }});
                    observer.observe(document.body, {{ childList: true, subtree: true }});
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

    def process(self, image_in: PILImage.Image, **kwargs):
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
            image_in = PILImage.open(image_in).convert("RGB")
        else:
            if not isinstance(image_in, PILImage.Image):
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
            if not isinstance(v, PILImage.Image):
                raise gr.Error(
                    f"Value for key '{k}' must be a PIL Image, got type {type(v)}"
                )
        if len(results_settings) != len(self.input_keys):
            raise gr.Error(
                f"Expected number of settings ({len(self.input_keys)}), returned ({len(results_settings)})"
            )
        if any(k not in results_settings for k in self.input_keys):
            raise gr.Error(f"Mismatching setgings keys")
        results_settings = {
            k: cls(**ctor_args, value=results_settings[k])
            for k, cls, ctor_args in zip(
                self.input_keys, self.input_cls, self.input_kwargs
            )
        }

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
                choices=modalities if self.left_selector_visible else modalities[1:],
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

    def on_process_example(
        self,
        dummy_image_input,
        modality_selector_left=None,
        modality_selector_right=None,
        *args,
    ):
        image_in = dummy_image_input
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

        results_state = Gallery(visible=False)

        dummy_image_input = Image(
            visible=False,
            type="filepath",
        )
        image_slider = self.make_slider()

        if self.left_selector_visible or not self.advanced_settings_can_be_half_width:
            with gr.Row():
                modality_selector_left, modality_selector_right = (
                    self.make_modality_selectors(reverse_visual_order=False)
                )
            user_components, btn_clear, btn_submit = self.make_advanced_settings()
        else:
            with gr.Row(equal_height=False, elem_classes="row_reverse"):
                with gr.Column():
                    modality_selector_left, modality_selector_right = (
                        self.make_modality_selectors(reverse_visual_order=True)
                    )
                with gr.Column():
                    user_components, btn_clear, btn_submit = (
                        self.make_advanced_settings()
                    )

        self.make_examples(
            dummy_image_input,
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
            fn=lambda: (None, None),
            inputs=[],
            outputs=[image_slider, results_state],
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
            return ImageSlider(
                label=self.title,
                type="filepath",
                elem_classes="slider",
                slider_position=self.slider_position,
            )

    def make_modality_selectors(self, reverse_visual_order=False):
        modality_selector_left = Radio(
            choices=None,
            value=None,
            label="Left",
            key="Left",
            show_label=False,
            container=False,
            visible=self.left_selector_visible,
            render=not reverse_visual_order,
        )
        modality_selector_right = Radio(
            choices=None,
            value=None,
            label="Right",
            key="Right",
            show_label=False,
            container=False,
            elem_id="selector_right",
            render=not reverse_visual_order,
        )
        if reverse_visual_order:
            modality_selector_right.render()
            modality_selector_left.render()
        return modality_selector_left, modality_selector_right

    def make_examples(self, inputs, outputs):
        examples = self.discover_examples()
        if not isinstance(examples, list):
            raise gr.Error("`discover_examples` must return a list of paths")
        if any(not os.path.isfile(path) for path in examples):
            raise gr.Error("Not all example paths are valid files")
        examples_dirname = os.path.basename(os.path.normpath(self.examples_path))
        return Examples(
            examples=examples,
            inputs=inputs,
            outputs=outputs,
            examples_per_page=self.examples_per_page,
            cache_examples=True,
            cache_mode=self.examples_cache,
            fn=self.on_process_example,
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
        self.input_cls = list(v.__class__ for v in user_components.values())
        self.input_kwargs = [
            {k: v for k, v in c.constructor_args.items() if k not in ("value")}
            for c in user_components.values()
        ]
        return user_components, btn_clear, btn_submit

    def make_buttons(self):
        btn_clear = gr.Button("Clear")
        btn_submit = gr.Button("Apply", variant="primary")
        return btn_clear, btn_submit
