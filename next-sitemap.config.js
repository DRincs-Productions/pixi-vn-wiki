/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://pixi-vn.com/",
    generateRobotsTxt: true,
    outDir: "./out",
    exclude: ["*/en/*"],
    transform: async (config, path) => {
        const isJsdocRoute = path === "/jsdoc" || path.startsWith("/jsdoc/");
        const isContentMdRoute = path.endsWith("content.md");

        return {
            loc: path,
            changefreq: isJsdocRoute ? "daily" : "monthly",
            priority: isContentMdRoute ? 0.2 : isJsdocRoute ? 0.5 : config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        };
    },
};
