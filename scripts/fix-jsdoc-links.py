#!/usr/bin/env python3
"""Fix relative markdown links in jsdoc content for fumadocs compatibility.

TypeDoc generates relative .md links that work in GitHub wikis but break in
fumadocs because:

1. Links include the .md/.mdx extension, but fumadocs strips it from page URLs.
2. For index.mdx pages, the fumadocs URL has no trailing slash (e.g.
   /jsdoc/pixi-vn/vite-listener), so the browser resolves relative links one
   level too high — missing the current-directory segment in the path.

This script converts every relative .md/.mdx link to an absolute fumadocs path,
using the source file's real directory for correct resolution.
"""

import os
import re

# Map each jsdoc submodule directory (relative to the repo root) to its
# fumadocs base URL.
MODULES = {
    "content/jsdoc/pixi-vn": "/jsdoc/pixi-vn",
    "content/jsdoc/pixi-vn-json": "/jsdoc/pixi-vn-json",
    "content/jsdoc/pixi-vn-ink": "/jsdoc/pixi-vn-ink",
    "content/jsdoc/nqtr": "/jsdoc/nqtr",
}

LINK_RE = re.compile(r"\[([^\]]*)\]\(([^)]+)\)")


def strip_markdown_extension(path: str) -> str:
    for suffix in (".mdx", ".md"):
        if path.endswith(suffix):
            return path[: -len(suffix)]
    return path


def file_path_to_url(abs_target: str, module_dir: str, base_url: str) -> str:
    """Map an absolute markdown file path to its fumadocs page URL.

    fumadocs rules:
    - Strip the .md/.mdx extension.
    - foo/index.mdx  →  base_url/foo
    - index.mdx      →  base_url          (root page)
    """
    rel = os.path.relpath(abs_target, module_dir).replace("\\", "/")
    rel = strip_markdown_extension(rel)
    if rel == "index":
        return base_url
    if rel.endswith("/index"):
        rel = rel[:-6]
    return base_url.rstrip("/") + "/" + rel


def fix_file(file_path: str, module_dir: str, base_url: str) -> None:
    with open(file_path, encoding="utf-8") as fh:
        content = fh.read()

    source_dir = os.path.dirname(os.path.abspath(file_path))

    def replace(m: re.Match) -> str:
        text = m.group(1)
        raw_link = m.group(2)

        # Only handle relative links that point to a markdown file.
        if raw_link.startswith(("http", "/", "#")):
            return m.group(0)
        if not any(ext in raw_link for ext in (".md", ".mdx")):
            return m.group(0)

        # Separate the optional anchor fragment from the file path.
        anchor = ""
        link = raw_link
        if "#" in raw_link:
            idx = raw_link.index("#")
            link, anchor = raw_link[:idx], raw_link[idx:]

        if not link.endswith((".md", ".mdx")):
            return m.group(0)  # .md/.mdx is only in the anchor — leave as-is

        # Resolve the relative path to an absolute file path.
        abs_target = os.path.normpath(os.path.join(source_dir, link))
        mdx_target = strip_markdown_extension(abs_target) + ".mdx"
        if os.path.exists(mdx_target):
            abs_target = mdx_target
        elif not os.path.exists(abs_target):
            return m.group(0)

        # Safety: reject links that escape the module directory.
        if os.path.relpath(abs_target, module_dir).startswith(".."):
            return m.group(0)

        url = file_path_to_url(abs_target, module_dir, base_url) + anchor
        return f"[{text}]({url})"

    new_content = LINK_RE.sub(replace, content)
    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as fh:
            fh.write(new_content)


def main() -> None:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_dir = os.path.dirname(script_dir)

    for rel_module_dir, base_url in MODULES.items():
        module_dir = os.path.abspath(os.path.join(repo_dir, rel_module_dir))
        if not os.path.isdir(module_dir):
            print(f"Skipping (not found): {rel_module_dir}")
            continue
        count = 0
        for root, _dirs, files in os.walk(module_dir):
            for fname in files:
                if fname.endswith((".md", ".mdx")):
                    fix_file(os.path.join(root, fname), module_dir, base_url)
                    count += 1
        print(f"Processed {count} files in {rel_module_dir}")


if __name__ == "__main__":
    main()
