import { faqSource, inkSource, jsonSource, nqtrSource, renpySource, source } from "@/lib/source";
import { llms } from "fumadocs-core/source";

export const revalidate = false;

export function GET() {
    return new Response(
        llms(source)
            .index()
            .replaceAll("# Docs", "# Pixi'VN")
            .concat("\n\n")
            .concat(llms(inkSource).index().replaceAll("# Docs", "# ink language integration"))
            .concat("\n\n")
            .concat(llms(renpySource).index().replaceAll("# Docs", "# Ren'py language integration"))
            .concat("\n\n")
            .concat(llms(jsonSource).index().replaceAll("# Docs", "# Pixi'VN Json"))
            .concat("\n\n")
            .concat(llms(nqtrSource).index().replaceAll("# Docs", "# NQTR"))
            .concat("\n\n")
            .concat(llms(faqSource).index().replaceAll("# Docs", "# FAQ"))
            .replaceAll("/en/", "/"),
    );
}
