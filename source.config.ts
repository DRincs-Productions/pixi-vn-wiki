import { inkRehypeCodeOptions } from "@/lib/shared";
import type { ProcessorOptions } from "@mdx-js/mdx";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { applyMdxPreset, defineConfig, defineDocs } from "fumadocs-mdx/config";

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

export default defineConfig({
    mdxOptions: {
        // MDX options
        remarkPlugins: [remarkMdxMermaid],
    },
});

export const docs = createDocsCollection(
    "content/start",
    applyMdxPreset({
        rehypeCodeOptions: inkRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const inkDocs = createDocsCollection(
    "content/ink",
    applyMdxPreset({
        rehypeCodeOptions: inkRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const faqDocs = createDocsCollection(
    "content/faq",
    applyMdxPreset({
        rehypeCodeOptions: inkRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const renpyDocs = createDocsCollection(
    "content/renpy",
    applyMdxPreset({
        rehypeCodeOptions: inkRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const nqtrDocs = createDocsCollection(
    "content/nqtr",
    applyMdxPreset({
        rehypeCodeOptions: inkRehypeCodeOptions,
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    }),
);

export const jsdocPixiVnDocs = createDocsCollection("content/jsdoc/pixi-vn");

export const jsdocPixiVnJsonDocs = createDocsCollection("content/jsdoc/pixi-vn-json");

export const jsdocPixiVnInkDocs = createDocsCollection("content/jsdoc/pixi-vn-ink");
