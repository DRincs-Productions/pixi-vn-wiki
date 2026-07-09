import {
    faqSource,
    inkSource,
    jsdocNqtrSource,
    jsdocPixiVnInkSource,
    jsdocPixiVnJsonSource,
    jsdocPixiVnSource,
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
            .replaceAll("/en/", "/"),
    );
}
