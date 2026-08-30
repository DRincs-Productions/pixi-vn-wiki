# Crowdin API Translation Workflow

**Scope** — apply this workflow when asked to translate a page **directly on Crowdin** via its API. For the actual translation rules, tone, terminology glossary, and language-specific notes, always reuse [content/CLAUDE.md](content/CLAUDE.md) — this file only covers *how to talk to Crowdin*, not *how to translate*.

This is a different delivery mechanism from the one in `content/CLAUDE.md`: that file writes a local sibling file (`page.mdx` → `page.it.mdx`); this workflow instead reads/writes strings and translations inside the Crowdin project itself, through its REST API.

## Project

- **Project ID:** `764947` (pixi-vn.wiki)
- **Source files:** defined in [crowdin.yml](crowdin.yml) — `*.mdx` under `content/` (excluding `Home.md`, `locales/*/*`, `content/jsdoc/**`) and `messages/en.json`.

## Prerequisites

- A Crowdin **Personal Access Token (PAT)** with read/write access to the project.
- Credentials live in `.env.crowdin` at the repo root (`CROWDIN_TOKEN`, `CROWDIN_PROJECT_ID`) — this file is covered by the `.env*` rule in [.gitignore](.gitignore:25) and must never be committed, printed, or logged. Source it into the shell (`set -a; source .env.crowdin; set +a`) before making `curl` calls.

## Key concept: master vs. hidden strings

This project has Crowdin's duplicate-string detection enabled: when identical source text appears more than once, Crowdin marks the first occurrence as the **master** string and every later occurrence as **hidden** (`isHidden: true` on the source string object). Hidden strings automatically inherit whatever translation is applied to their master.

**`isHidden` is not only about duplicates.** A string can be `isHidden: true` with `isDuplicate: false` and `masterStringId: null` — this means it was hidden directly (e.g. a non-prose value such as a frontmatter `icon` path) rather than because of the duplicate mechanism. Treat both cases identically: **`isHidden` alone is the only signal that matters.**

**Rule: only ever translate strings where `isHidden` is `false`. Never submit a translation for a string where `isHidden` is `true`, even if the "translation" would just be the source text unchanged (e.g. a file path) — leave it alone entirely, don't post anything for it.**

**Caveat: re-check `isHidden` right before translating, not just at the start of a session.** It has been observed to change value between two fetches of the same string with no revision bump — don't trust a value read hours or many steps earlier.

## API basics

- Base URL: `https://api.crowdin.com/api/v2`
- Auth header: `Authorization: Bearer $CROWDIN_TOKEN`
- Endpoints used:
  - `GET /projects/764947` — project details, incl. `data.targetLanguages` (id, name, twoLettersCode, …)
  - `GET /projects/764947/files` — list files, to resolve the file ID for the requested page (match against the `crowdin.yml` source path)
  - `GET /projects/764947/strings?fileId={fileId}&limit=500` (paginate via `offset`) — source strings for that file; use `data.id`, `data.text`, `data.isHidden`
  - `GET /projects/764947/translations?stringId={id}&languageId={id}` — existing translations for a string+language (used to detect "already translated")
  - `POST /projects/764947/translations` — add a translation: `{ "stringId": ..., "languageId": ..., "text": "..." }`
  - `DELETE /projects/764947/translations/{translationId}` — remove an existing translation (needed for the "replace" mode below)
  - Field/endpoint names above are per the current `@crowdin/crowdin-api-client` JS SDK types; double-check against the live API response the first time a call is made in a session, since Crowdin can revise field names between API versions.

## Two request modes

Always operate on **one file at a time** — the single page the user selected. Never batch multiple pages in one run unless explicitly asked.

### Mode 1 — Full retranslate (sostituisci tutto)

Translate every master string in the file, for every requested target language, **overwriting any existing translation**.

1. Resolve target languages (all project languages, or the subset the user names).
2. Resolve the file ID and fetch its source strings; keep only `isHidden == false`.
3. For each language × master string:
   - `GET .../translations?stringId=...&languageId=...` — if translations already exist, `DELETE` them.
   - Translate the text (per `content/CLAUDE.md` rules/glossary).
   - `POST .../translations` with the new text.

### Mode 2 — Fill gaps only (traduci solo le parti mancanti)

Translate only strings that have **no existing translation** for a given language; leave everything already translated untouched.

1. Same language/file resolution as above.
2. For each language × master string:
   - `GET .../translations?stringId=...&languageId=...` — if a translation already exists, **skip** it.
   - Otherwise translate and `POST .../translations`.

If the user doesn't say which mode, ask before running — the two produce very different (and hard-to-undo) results on a shared, external system.

## Workflow summary

1. Confirm: which page, which mode (full replace vs. missing-only), which language(s) — default to all target languages unless told otherwise.
2. Get the PAT from the user if not already in the session's environment.
3. Resolve target languages, file ID, and master (non-hidden) source strings.
4. Apply Mode 1 or Mode 2 as above.
5. Report a summary: languages covered, strings translated, strings skipped (already translated / hidden / left untouched), and any terminology ambiguities.

## Safety notes

- Pushing or deleting translations changes shared, external state on Crowdin — this is not a local, reversible file edit. Confirm page + mode + language scope before running step 4, especially for Mode 1 (destructive on existing translations).
- Never print, log, or persist the PAT.
