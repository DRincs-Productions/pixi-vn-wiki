import { remarkDirectiveAdmonition } from "fumadocs-core/mdx-plugins";
import { remarkMdxFiles } from "fumadocs-core/mdx-plugins/remark-mdx-files";
import { type LoaderConfig, type LoaderOutput, llms, loader } from "fumadocs-core/source";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { defineDocs } from "fumadocs-mdx/macro";
import { icons } from "lucide-react";
import { createElement } from "react";
import remarkDirective from "remark-directive";
import { isLightDev } from "./dev-mode";
import { i18n } from "./i18n";
import {
    faqRoute,
    fullRehypeCodeOptions,
    inkRoute,
    nqtrRoute,
    renpyRoute,
    startRoute,
} from "./shared";

// The options of `defineDocs` cannot be spread and `dir`/`async` must be literals: the macro is analyzed statically.
// Each collection sets its own `mdxOptions` (that replaces the default ones).
// `async: true` compiles the content of a page only when it is used (`page.data.load()`), not every page at once:
// it keeps the dev server fast and light, since every route imports this file.
// `lastModified: true` exposes the date of the last git commit of each page (`(await page.data.load()).lastModified`).
const postprocess = {
    // only needed by the llms files; light local development uses the raw file (see `lib/dev-mode.ts`)
    includeProcessedMarkdown: !isLightDev,
};

const defaultPreset = (
    remarkPlugins: Extract<
        NonNullable<Parameters<typeof applyMdxPreset>[0]>["remarkPlugins"],
        unknown[]
    >,
) =>
    applyMdxPreset({
        // syntax highlighting multiplies the size of the compiled pages (every token becomes an element):
        // light local development shows plain code blocks (see `lib/dev-mode.ts`)
        rehypeCodeOptions: isLightDev ? false : fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins,
    });

const startDocs = defineDocs({
    dir: "content/start",
    docs: {
        async: true,
        lastModified: true,
        schema: pageSchema,
        postprocess,
        mdxOptions: defaultPreset([remarkDirective, remarkDirectiveAdmonition, remarkMdxFiles]),
    },
    meta: { schema: metaSchema },
});

const inkDocs = defineDocs({
    dir: "content/ink",
    docs: {
        async: true,
        lastModified: true,
        schema: pageSchema,
        postprocess,
        mdxOptions: defaultPreset([remarkDirective, remarkDirectiveAdmonition]),
    },
    meta: { schema: metaSchema },
});

const faqDocs = defineDocs({
    dir: "content/faq",
    docs: {
        async: true,
        lastModified: true,
        schema: pageSchema,
        postprocess,
        mdxOptions: defaultPreset([remarkDirective, remarkDirectiveAdmonition]),
    },
    meta: { schema: metaSchema },
});

const nqtrDocs = defineDocs({
    dir: "content/nqtr",
    docs: {
        async: true,
        lastModified: true,
        schema: pageSchema,
        postprocess,
        mdxOptions: defaultPreset([remarkDirective, remarkDirectiveAdmonition]),
    },
    meta: { schema: metaSchema },
});

const renpyDocs = defineDocs({
    dir: "content/renpy",
    docs: {
        async: true,
        lastModified: true,
        schema: pageSchema,
        postprocess,
        mdxOptions: applyMdxPreset({
            rehypeCodeOptions: false,
            remarkCodeTabOptions: false,
            remarkPlugins: [remarkDirective, remarkDirectiveAdmonition],
        }),
    },
    meta: { schema: metaSchema },
});

const lucideIcon = (icon?: string) => {
    if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
};

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
    baseUrl: startRoute,
    source: startDocs.toFumadocsSource(),
    plugins: [],
    icon(icon) {
        switch (icon) {
            case "page":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/vue.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/threejs.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/react.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/markdown.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "0.6em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                        backgroundColor: "white",
                    },
                });
            case "/tailwindcss.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
        }
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    i18n,
});

export const inkSource = loader({
    baseUrl: inkRoute,
    source: inkDocs.toFumadocsSource(),
    plugins: [],
    icon: lucideIcon,
    i18n,
});

export const faqSource = loader({
    baseUrl: faqRoute,
    source: faqDocs.toFumadocsSource(),
    plugins: [],
    icon: lucideIcon,
    i18n,
});

export const renpySource = loader({
    baseUrl: renpyRoute,
    source: renpyDocs.toFumadocsSource(),
    plugins: [],
    icon: lucideIcon,
    i18n,
});

export const nqtrSource = loader({
    baseUrl: nqtrRoute,
    source: nqtrDocs.toFumadocsSource(),
    plugins: [],
    icon: lucideIcon,
    i18n,
});

export type MarkdownSection = "start" | "ink" | "faq" | "nqtr" | "renpy";

/** the source (loader) of each section of the docs */
export const sectionSources = {
    start: source,
    ink: inkSource,
    faq: faqSource,
    nqtr: nqtrSource,
    renpy: renpySource,
} satisfies Record<MarkdownSection, unknown>;

export const markdownSections = Object.keys(sectionSources) as MarkdownSection[];

/**
 * Public path of a page, e.g. `/start/canvas-image` (English) or `/it/ink/hashtag`.
 * English is served at the root of the site, without the `/en` prefix.
 */
export function getPagePath(section: MarkdownSection, slugs: string[] = [], lang?: string) {
    const prefix = lang && lang !== i18n.defaultLanguage ? `/${lang}` : "";
    // `prefix` is "" or "/it": joining it with "/" always gives an absolute path
    return [prefix, section, ...slugs].join("/");
}

/** Open Graph image of a page (English only), served by `app/og/docs`: `/og/docs/<section>/<slug>/image.webp` */
export function getPageImagePath(section: MarkdownSection, slugs: string[] = []) {
    const segments = [section, ...slugs, "image.webp"];
    return { segments, url: `/og/docs/${segments.join("/")}` };
}

// The `.md` files of a source (llms.txt, llms-full.txt, one per page) come from its `llms()`.
// English is served at the root of the site, so its URLs must not have the `/en` prefix.
function createSection<C extends LoaderConfig>(input: LoaderOutput<C>) {
    const output = llms(input, {
        renderPage: async (page) => `# ${page.data.title} (${page.url.replace(/^\/en\//, "/")})

${await (page.data as { getText: (type: "processed" | "raw") => Promise<string> }).getText(isLightDev ? "raw" : "processed")}`,
        // no per-folder `llms-full.txt` files: only the files of the pages are served (see `getPageMarkdownUrl`)
        section: () => false,
        // link to the markdown route of a page, e.g. `/en/ink/intro.md` -> `/llms.mdx/docs/ink/intro/content.md`
        renderUrl: (item) => markdownUrlFromPageUrl(item.url) ?? item.url,
    });

    return {
        llms: output,
        /** slugs of the English pages */
        getSlugs: () => input.getPages("en").map((page) => page.slugs),
        /** markdown of the English page with these slugs, `undefined` if there is none */
        render: async (slugs: string[]) => {
            const page = input.getPage(slugs, "en");
            return page ? output.page(page) : undefined;
        },
    };
}

const sections = {
    start: createSection(source),
    ink: createSection(inkSource),
    faq: createSection(faqSource),
    nqtr: createSection(nqtrSource),
    renpy: createSection(renpySource),
} satisfies Record<MarkdownSection, unknown>;

// `llms.txt` and `llms-full.txt` at the root of the site describe the main (start) source
export const docsLlms = sections.start.llms;
export const inkLlms = sections.ink.llms;
export const faqLlms = sections.faq.llms;
export const nqtrLlms = sections.nqtr.llms;
export const renpyLlms = sections.renpy.llms;

/**
 * Markdown version of a page, served by `app/llms.mdx/[...path]`:
 * `/llms.mdx/docs/<slug>/content.md` for `start`, `/llms.mdx/docs/<section>/<slug>/content.md` for the others.
 * It is always the English one (also for the translated pages).
 */
export function getPageMarkdownUrl(page: { slugs: string[] }, section: MarkdownSection) {
    const segments = [
        "docs",
        ...(section === "start" ? [] : [section]),
        ...page.slugs,
        "content.md",
    ];
    return { segments, url: `/llms.mdx/${segments.join("/")}` };
}

/** `/en/ink/intro.md` (a file of `llms()`) -> `/llms.mdx/docs/ink/intro/content.md`, `undefined` if it is not a page. */
function markdownUrlFromPageUrl(url: string) {
    const match = /^\/en\/(start|ink|faq|nqtr|renpy)((?:\/.*)?)\.md$/.exec(url);
    if (!match) return;
    const slugs = match[2].split("/").filter(Boolean);
    return getPageMarkdownUrl({ slugs }, match[1] as MarkdownSection).url;
}

/** Content of a file served under `/llms.mdx` (path split in segments), `undefined` if there is none. */
export async function serveMarkdown(path: string[]) {
    if (path[0] !== "docs" || path.at(-1) !== "content.md") return;
    const middle = path.slice(1, -1);
    // `docs/ink/...` is the `ink` section, anything else belongs to `start`
    const section =
        middle[0] in sections && middle[0] !== "start" ? (middle[0] as MarkdownSection) : "start";
    const slugs = section === "start" ? middle : middle.slice(1);
    return sections[section].render(slugs);
}

/** Path (segments) of every file served under `/llms.mdx`, for `generateStaticParams`. */
export function getMarkdownPaths() {
    return (Object.keys(sections) as MarkdownSection[]).flatMap((section) =>
        sections[section]
            .getSlugs()
            .map((slugs) => getPageMarkdownUrl({ slugs }, section).segments),
    );
}
