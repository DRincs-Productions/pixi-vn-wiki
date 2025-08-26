import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";

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
                {
                    displayName: "ink",
                    name: "ink",
                    patterns: [
                        {
                            include: "#comment",
                        },
                    ],
                    repository: {
                        comment: {
                            captures: {
                                "0": {
                                    name: "entity.name.label.ink",
                                },
                            },
                            match: "(?<=^|\\s)(\\/\\/)(.*$)",
                        },
                    },
                    scopeName: "source.ink",
                },
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
