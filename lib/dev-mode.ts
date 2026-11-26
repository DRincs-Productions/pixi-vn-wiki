/**
 * `true` when the wiki runs with `next dev` in "light" mode (the default for local development).
 *
 * Light mode skips what only the published site needs, to start faster and use less RAM:
 * - translations (only English is served, no language switcher);
 * - processed Markdown for the llms files (`llms.txt`, `llms-full.txt`, `/llms.mdx/...` use the raw file instead);
 * - remote data on the homepage (GitHub contributors, Crowdin translators, Ko-fi supporters).
 *
 * Set `WIKI_FULL_DEV=1` to run `next dev` with everything enabled.
 * The value is computed in `next.config.mjs` (`WIKI_LIGHT_DEV`), so it is the same on server and client.
 */
export const isLightDev = process.env.WIKI_LIGHT_DEV === "1";
