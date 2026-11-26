import { baseUrl } from "@/lib/metadata";
import { discordUrl, gitConfig } from "@/lib/shared";
import { docsLlms, faqLlms, inkLlms, nqtrLlms, renpyLlms } from "@/lib/source";

export const revalidate = false;

// `llms.txt` of a source, in English: a list of links to the `.md` file of each page (see `app/llms.mdx`)
async function index(source: typeof docsLlms) {
    return (await source.serve("/llms.txt", "en"))?.text() ?? "";
}

// summary of the project for AI assistants, see https://llmstxt.org
const intro = `# Pixi'VN

> Pixi'VN is an open-source JavaScript/TypeScript engine for creating visual novels and other story-driven games (point & click adventures, RPGs, interactive fiction) that run in the browser, on desktop and on mobile. It is built on PixiJS, works with React, Vue or any UI framework, and supports writing the story in TypeScript, ink or Ren'Py.

- Source code: https://github.com/${gitConfig.user}/${gitConfig.repo}
- npm package: https://www.npmjs.com/package/@drincs/pixi-vn
- API reference: https://jsdocs.pixi-vn.com/
- Full documentation in a single file: ${baseUrl}/llms-full.txt
- Community: ${discordUrl}

## Docs`;

export async function GET() {
    const parts = await Promise.all([
        index(docsLlms).then((t) => t.replace("# Docs", intro)),
        index(inkLlms).then((t) => t.replaceAll("# Docs", "## ink language integration")),
        index(renpyLlms).then((t) => t.replaceAll("# Docs", "## Ren'py language integration")),
        index(nqtrLlms).then((t) => t.replaceAll("# Docs", "## NQTR")),
        index(faqLlms).then((t) => t.replaceAll("# Docs", "## FAQ")),
    ]);

    return new Response(parts.join("\n\n"), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
