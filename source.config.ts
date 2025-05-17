import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
    dir: "content/start", // Specifies the directory where your docs are located
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
            theme: "github-dark",
            langs: [
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
