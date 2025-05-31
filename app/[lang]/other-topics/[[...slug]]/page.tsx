import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, EditOnGitHub } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await props.params;
    const page = source.getPage(slug, lang);
    if (!page) notFound();

    const MDXContent = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className='mb-0'>{page.data.description}</DocsDescription>
            <DocsBody>
                <div className='flex flex-row gap-2 items-center mb-4'>
                    <EditOnGitHub
                        href={`https://github.com/DRincs-Productions/pixi-vn-wiki/blob/main/content/other-topics/${page.file.path}`}
                    />
                </div>
                <MDXContent
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(source, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await props.params;
    const page = source.getPage(slug, lang);
    if (!page) notFound();

    return createMetadata({
        title: `Pixi'VN - ${page.data.title}`,
        description: page.data.description,
    });
}
