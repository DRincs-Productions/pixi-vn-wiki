# Pixi'VN Wiki

## Project

This repository is the documentation website (wiki) of **Pixi'VN**, a JavaScript/TypeScript engine for creating story-driven games (e.g. Visual Novels).

- Built with Next.js and Fumadocs (`next dev --webpack`, `next build --webpack`).
- Pages live in `content/` as `.md`/`.mdx` files, grouped by topic (`start`, `nqtr`, `ink`, `renpy`, `faq`, ...).
- Translations are `<page>.<lang>.mdx` files next to the English page (see `content/CLAUDE.md` for the localization rules).

## Links

- **JSDoc / API reference** — link to the generated API docs with an inline-code link whose path starts with `/jsdoc/`:

  ```md
  [`OnRunProps`](/jsdoc/nqtr/index/interfaces/OnRunProps)
  [`quest.start`](/jsdoc/nqtr/index/classes/QuestBaseModel#start)
  ```

  `/jsdoc/...` is redirected to <https://jsdocs.pixi-vn.com/> (see `redirects.json`). Methods and properties use an anchor with the lowercase name (`#start`). Link only prose, not code blocks.

- **External links** — standard Markdown: `[text](https://example.com)`.

- **Internal links** (to other wiki pages) — use the `DynamicLink` component:

  ```mdx
  <DynamicLink href="/nqtr/navigation">Navigation and map</DynamicLink>
  ```

## Translations (Crowdin)

Translations are managed on Crowdin (project `764947`, configured in `crowdin.yml`). Do not translate pages unless asked.

- To write a translated sibling file locally (`page.mdx` → `page.it.mdx`), follow `content/CLAUDE.md`.
- To translate directly on Crowdin through its REST API, follow `CROWDIN.md`. It covers authentication (token in the git-ignored `.env.crowdin`, never print it), master vs. hidden strings (only translate strings where `isHidden` is `false`), and the two request modes (full retranslate / fill gaps only), working one file at a time.

## pixi-vn-examples

`pixi-vn-examples/` is a separate project (Vite + React) with runnable examples of Pixi'VN features, each on its own route. It is untracked in this repo and has its own `CLAUDE.md` and `README.md` with the conventions to follow (unique label ids, per-route characters, anime-style assets, etc.).

## Language

The main language of the documentation is **English**. Write all new content, and any text you add to existing pages, in English.
