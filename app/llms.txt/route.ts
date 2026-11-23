import { docsLlms, faqLlms, inkLlms, nqtrLlms, renpyLlms } from "@/lib/source";

export const revalidate = false;

// `llms.txt` of a source, in English: a list of links to the `.md` file of each page (see `app/llms.mdx`)
async function index(source: typeof docsLlms) {
    return (await source.serve("/llms.txt", "en"))?.text() ?? "";
}

export async function GET() {
    const parts = await Promise.all([
        index(docsLlms).then((t) => t.replaceAll("# Docs", "# Pixi'VN")),
        index(inkLlms).then((t) => t.replaceAll("# Docs", "## ink language integration")),
        index(renpyLlms).then((t) => t.replaceAll("# Docs", "## Ren'py language integration")),
        index(nqtrLlms).then((t) => t.replaceAll("# Docs", "## NQTR")),
        index(faqLlms).then((t) => t.replaceAll("# Docs", "## FAQ")),
    ]);

    return new Response(parts.join("\n\n"), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
