import {
    faqSource,
    getLLMText,
    inkSource,
    jsdocPixiVnInkSource,
    jsdocPixiVnJsonSource,
    jsdocPixiVnSource,
    jsonSource,
    nqtrSource,
    renpySource,
    source,
} from "@/lib/source";

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

    const jsdocScan = [
        ...jsdocPixiVnSource.getPages(),
        ...jsdocPixiVnJsonSource.getPages(),
        ...jsdocPixiVnInkSource.getPages(),
    ].map((page) => getLLMText(page, "raw"));

    const [scanned, scannedJsdoc] = await Promise.all([Promise.all(scan), Promise.all(jsdocScan)]);

    return new Response([...scanned, ...scannedJsdoc].join("\n\n").replaceAll("/en/", "/"));
}
