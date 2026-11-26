import { absoluteUrl, baseUrl, plainTitle } from "@/lib/metadata";
import { appName, discordUrl, gitConfig, kofiUrl } from "@/lib/shared";
import { getPageImagePath, getPagePath, type MarkdownSection, sectionSources } from "@/lib/source";

/** Structured data (https://schema.org) of a page, read by search engines and AI assistants */
function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // `<` is escaped so the content can never close the script tag
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON generated from trusted data
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
        />
    );
}

const organization = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "DRincs Productions",
    url: baseUrl,
    logo: `${baseUrl}/icon-192.png`,
    sameAs: [`https://github.com/${gitConfig.user}`, discordUrl, kofiUrl],
};

const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: appName,
    url: baseUrl,
    publisher: { "@id": `${baseUrl}/#organization` },
};

/** Homepage: the website, its publisher and the engine itself */
export function HomeJsonLd({ description }: { description: string }) {
    return (
        <JsonLd
            data={{
                "@context": "https://schema.org",
                "@graph": [
                    website,
                    organization,
                    {
                        "@type": "SoftwareSourceCode",
                        name: appName,
                        description,
                        url: baseUrl,
                        codeRepository: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
                        programmingLanguage: ["TypeScript", "JavaScript"],
                        runtimePlatform: "Web browser",
                        // license of the `@drincs/pixi-vn` npm package
                        license: "https://spdx.org/licenses/LGPL-2.1.html",
                        author: { "@id": `${baseUrl}/#organization` },
                    },
                ],
            }}
        />
    );
}

/** Docs page: the article and its breadcrumb (home > section > page) */
export function DocsPageJsonLd({
    section,
    slug = [],
    lang,
    title,
    description,
    lastModified,
}: {
    section: MarkdownSection;
    slug?: string[];
    lang: string;
    title: string;
    description?: string;
    lastModified?: Date;
}) {
    const url = absoluteUrl(getPagePath(section, slug, lang));
    const sectionPage =
        sectionSources[section].getPage([], lang) ?? sectionSources[section].getPage([]);
    const breadcrumb = [
        { name: appName, url: absoluteUrl(lang === "en" ? "/" : `/${lang}`) },
        ...(sectionPage
            ? [
                  {
                      name: plainTitle(sectionPage.data.title),
                      url: absoluteUrl(getPagePath(section, [], lang)),
                  },
              ]
            : []),
        ...(slug.length > 0 ? [{ name: plainTitle(title), url }] : []),
    ];

    return (
        <JsonLd
            data={{
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "TechArticle",
                        headline: plainTitle(title),
                        description,
                        url,
                        inLanguage: lang,
                        image: `${baseUrl}${getPageImagePath(section, slug).url}`,
                        ...(lastModified && { dateModified: lastModified.toISOString() }),
                        isPartOf: { "@id": `${baseUrl}/#website` },
                        publisher: organization,
                    },
                    {
                        "@type": "BreadcrumbList",
                        itemListElement: breadcrumb.map((item, index) => ({
                            "@type": "ListItem",
                            position: index + 1,
                            name: item.name,
                            item: item.url,
                        })),
                    },
                ],
            }}
        />
    );
}
