import { remarkDirectiveAdmonition } from "fumadocs-core/mdx-plugins";
import { remarkMdxFiles } from "fumadocs-core/mdx-plugins/remark-mdx-files";
import { type LoaderConfig, type LoaderOutput, llms, loader } from "fumadocs-core/source";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { defineDocs } from "fumadocs-mdx/macro";
import { icons } from "lucide-react";
import { createElement } from "react";
import remarkDirective from "remark-directive";
import { i18n } from "./i18n";
import {
    faqRoute,
    fullRehypeCodeOptions,
    inkRoute,
    nqtrRoute,
    renpyRoute,
    startRoute,
} from "./shared";

// `dir` must be a string literal: the macro is analyzed statically at build time.
// Each collection sets its own `mdxOptions` (that replaces the default ones).
const docsOptions = (mdxOptions: ReturnType<typeof applyMdxPreset>) => ({
    schema: pageSchema,
    postprocess: {
        includeProcessedMarkdown: true,
    },
    mdxOptions,
});

const defaultPreset = (
    remarkPlugins: Extract<
        NonNullable<Parameters<typeof applyMdxPreset>[0]>["remarkPlugins"],
        unknown[]
    >,
) =>
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins,
    });

const startDocs = defineDocs({
    dir: "content/start",
    docs: docsOptions(defaultPreset([remarkDirective, remarkDirectiveAdmonition, remarkMdxFiles])),
    meta: { schema: metaSchema },
});

const inkDocs = defineDocs({
    dir: "content/ink",
    docs: docsOptions(defaultPreset([remarkDirective, remarkDirectiveAdmonition])),
    meta: { schema: metaSchema },
});

const faqDocs = defineDocs({
    dir: "content/faq",
    docs: docsOptions(defaultPreset([remarkDirective, remarkDirectiveAdmonition])),
    meta: { schema: metaSchema },
});

const nqtrDocs = defineDocs({
    dir: "content/nqtr",
    docs: docsOptions(defaultPreset([remarkDirective, remarkDirectiveAdmonition])),
    meta: { schema: metaSchema },
});

const renpyDocs = defineDocs({
    dir: "content/renpy",
    docs: docsOptions(
        applyMdxPreset({
            rehypeCodeOptions: false,
            remarkCodeTabOptions: false,
            remarkPlugins: [remarkDirective, remarkDirectiveAdmonition],
        }),
    ),
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

// One `llms()` per source: it renders the `.md` files of that source (llms.txt, llms-full.txt, <page>.md)
function createLlms<C extends LoaderConfig>(input: LoaderOutput<C>) {
    return llms(input, {
        renderPage: async (page) => `# ${page.data.title} (${page.url})

${await (page.data as { getText: (type: "processed" | "raw") => Promise<string> }).getText("processed")}`,
        // link to the files under `/llms.mdx`
        renderUrl: (item) => (/^\/.*\.(md|txt)$/.test(item.url) ? `/llms.mdx${item.url}` : item.url),
    });
}

// `llms.txt` and `llms-full.txt` at the root of the site describe the main (start) source
export const docsLlms = createLlms(source);

const sectionLlms = [createLlms(inkSource), createLlms(faqSource), createLlms(nqtrSource), createLlms(renpySource)];

/** Serve a file under `/llms.mdx` (e.g. `/it/ink/intro.md`), from whichever source owns it. */
export async function serveLlmsFile(path: string) {
    for (const item of [docsLlms, ...sectionLlms]) {
        const response = await item.serve(path);
        if (response) return response;
    }
}

/** Paths of every file served under `/llms.mdx`, for `generateStaticParams`. */
export async function getLlmsFiles() {
    const files = new Set<string>();
    for (const [index, item] of [docsLlms, ...sectionLlms].entries()) {
        for (const file of await item.files()) {
            // the root `/llms.txt` and `/llms-full.txt` belong to the main source only (they have their own routes)
            if (index > 0 && /^\/llms(-full)?\.txt$/.test(file)) continue;
            files.add(file);
        }
    }
    return Array.from(files);
}

/**
 * URL of the markdown version of a page. `page.url` already holds the section and the language
 * (e.g. `/ink/intro`, `/it/start/why`), so it works for every source.
 */
export function getPageMarkdownUrl(page: { url: string }) {
    const segments = `${page.url.replace(/\/$/, "") || "/index"}.md`.split("/").filter(Boolean);
    return { segments, url: `/llms.mdx/${segments.join("/")}` };
}
