import { docsLlms, faqLlms, inkLlms, nqtrLlms, renpyLlms } from "@/lib/source";

export const revalidate = false;

export async function GET() {
    // every page (English only) of every source, rendered as markdown
    const parts = await Promise.all(
        [docsLlms, inkLlms, renpyLlms, nqtrLlms, faqLlms].map((source) => source.full("en")),
    );

    return new Response(parts.join("\n\n").replaceAll("/en/", "/"), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
