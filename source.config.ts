import { fullRehypeCodeOptions, lightRehypeCodeOptions } from "@/lib/shared";
import type { ProcessorOptions } from "@mdx-js/mdx";
import { remarkDirectiveAdmonition, remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import { remarkMdxFiles } from "fumadocs-core/mdx-plugins/remark-mdx-files";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset, defineConfig, defineDocs } from "fumadocs-mdx/config";
import remarkDirective from "remark-directive";

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
        remarkPlugins: [remarkDirective, remarkDirectiveAdmonition, remarkMdxFiles],
    }),
);

export const inkDocs = createDocsCollection(
    "content/ink",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: [remarkDirective, remarkDirectiveAdmonition],
    }),
);

export const faqDocs = createDocsCollection(
    "content/faq",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: [remarkDirective, remarkDirectiveAdmonition],
    }),
);

export const renpyDocs = createDocsCollection(
    "content/renpy",
    applyMdxPreset({
        rehypeCodeOptions: false,
        remarkCodeTabOptions: false,
        remarkPlugins: [remarkDirective, remarkDirectiveAdmonition],
    }),
);

export const nqtrDocs = createDocsCollection(
    "content/nqtr",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: [remarkDirective, remarkDirectiveAdmonition],
    }),
);

export const jsdocPixiVnDocs = createDocsCollection(
    "content/jsdoc/pixi-vn",
    applyMdxPreset({
        rehypeCodeOptions: lightRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const jsdocPixiVnJsonDocs = createDocsCollection(
    "content/jsdoc/pixi-vn-json",
    applyMdxPreset({
        rehypeCodeOptions: lightRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
        remarkPlugins: [remarkMdxMermaid],
    }),
);

export const jsdocPixiVnInkDocs = createDocsCollection(
    "content/jsdoc/pixi-vn-ink",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const jsdocNqtrDocs = createDocsCollection(
    "content/jsdoc/nqtr",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const jsdocPixiVnSpineDocs = createDocsCollection(
    "content/jsdoc/pixi-vn-spine",
    applyMdxPreset({
        rehypeCodeOptions: fullRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);
