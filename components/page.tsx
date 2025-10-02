import { inkSource, nqtrSource, otherTopicsSource, renpySource, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, EditOnGitHub } from "fumadocs-ui/page";
import { Edit } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ChatGPTButton, TranslateButton } from "./page-actions";

export default async function MDXPage({
    lang,
    slug,
    folther,
}: {
    lang?: string;
    slug?: string[];
    folther: "start" | "ink" | "other-topics" | "renpy" | "nqtr";
}) {
    let page;
    switch (folther) {
        case "start":
            page = source.getPage(slug, lang);
            break;
        case "ink":
            page = inkSource.getPage(slug, lang);
            break;
        case "other-topics":
            page = otherTopicsSource.getPage(slug, lang);
            break;
        case "renpy":
            page = renpySource.getPage(slug, lang);
            break;
        case "nqtr":
            page = nqtrSource.getPage(slug, lang);
            break;
        default:
            notFound();
    }
    if (!page) notFound();
    const t = await getTranslations("common");

    const MDXContent = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className='mb-0'>{page.data.description}</DocsDescription>
            <DocsBody>
                <div className='flex flex-row gap-2 items-center mb-4'>
                    <EditOnGitHub
                        href={`https://github.com/DRincs-Productions/pixi-vn-wiki/blob/main/content/${page.path}`}
                    >
                        <Edit className='size-3.5' />
                        {t("edit_github")}
                    </EditOnGitHub>
                    <TranslateButton lang={lang} folther={folther} />
                    <ChatGPTButton markdownUrl={page.url} />
                </div>
                <MDXContent
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(inkSource, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}
