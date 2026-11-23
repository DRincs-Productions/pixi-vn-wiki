/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://pixi-vn.com/",
    generateRobotsTxt: true,
    outDir: "./out",
    exclude: ["*/en/*"],
    transform: async (config, path) => {
        // Markdown versions of the pages (`/llms.mdx/docs/<page>/content.md`, see app/llms.mdx)
        const isContentMdRoute = path.endsWith("content.md");

        return {
            loc: path,
            changefreq: "monthly",
            priority: isContentMdRoute ? 0.2 : config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        };
    },
};
