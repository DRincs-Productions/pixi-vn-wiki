import { i18n } from "@/lib/i18n";
import { appName } from "@/lib/shared";
import {
    getPageImagePath,
    getPageMarkdownUrl,
    getPagePath,
    type MarkdownSection,
    sectionSources,
} from "@/lib/source";
import type { Metadata } from "next/types";

export const baseUrl = "https://pixi-vn.com";

const homeTitle = `${appName} - Visual Novel Engine for React, JavaScript & TypeScript`;
export const homeDescription =
    "Create your own visual novel or story-driven game with Pixi’VN, a React/JavaScript/TypeScript visual novel engine with ink (Inkle) support, built on the PixiJS rendering library.";

/** Title of a page without the Markdown syntax (e.g. "Image (`ImageSprite`)" -> "Image (ImageSprite)") */
export function plainTitle(title: string) {
    return title.replaceAll("`", "").trim();
}

/** Absolute URL of a public path (the homepage is `https://pixi-vn.com`, without the trailing slash) */
export function absoluteUrl(path: string) {
    return path === "/" ? baseUrl : `${baseUrl}${path}`;
}

/** Canonical URL of the page in each language, plus `x-default` (English) */
function languageAlternates(getPath: (lang: string) => string) {
    const languages: Record<string, string> = {};
    for (const lang of i18n.languages) languages[lang] = absoluteUrl(getPath(lang));
    languages["x-default"] = absoluteUrl(getPath(i18n.defaultLanguage));
    return languages;
}

/**
 * Metadata of a page of the wiki.
 * - `section` + `slug`: a docs page (e.g. `ink` + `["hashtag"]` is `/ink/hashtag`, an empty slug is the index of the section);
 * - no `section`: the homepage.
 */
export function createMetadata({
    section,
    slug = [],
    lang = i18n.defaultLanguage,
}: {
    section?: MarkdownSection;
    slug?: string[];
    lang?: string;
}): Metadata {
    const common: Metadata = {
        metadataBase: new URL(baseUrl),
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            ],
            shortcut: "/favicon.ico",
            apple: "/icon-192.png",
        },
    };

    const source = section ? sectionSources[section] : undefined;
    // the translated page (title and description in that language), or the English one
    const page = source ? (source.getPage(slug, lang) ?? source.getPage(slug)) : undefined;

    if (!section || !page) {
        const homePath = (l: string) => (l === i18n.defaultLanguage ? "/" : `/${l}`);
        return {
            ...common,
            title: homeTitle,
            description: homeDescription,
            alternates: {
                canonical: absoluteUrl(homePath(lang)),
                languages: languageAlternates(homePath),
            },
            openGraph: {
                title: homeTitle,
                description: homeDescription,
                url: absoluteUrl(homePath(lang)),
                images: `${baseUrl}/og_image.png`,
                siteName: appName,
                type: "website",
                locale: lang,
            },
            twitter: {
                card: "summary_large_image",
                creator: "@money_is_shark",
                title: homeTitle,
                description: homeDescription,
                images: `${baseUrl}/og_image.png`,
            },
        };
    }

    const title = `${plainTitle(page.data.title)} | ${appName}`;
    const description = page.data.description;
    const url = absoluteUrl(getPagePath(section, slug, lang));
    const image = `${baseUrl}${getPageImagePath(section, slug).url}`;

    return {
        ...common,
        title,
        description,
        alternates: {
            canonical: url,
            languages: languageAlternates((l) => getPagePath(section, slug, l)),
            types: {
                // Markdown version of the page, for AI agents (see `app/llms.mdx`)
                "text/markdown": absoluteUrl(getPageMarkdownUrl({ slugs: slug }, section).url),
            },
        },
        openGraph: {
            title,
            description,
            url,
            images: image,
            siteName: appName,
            type: "article",
            locale: lang,
        },
        twitter: {
            card: "summary_large_image",
            creator: "@money_is_shark",
            title,
            description,
            images: image,
        },
    };
}
