import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, EditOnGitHub } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { TranslateButton } from "./ui/buttons";

export default async function MDXPage({ lang, slug, folther }: { lang?: string; slug?: string[]; folther: string }) {
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
                        href={`https://github.com/DRincs-Productions/pixi-vn-wiki/blob/main/content/${folther}/${page.file.path}`}
                    />
                    <TranslateButton />
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
