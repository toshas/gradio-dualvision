#!/usr/bin/env python
import os

from setuptools import setup, find_packages

with open(os.path.join("gradio_dualvision", "version.py")) as f:
    version_pycode = f.read()
exec(version_pycode)

with open("requirements.txt") as f:
    requirements = f.read().splitlines()

setup(
    name="gradio_dualvision",
    version=__version__,
    author="Anton Obukhov",
    description="A Python package for dual-vision processing in Gradio.",
    url="https://github.com/toshas/gradio-dualvision",
    license="Apache-2.0",
    packages=find_packages(include=["gradio_dualvision", "gradio_dualvision.*"]),
    install_requires=requirements,
    python_requires=">=3.8",
    include_package_data=True,
)
