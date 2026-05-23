import { fullRehypeCodeOptions } from "@/lib/shared";
import type { ProcessorOptions } from "@mdx-js/mdx";
import { remarkDirectiveAdmonition, remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset, defineConfig, defineDocs } from "fumadocs-mdx/config";
import remarkDirective from "remark-directive";

const admonitionPlugins = [remarkMdxMermaid, remarkDirective, remarkDirectiveAdmonition] as const;

function createDocsCollection(
    dir: string,
    mdxOptions?: ProcessorOptions | ((environment: any) => Promise<ProcessorOptions>),
) {
    return defineDocs({
        dir,
        docs: {
            schema: pageSchema,
            postprocess: {
                includeProcessedMarkdown: true,
            },
            mdxOptions,
        },
        meta: {
            schema: metaSchema,
        },
    });
}

export default defineConfig({});

export const docs = createDocsCollection(
    "content/start",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: admonitionPlugins,
    }),
);

export const inkDocs = createDocsCollection(
    "content/ink",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: admonitionPlugins,
    }),
);

export const faqDocs = createDocsCollection(
    "content/faq",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: admonitionPlugins,
    }),
);

export const renpyDocs = createDocsCollection(
    "content/renpy",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: admonitionPlugins,
    }),
);

export const nqtrDocs = createDocsCollection(
    "content/nqtr",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: admonitionPlugins,
    }),
);

export const jsdocPixiVnDocs = createDocsCollection(
    "content/jsdoc/pixi-vn",
    applyMdxPreset({
        // rehypeCodeOptions: lightRehypeCodeOptions,
        rehypeCodeOptions: false,
        remarkCodeTabOptions: false,
    }),
);

export const jsdocPixiVnJsonDocs = createDocsCollection(
    "content/jsdoc/pixi-vn-json",
    applyMdxPreset({
        // rehypeCodeOptions: lightRehypeCodeOptions,
        rehypeCodeOptions: false,
        remarkCodeTabOptions: false,
    }),
);

export const jsdocPixiVnInkDocs = createDocsCollection(
    "content/jsdoc/pixi-vn-ink",
    applyMdxPreset({
        // rehypeCodeOptions: lightRehypeCodeOptions,
        rehypeCodeOptions: false,
        remarkCodeTabOptions: false,
    }),
);
