import { getMarkdownPaths, serveMarkdown } from "@/lib/source";

export const revalidate = false;
// other paths are 404s, never cached responses
export const dynamicParams = false;

export async function GET(_req: Request, { params }: RouteContext<"/llms.mdx/[...path]">) {
    const { path } = await params;
    const markdown = await serveMarkdown(path);
    if (markdown === undefined) return new Response(null, { status: 404 });

    // English is served at the root of the site, so its URLs must not have the `/en` prefix
    return new Response(markdown.replaceAll("/en/", "/"), {
        headers: {
            "Content-Type": "text/markdown",
        },
    });
}

export function generateStaticParams() {
    return getMarkdownPaths().map((path) => ({ path }));
}
