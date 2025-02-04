---
title: Gradio DualVision Demo
emoji: 👀
colorFrom: blue
colorTo: red
sdk: gradio
sdk_version: 4.44.1
app_file: app.py
pinned: true
license: cc-by-sa-4.0
---

# Gradio DualVision

[![Hugging Face Space](https://img.shields.io/badge/🤗%20Hugging%20Face%20-Space-yellow)](https://huggingface.co/spaces/toshas/gradio-dualvision)

DualVision is a Gradio template app for image processing. It was developed
to support the [Marigold](https://marigoldcomputervision.github.io) project. The app features:
- A web interface, powered by [Gradio](www.gradio.app) and [gradio-imageslider](https://github.com/pngwn/gradio-imageslider).
- Compatibility with desktop and mobile browsers.
- Native integration with Hugging Face Spaces.
- GPU support in the backend, including Hugging Face [ZeroGPU](https://huggingface.co/docs/hub/spaces-zerogpu).
- Simple uploading input images, including from the camera roll.
- Easily add configurable settings and see their effect instantly.
- Instant processing and side-by-side inspection.
- Multi-modal prediction: as it often happens, your algorithm can produce multiple images.
- Radio-buttons for easy switch between the inputs and produced outputs.
- An examples gallery to streamline user experience.

## Live demo

YouTube video:<br>
[![YouTube](http://i.ytimg.com/vi/8j0X8qXfKCg/hqdefault.jpg)](https://www.youtube.com/watch?v=8j0X8qXfKCg)

This very space running live on Hugging Face Spaces: 
<a href="https://huggingface.co/spaces/toshas/gradio-dualvision" style="position: relative; top: 2px;"><img src="https://img.shields.io/badge/🤗%20Hugging%20Face-Space-yellow" height="16"></a>

A few real examples:
- [Marigold Depth](https://huggingface.co/spaces/prs-eth/marigold)

## Quick start

Check out the template image processing [app.py](app.py); copy it and start modifying! 

1. Install as a python package: `pip install git+https://github.com/toshas/gradio-dualvision.git`;
2. Create an `app.py` file;
3. Import and subclass from `DualVisionApp`;
4. Implement `build_user_components` and `process` methods, and optionally `make_header`;
5. Launch the app!

## Limitations

- Does not work correctly inside the `TabbedInterface`.
- Double copying between the hidden gallery component and the slider introduces visible flickering.
- Fixed versions of `gradio==4.44.1` and `gradio_imageslider==0.0.20`; 
PRs are welcome but should start as a discussion in the [Issues](https://github.com/toshas/gradio-dualvision/issues) first. 

## Citation:
If you find this code useful, we kindly ask you to cite our papers:
```
@InProceedings{ke2023repurposing,
  title={Repurposing Diffusion-Based Image Generators for Monocular Depth Estimation},
  author={Bingxin Ke and Anton Obukhov and Shengyu Huang and Nando Metzger and Rodrigo Caye Daudt and Konrad Schindler},
  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2024}
}
```

## License

The web part of this work is licensed under a 
[Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
The code part of this work is licensed under an
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).