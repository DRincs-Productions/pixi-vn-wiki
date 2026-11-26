const { execFileSync } = require("node:child_process");
const { existsSync } = require("node:fs");

const siteUrl = "https://pixi-vn.com";
// keep in sync with `lib/i18n.ts` (English is served at the root of the site, without `/en`)
const defaultLanguage = "en";
const languages = ["en", "it", "ru", "zh", "ja", "es", "fr", "ko", "de"];
const sections = ["start", "ink", "faq", "nqtr", "renpy"];

/** date of the last commit of each file of `content/` (e.g. `content/start/assets.mdx`), read once from git */
function readGitDates() {
    const dates = new Map();
    try {
        const output = execFileSync(
            "git",
            ["-c", "core.quotepath=off", "log", "--format=%x00%cI", "--name-only", "--", "content"],
            { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 },
        );
        // newest commits first: the first date found for a file is its last change
        for (const commit of output.split("\0")) {
            const [date, ...files] = commit.trim().split("\n");
            for (const file of files) if (file && !dates.has(file)) dates.set(file, date);
        }
    } catch {
        // no git: the sitemap is generated without `lastmod`
    }
    return dates;
}
const gitDates = readGitDates();

/** split a path in its language and the path of the English page, e.g. `/it/ink/hashtag` -> `it`, `/ink/hashtag` */
function splitLanguage(path) {
    const [first, ...rest] = path.split("/").filter(Boolean);
    if (languages.includes(first) && first !== defaultLanguage)
        return { lang: first, basePath: `/${rest.join("/")}` };
    return { lang: defaultLanguage, basePath: path };
}

/** source file of a docs page (`/ink/hashtag` in Italian -> `content/ink/hashtag.it.mdx`), `undefined` for other pages */
function contentFile(basePath, lang) {
    const [section, ...slugs] = basePath.split("/").filter(Boolean);
    if (!sections.includes(section)) return;
    const suffix = lang === defaultLanguage ? "" : `.${lang}`;
    const name = slugs.length > 0 ? slugs.join("/") : "index";
    return [
        `content/${section}/${name}${suffix}.mdx`,
        `content/${section}/${name}/index${suffix}.mdx`,
    ].find((file) => gitDates.has(file) || existsSync(file));
}

/** `/llms.mdx/docs/ink/hashtag/content.md` -> `/ink/hashtag`, `/llms.mdx/docs/assets/content.md` -> `/start/assets` */
function markdownBasePath(path) {
    const segments = path.split("/").filter(Boolean).slice(2, -1);
    return sections.includes(segments[0]) && segments[0] !== "start"
        ? `/${segments.join("/")}`
        : `/start/${segments.join("/")}`.replace(/\/$/, "");
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    outDir: "./out",
    // not pages: search index, Open Graph images, icons, English pages duplicated under `/en`
    exclude: [
        "/en",
        "/en/*",
        "*/en/*",
        "/api/*",
        "/og/*",
        "/icon.png",
        "/icon-192.png",
        "/favicon.ico",
    ],
    transform: async (config, path) => {
        // Markdown versions of the pages for AI agents (`/llms.mdx/docs/<page>/content.md`, see app/llms.mdx)
        if (path.endsWith("content.md")) {
            const file = contentFile(markdownBasePath(path), defaultLanguage);
            return {
                loc: path,
                changefreq: "monthly",
                priority: 0.2,
                lastmod: file ? gitDates.get(file) : undefined,
            };
        }

        const { lang, basePath } = splitLanguage(path);
        const isPage = basePath === "/" || sections.includes(basePath.split("/")[1]);
        const file = contentFile(basePath, lang);
        const localizedUrl = (l) => {
            const prefix = l === defaultLanguage ? "" : `/${l}`;
            return `${siteUrl}${prefix}${basePath === "/" ? "" : basePath}`;
        };

        return {
            loc: path,
            changefreq: "monthly",
            priority: config.priority,
            // the date of the last change of the page, not of the build
            lastmod: file ? gitDates.get(file) : undefined,
            // every language of the page, itself included, plus `x-default` (the same as `<link rel="alternate">`)
            alternateRefs: isPage
                ? [
                      ...languages.map((l) => ({
                          href: localizedUrl(l),
                          hreflang: l,
                          hrefIsAbsolute: true,
                      })),
                      {
                          href: localizedUrl(defaultLanguage),
                          hreflang: "x-default",
                          hrefIsAbsolute: true,
                      },
                  ]
                : [],
        };
    },
};
