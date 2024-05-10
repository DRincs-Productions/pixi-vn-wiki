# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = "Pixi’VN"
copyright = '2024, DRincs Productions'
author = 'DRincs Productions'
# language = "fr"  # For testing language translations

# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "myst_nb",
    "sphinx_design",
    "sphinx_thebe",
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'Home.md']

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = "sphinx"

myst_enable_extensions = [
    "colon_fence",
]

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_book_theme'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# Defailt home page
master_doc = "https://pixi-vn.web.app"

# html_logo = "_static/logo-wide.svg"
html_title = "Pixi’VN Documentation"
# html_favicon = "_static/logo-square.svg"

thebe_config = {
    "repository_url": "https://github.com/DRincs-Productions/pixi-vn",
    "path_to_docs": "docs",
    "repository_branch": "main",
    # "selector": ".thebe",
    # "selector_input": "",
    # "selector_output": "",
    # "codemirror-theme": "blackboard",  # Doesn't currently work
    # "always_load": True,  # To load thebe on every page
}

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#
html_theme_options = {
    "repository_url": "https://github.com/DRincs-Productions/pixi-vn",
    "path_to_docs": "docs",
    "use_repository_button": True,
    "use_issues_button": True,
    "launch_buttons": {"thebelab": True},
    "navigation_with_keys": False,  # To prevent an unnecessary warning
}

# add html meta headers
myst_html_meta = {
    "description lang=en": "Pixi’VN is a npm package that provides various features for creating visual novels, based on PixiJS.",
    "google-site-verification": "EjlqJaE0G1aE1YOv6ZxhdET5H98MyaS7jcP07ZExHZg"
}
