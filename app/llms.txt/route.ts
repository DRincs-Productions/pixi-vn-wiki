import { faqSource, inkSource, jsonSource, nqtrSource, renpySource, source } from "@/lib/source";
import { llms } from "fumadocs-core/source";

export const revalidate = false;

export function GET() {
    return new Response(
        llms(source)
            .index()
            .concat("\n\n")
            .concat(llms(inkSource).index())
            .concat("\n\n")
            .concat(llms(renpySource).index())
            .concat("\n\n")
            .concat(llms(jsonSource).index())
            .concat("\n\n")
            .concat(llms(nqtrSource).index())
            .concat("\n\n")
            .concat(llms(faqSource).index())
            .replaceAll("/en/", "/"),
    );
}
