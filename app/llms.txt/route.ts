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

export function GET() {
    return new Response(
        llms(source)
            .index("en")
            .replaceAll("# Docs", "# Pixi'VN")
            .concat("\n\n")
            .concat(llms(inkSource).index("en").replaceAll("# Docs", "## ink language integration"))
            .concat("\n\n")
            .concat(
                llms(renpySource)
                    .index("en")
                    .replaceAll("# Docs", "## Ren'py language integration"),
            )
            .concat("\n\n")
            .concat(llms(nqtrSource).index("en").replaceAll("# Docs", "## NQTR"))
            .concat("\n\n")
            .concat(llms(faqSource).index("en").replaceAll("# Docs", "## FAQ"))
            .concat("\n\n")
            .concat(llms(jsdocPixiVnSource).index().replaceAll("# Docs", "## pixi-vn API"))
            .concat("\n\n")
            .concat(llms(jsdocPixiVnJsonSource).index().replaceAll("# Docs", "## pixi-vn-json API"))
            .concat("\n\n")
            .concat(llms(jsdocPixiVnInkSource).index().replaceAll("# Docs", "## pixi-vn-ink API"))
            .concat("\n\n")
            .concat(llms(jsdocNqtrSource).index().replaceAll("# Docs", "## nqtr API"))
            .concat("\n\n")
            .concat(
                llms(jsdocPixiVnSpineSource).index().replaceAll("# Docs", "## pixi-vn-spine API"),
            )
            .concat("\n\n")
            .concat(
                llms(jsdocPixiVnLive2dSource).index().replaceAll("# Docs", "## pixi-vn-live2d API"),
            )
            .concat("\n\n")
            .concat(llms(jsdocPixiVnAiSource).index().replaceAll("# Docs", "## pixi-vn-ai API"))
            .replaceAll("/en/", "/"),
    );
}
