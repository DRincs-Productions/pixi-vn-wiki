import { getLLMText, getPageMarkdownUrl, inkSource } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<"/llms.mdx/docs/ink/[[...slug]]">) {
    const { slug } = await params;
    // remove the appended "content.md"
    const page = inkSource.getPage(slug?.slice(0, -1));
    if (!page) notFound();

    return new Response((await getLLMText(page)).replaceAll("/en/", "/"), {
        headers: {
            "Content-Type": "text/markdown",
        },
    });
}

export function generateStaticParams() {
    return inkSource.getPages().map((page) => ({
        slug: getPageMarkdownUrl(page, "ink").segments,
    }));
}
