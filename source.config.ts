import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import { inkLanguage } from "./lib/syntaxes";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
    // Specifies the directory where your docs are located
    dir: "content/start",
    docs: {
        schema: frontmatterSchema,
    },
    meta: {
        schema: metaSchema,
    },
});

export default defineConfig({
    mdxOptions: {
        // MDX options
        rehypePlugins: [],
        rehypeCodeOptions: {
            lazy: true,
            inline: "tailing-curly-colon",
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            theme: "github-dark",
            langs: [
                "ts",
                "js",
                "html",
                "tsx",
                "mdx",
                inkLanguage,
                {
                    displayName: "Ren’Py",
                    name: "renpy",
                    patterns: [
                        {
                            include: "source.python",
                        },
                    ],
                    repository: {},
                    scopeName: "source.renpy",
                },
            ],
            icon: {
                extend: {
                    ink: {
                        viewBox: "0 0 32 32",
                        d: "M15.122,12.234a.5.5,0,0,0,.5-.5c0-.276-.108-.6-.384-.6a.7.7,0,0,0-.614.6A.5.5,0,0,0,15.122,12.234Zm-1.286,5.04a1.834,1.834,0,0,0,1.327-.55.438.438,0,1,0,.871.064A.4.4,0,0,0,15.8,16.4c-.22-.125-.246-.416-.134-.406s.279.192.463.283a1.42,1.42,0,0,0,.665.171c.994,0,2.167-.766,2.167-1.76a1.633,1.633,0,0,0-1.72-1.678A1.734,1.734,0,0,0,15.583,14.3a4.474,4.474,0,0,0-.032.5c0,.122-.01.22-.114.236s-.2-.082-.344-.268a1.253,1.253,0,0,0-1.1-.487,1.539,1.539,0,0,0-1.5,1.5A1.364,1.364,0,0,0,13.836,17.274Zm9.2.309a.612.612,0,0,0,.638-.746c-.05-.422-.188-.693-.617-.693a.693.693,0,0,0-.693.693h0A.723.723,0,0,0,23.033,17.583Zm2.655.254a4,4,0,0,0-3.529,2.138c-.267.483-.2,1.272-.427,1.375-.27.122-.925-1.087-.975-2.131a1.828,1.828,0,0,0-1.8-1.768c-1.195-.045-1.608,1.318-2.058,1.393-.26.043-.627-.819-2.044-1.075a1.894,1.894,0,0,0-2.075,1.869c-.056,1.919,1.784,2.528,1.719,3.112-.031.281-.406.344-.488,1.294-.084.977.75,1.239.731,1.581-.016.289-.755.65-1.347.24-.243-.168-.709-.846-1.531-.852A1.788,1.788,0,0,0,10.258,26a11.538,11.538,0,0,0,17.024-7.6A1.877,1.877,0,0,0,25.688,17.837Z",
                        fill: "currentColor",
                    },
                },
            },
        },
        remarkCodeTabOptions: {
            parseMdx: true,
        },
    },
});

export const inkDocs = defineDocs({
    // Specifies the directory where your docs are located
    dir: "content/ink",
    docs: {
        schema: frontmatterSchema,
    },
    meta: {
        schema: metaSchema,
    },
});

export const otherTopicsDocs = defineDocs({
    // Specifies the directory where your docs are located
    dir: "content/other-topics",
    docs: {
        schema: frontmatterSchema,
    },
    meta: {
        schema: metaSchema,
    },
});

export const renpyDocs = defineDocs({
    // Specifies the directory where your docs are located
    dir: "content/renpy",
    docs: {
        schema: frontmatterSchema,
    },
    meta: {
        schema: metaSchema,
    },
});

export const nqtrDocs = defineDocs({
    // Specifies the directory where your docs are located
    dir: "content/nqtr",
    docs: {
        schema: frontmatterSchema,
    },
    meta: {
        schema: metaSchema,
    },
});
