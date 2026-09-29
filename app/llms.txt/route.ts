import {
    faqSource,
    inkSource,
    jsdocNqtrSource,
    jsdocPixiVnAiSource,
    jsdocPixiVnInkSource,
    jsdocPixiVnJsonSource,
    jsdocPixiVnLive2dSource,
    jsdocPixiVnSource,
    jsdocPixiVnSpineSource,
    nqtrSource,
    renpySource,
    source,
} from "@/lib/source";
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
        llms(jsdocPixiVnSource)
            .index()
            .then((t) => t.replaceAll("# Docs", "## pixi-vn API")),
        llms(jsdocPixiVnJsonSource)
            .index()
            .then((t) => t.replaceAll("# Docs", "## pixi-vn-json API")),
        llms(jsdocPixiVnInkSource)
            .index()
            .then((t) => t.replaceAll("# Docs", "## pixi-vn-ink API")),
        llms(jsdocNqtrSource)
            .index()
            .then((t) => t.replaceAll("# Docs", "## nqtr API")),
        llms(jsdocPixiVnSpineSource)
            .index()
            .then((t) => t.replaceAll("# Docs", "## pixi-vn-spine API")),
        llms(jsdocPixiVnLive2dSource)
            .index()
            .then((t) => t.replaceAll("# Docs", "## pixi-vn-live2d API")),
        llms(jsdocPixiVnAiSource)
            .index()
            .then((t) => t.replaceAll("# Docs", "## pixi-vn-ai API")),
    ]);

    return new Response(parts.join("\n\n").replaceAll("/en/", "/"));
}
