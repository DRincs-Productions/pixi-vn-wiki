import { faqSource, getLLMText, inkSource, jsonSource, nqtrSource, renpySource, source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
    const scan = source
        .getPages()
        .concat(inkSource.getPages())
        .concat(renpySource.getPages())
        .concat(jsonSource.getPages())
        .concat(nqtrSource.getPages())
        .concat(faqSource.getPages())
        .filter((v) => v.locale === "en")
        .map(getLLMText);
    const scanned = await Promise.all(scan);

    return new Response(scanned.join("\n\n").replaceAll("/en/", "/"));
}
