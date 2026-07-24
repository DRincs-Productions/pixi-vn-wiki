#!/usr/bin/env python3
"""Prepare jsdoc wiki content for fumadocs.

This script:
1. converts generated jsdoc wiki files from .md to .mdx;
2. injects YAML frontmatter with a title;
3. removes the first top-level markdown heading from the body.
"""

from __future__ import annotations

import re
from html import unescape
from pathlib import Path

MODULES = (
    "content/jsdoc/pixi-vn",
    "content/jsdoc/pixi-vn-json",
    "content/jsdoc/pixi-vn-ink",
    "content/jsdoc/nqtr",
    "content/jsdoc/pixi-vn-spine",
    "content/jsdoc/pixi-vn-live2d",
    "content/jsdoc/pixi-vn-ai",
)

# TypeDoc emits standard triple-backtick fences, so splitting on them keeps
# prose sanitization away from code examples.
FENCE_RE = re.compile(r"(```[\s\S]*?```)")
INLINE_CODE_RE = re.compile(r"(`[^`\n]+`)")
TITLE_RE = re.compile(r"^# (.+)$", re.MULTILINE)
WIKI_LINK_RE = re.compile(r"\{\{([^{}\n|]+)\|([^{}\n]+)\}\}")
RAW_ANGLE_TOKEN_RE = re.compile(r"</?[A-Za-z][^>\s]*>")
RAW_LT_RE = re.compile(r"<(?![A-Za-z!/])")
HTML_IMG_RE = re.compile(r"<img\b([^<>]*?)(?<!/)>")
PASCAL_TAG_RE = re.compile(r"[A-Z][A-Za-z0-9]*[a-z][A-Za-z0-9]*")
SUFFIX = ".md"


def sanitize_text_line(line: str) -> str:
    stripped = line.lstrip()
    if stripped.startswith("<"):
        line = line.replace("<br>", "<br />")
        return HTML_IMG_RE.sub(r"<img\1 />", line)

    chunks = INLINE_CODE_RE.split(line)

    for index, chunk in enumerate(chunks):
        if index % 2 == 1:
            continue

        # Unescape backslash-escaped angle brackets that TypeDoc emits (e.g.
        # `Array\<string\>`) so the rest of the sanitization pipeline can
        # handle them uniformly as raw `<` / `>` characters.
        chunk = chunk.replace("\\<", "<").replace("\\>", ">").replace("\\_", "_")

        # Convert wiki-style aliases like {{PageName|DisplayText}} to the text
        # that should remain visible once the source file has been renamed to
        # MDX and the old wiki syntax is no longer meaningful in fumadocs.
        chunk = WIKI_LINK_RE.sub(lambda match: match.group(2), chunk)
        preserved_tokens: list[str] = []

        def replace_angle_token(match: re.Match[str]) -> str:
            token = match.group(0)
            inner = token[2:-1] if token.startswith("</") else token[1:-1]
            # Preserve PascalCase tags because they are usually real MDX/JSX
            # components from hand-authored jsdoc landing pages.
            if PASCAL_TAG_RE.fullmatch(inner):
                preserved_tokens.append(token)
                return f"@@PRESERVED_TOKEN_{len(preserved_tokens) - 1}@@"
            return token.replace("<", "&lt;").replace(">", "&gt;")

        chunk = RAW_ANGLE_TOKEN_RE.sub(replace_angle_token, chunk)
        chunk = RAW_LT_RE.sub("&lt;", chunk).replace(">", "&gt;")

        for preserved_index, token in enumerate(preserved_tokens):
            chunk = chunk.replace(f"@@PRESERVED_TOKEN_{preserved_index}@@", token)
        chunks[index] = chunk

    return "".join(chunks)


def sanitize_markdown(content: str) -> str:
    sections = FENCE_RE.split(content)

    for index, section in enumerate(sections):
        if index % 2 == 1:
            continue
        sections[index] = "\n".join(sanitize_text_line(line) for line in section.split("\n"))

    return "".join(sections)


def build_content(original: str, file_path: Path) -> str:
    title_match = TITLE_RE.search(original)
    title = title_match.group(1) if title_match else file_path.stem
    title = unescape(title)
    title = title.replace("\\<", "<").replace("\\>", ">").replace("\\_", "_")
    if "~~" in title:
        title = re.sub(r"~~(.+?)~~", r"\1", title)
        title += " (deprecated)"
    title = title.replace("\\", "\\\\").replace('"', '\\"')

    if title_match:
        body = original[title_match.end():].lstrip("\r\n")
    else:
        body = original

    body = sanitize_markdown(body)

    return f'---\ntitle: "{title}"\n---\n\n{body}'


def convert_file(file_path: Path) -> None:
    original = file_path.read_text(encoding="utf-8")
    target_path = file_path.with_suffix(SUFFIX)
    target_path.write_text(build_content(original, file_path), encoding="utf-8")

    if target_path != file_path:
        file_path.unlink()


def main() -> None:
    script_dir = Path(__file__).resolve().parent
    repo_dir = script_dir.parent

    for module in MODULES:
        module_dir = repo_dir / module
        if not module_dir.is_dir():
            print(f"Skipping (not found): {module}")
            continue

        count = 0
        for file_path in sorted(module_dir.rglob("*")):
            if file_path.suffix not in {".md", ".mdx"} or not file_path.is_file():
                continue
            convert_file(file_path)
            count += 1

        print(f"Prepared {count} files in {module}")


if __name__ == "__main__":
    main()
