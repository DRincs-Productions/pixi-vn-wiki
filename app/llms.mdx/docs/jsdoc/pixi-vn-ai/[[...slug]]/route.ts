import { getJsdocPageMarkdownUrl, getLLMText, jsdocPixiVnAiSource } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    // remove the appended "content.md"
    const page = jsdocPixiVnAiSource.getPage(slug?.slice(0, -1));
    if (!page) notFound();

    return new Response(await getLLMText(page), {
        headers: {
            "Content-Type": "text/markdown",
        },
    });
}

export function generateStaticParams() {
    return jsdocPixiVnAiSource.getPages().map((page) => ({
        slug: getJsdocPageMarkdownUrl(page, "pixi-vn-ai").segments,
    }));
}
