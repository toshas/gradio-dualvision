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
import gradio
from gradio import components
from gradio.components.base import Component
from gradio.data_classes import (
    GradioModel,
    GradioRootModel,
)

from gradio.blocks import BlockContext


def patched_postprocess_update_dict(
    block: Component | BlockContext, update_dict: dict, postprocess: bool = True
):
    """
    This is a patched version of the original function where 'pop' is replaced with 'get' in the first line.
    The key will no longer be removed but can still be accessed safely.
    This fixed gradio.Radio component persisting the value selection through gradio.Examples.
    """
    value = update_dict.get("value", components._Keywords.NO_VALUE)

    # Continue with the original logic
    update_dict = {k: getattr(block, k) for k in update_dict if hasattr(block, k)}
    if value is not components._Keywords.NO_VALUE:
        if postprocess:
            update_dict["value"] = block.postprocess(value)
            if isinstance(update_dict["value"], (GradioModel, GradioRootModel)):
                update_dict["value"] = update_dict["value"].model_dump()
        else:
            update_dict["value"] = value
    update_dict["__type__"] = "update"
    return update_dict


gradio.blocks.postprocess_update_dict = patched_postprocess_update_dict


class Radio(gradio.Radio):
    pass
