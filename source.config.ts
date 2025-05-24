import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
    // Specifies the directory where your docs are located
    dir: ["content/start", "content/ink", "content/other-topics", "content/renpy"],
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
