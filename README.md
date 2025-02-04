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

DualVision is a Gradio template app for image processing. It was developed
to support the [Marigold](https://marigoldcomputervision.github.io) project. If you find this code useful, we kindly
ask you to cite our most relevant papers.

## Usage (Quick start)

Check out the dummy image processing app: [app.py](app.py)

## Usage (New demo)

1. Install as a python package: `pip install git+https://github.com/toshas/gradio-dualvision.git`
2. Create an `app.py` file
3. Import and subclass from `DualVisionApp`
4. Implement `build_user_components` and `process` methods, and optionally `make_header`
5. Launch the app!

## Limitations

- Does not work correctly inside the `TabbedInterface`.
- Fixed versions of `gradio==4.44.1` and `gradio_imageslider==0.0.20`. 

## Citation (BibTeX):
If you find this code useful, we kindly ask you to cite our most relevant papers.
```
@InProceedings{ke2023repurposing,
  title={Repurposing Diffusion-Based Image Generators for Monocular Depth Estimation},
  author={Bingxin Ke and Anton Obukhov and Shengyu Huang and Nando Metzger and Rodrigo Caye Daudt and Konrad Schindler},
  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2024}
}
```
