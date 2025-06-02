import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, EditOnGitHub } from "fumadocs-ui/page";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function MDXPage({ params, folther }: { params: { slug?: string[] }; folther: string }) {
    const locale = await getLocale();
    const page = source.getPage(params.slug, locale);
    if (!page) notFound();

    const MDXContent = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className='mb-0'>{page.data.description}</DocsDescription>
            <DocsBody>
                <div className='flex flex-row gap-2 items-center mb-4'>
                    <EditOnGitHub
                        href={`https://github.com/DRincs-Productions/pixi-vn-wiki/blob/main/content/${folther}/${page.file.path}`}
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
