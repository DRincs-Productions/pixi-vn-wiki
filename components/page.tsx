import { getMDXComponents } from "@/components/mdx";
import { routing } from "@/i18n/routing";
import { faqSource, getPageMarkdownUrl, inkSource, jsonSource, nqtrSource, renpySource, source } from "@/lib/source";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
    EditOnGitHub,
    ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { Edit } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { GiscusComments } from "./giscus-comments";
import { ChatGPTButton, PatreonButton, TranslateButton } from "./page-actions";

export default async function MDXPage({
    lang,
    slug,
    folther,
}: {
    lang?: string;
    slug?: string[];
    folther: "start" | "ink" | "faq" | "renpy" | "nqtr" | "json";
}) {
    let page;
    let pageBase;
    switch (folther) {
        case "start":
            page = source.getPage(slug, lang);
            pageBase = source.getPage(slug);
            break;
        case "ink":
            page = inkSource.getPage(slug, lang);
            pageBase = inkSource.getPage(slug);
            break;
        case "faq":
            page = faqSource.getPage(slug, lang);
            pageBase = faqSource.getPage(slug);
            break;
        case "json":
            page = jsonSource.getPage(slug, lang);
            pageBase = jsonSource.getPage(slug);
            break;
        case "renpy":
            page = renpySource.getPage(slug, lang);
            pageBase = renpySource.getPage(slug);
            break;
        case "nqtr":
            page = nqtrSource.getPage(slug, lang);
            pageBase = nqtrSource.getPage(slug);
            break;
        default:
            notFound();
    }
    // If a localized page is missing, fall back to the base (source) page.
    if (!page && pageBase) {
        page = pageBase;
    }
    if (!page || !pageBase) notFound();
    const t = await getTranslations({ locale: lang ?? routing.defaultLocale, namespace: "common" });

    const MDX = page.data.body;
    const markdownUrl = getPageMarkdownUrl(page, folther).url;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className='mb-0'>{page.data.description}</DocsDescription>
            <div className='flex flex-row gap-2 items-center border-b pb-6'>
                <EditOnGitHub
                    href={`https://github.com/DRincs-Productions/pixi-vn-wiki/blob/main/content/${folther}/${pageBase.path}`}
                >
                    <Edit className='size-3.5' />
                    {t("edit_github")}
                </EditOnGitHub>
                <TranslateButton lang={lang} folther={folther} />
                <ViewOptionsPopover markdownUrl={markdownUrl} />
                <ChatGPTButton markdownUrl={pageBase.url} />
                <PatreonButton />
            </div>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(source, page),
                    })}
                />
            </DocsBody>
            <GiscusComments lang={lang} folther={folther} slug={slug} />
        </DocsPage>
    );
}
