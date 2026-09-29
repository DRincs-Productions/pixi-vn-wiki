import { faqSource, inkSource, nqtrSource, renpySource, source } from "@/lib/source";
import { llms } from "fumadocs-core/source";

export const revalidate = false;

export async function GET() {
    const parts = await Promise.all([
        llms(source)
            .index("en")
            .then((t) => t.replaceAll("# Docs", "# Pixi'VN")),
        llms(inkSource)
            .index("en")
            .then((t) => t.replaceAll("# Docs", "## ink language integration")),
        llms(renpySource)
            .index("en")
            .then((t) => t.replaceAll("# Docs", "## Ren'py language integration")),
        llms(nqtrSource)
            .index("en")
            .then((t) => t.replaceAll("# Docs", "## NQTR")),
        llms(faqSource)
            .index("en")
            .then((t) => t.replaceAll("# Docs", "## FAQ")),
    ]);

    return new Response(parts.join("\n\n").replaceAll("/en/", "/"));
}
