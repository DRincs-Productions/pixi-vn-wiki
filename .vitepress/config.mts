import container from "markdown-it-container";
import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { renderSandbox } from "vitepress-plugin-sandpack";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

const ogUrl = "https://pixi-vn.web.app";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Pixi’VN 2D game engine",
    description:
        "Pixi’VN is a very versatile and powerful visual novel/2D game engine. It is based on JavaScript/TypeScript and uses the PixiJS library for rendering.",

    head: [
        ["link", { rel: "icon", href: "/favicon.svg" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:title", content: "Pixi’VN - Visual Novel/2D game engine" }],
        ["meta", { property: "og:url", content: "https://pixi-vn.web.app" }],
        [
            "meta",
            {
                property: "og:description",
                content:
                    "Create your own visual novel/2D game with Pixi’VN. It is a very versatile and powerful visual novel/2D game engine. It is based on JavaScript/TypeScript and uses the PixiJS library for rendering.",
            },
        ],
        [
            "meta",
            {
                property: "og:image",
                content:
                    "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fog_image.png?alt=media",
            },
        ],
        ["meta", { property: "og:site_name", content: "Pixi’VN Wiki" }],
        ["meta", { name: "theme-color", content: "#646cff" }],
        ["meta", { name: "twitter:title", content: "Pixi’VN - Visual Novel/2D game engine" }],
        [
            "meta",
            {
                name: "twitter:description",
                content:
                    "Create your own visual novel/2D game with Pixi’VN. It is a very versatile and powerful visual novel/2D game engine. It is based on JavaScript/TypeScript and uses the PixiJS library for rendering.",
            },
        ],
        [
            "meta",
            {
                name: "twitter:image",
                content:
                    "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fog_image.png?alt=media",
            },
        ],
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:url", content: "https://pixi-vn.web.app" }],
        ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-KGCCEKXRVG" }],
        [
            "script",
            {},
            `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KGCCEKXRVG');`,
        ],
        ["script", { async: "", src: "https://cdn.botpress.cloud/webchat/v2.2/inject.js" }],
        ["script", { async: "", src: "https://files.bpcontent.cloud/2024/11/18/14/20241118144206-K69YIHK1.js" }],
    ],

    themeConfig: {
        logo: "/logo.webp",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Guide", link: "/start/getting-started" },
            {
                text: "Make your first",
                items: [
                    { text: "Visual Novel", link: "/start/make-visual-novel" },
                    { text: "Point and Click adventure game", link: "/start/make-point-and-click" },
                    { text: "RPG game", link: "/start/make-rpg" },
                ],
            },
            { text: "Advanced topics", link: "/advanced/intercept-events" },
            {
                text: "Other topics",
                items: [{ text: "Various Answers", link: "/other/various-answers" }],
            },
        ],

        sidebar: {
            "/start/": [
                {
                    text: "Getting Started",
                    items: [
                        { text: "Why Pixi’VN?", link: "/start/why" },
                        { text: "Getting Started", link: "/start/getting-started" },
                        {
                            text: "Make your first",
                            items: [
                                { text: "Visual Novel", link: "/start/make-visual-novel" },
                                { text: "Point and Click adventure game", link: "/start/make-point-and-click" },
                                { text: "RPG game", link: "/start/make-rpg" },
                            ],
                        },
                    ],
                },
                {
                    text: "First steps",
                    items: [
                        { text: "Characters", link: "/start/character" },
                        {
                            text: "Narration",
                            link: "/start/narration",
                            items: [
                                { text: "Narration with ink", link: "/ink/ink" },
                                { text: "Narration with Ren’Py (In Development)", link: "/renpy/renpy" },
                                {
                                    text: "Narration with JS/TS",
                                    items: [
                                        { text: "Dialogue", link: "/start/dialogue" },
                                        {
                                            text: "Label and Game Step",
                                            link: "/start/labels",
                                            items: [
                                                { text: "Game flow with labels", link: "/start/labels-flow" },
                                                { text: "Label features", link: "/start/labels-advanced" },
                                            ],
                                        },
                                        { text: "Choice Menus", link: "/start/choices" },
                                        { text: "Input", link: "/start/input" },
                                        { text: "History", link: "/start/history" },
                                        { text: "Translating", link: "/start/translate" },
                                        {
                                            text: "Markup language (to add text style)",
                                            link: "/start/markup",
                                            items: [
                                                { text: "Markdown", link: "/start/markup-markdown" },
                                                { text: "Typewriter effect", link: "/start/markup-typewriter" },
                                            ],
                                        },
                                        { text: "Other features", link: "/start/other-narrative-features" },
                                    ],
                                },
                            ],
                        },
                        {
                            text: "PixiJS Canvas",
                            link: "/start/canvas",
                            items: [
                                { text: "Initialize", link: "/start/canvas-initialize" },
                                { text: "Canvas alias", link: "/start/canvas-alias" },
                                {
                                    text: "Canvas Components",
                                    link: "/start/canvas-components",
                                    items: [
                                        { text: "ImageSprite", link: "/start/canvas-images" },
                                        { text: "ImageContainer", link: "/start/canvas-image-container" },
                                        { text: "VideoSprite", link: "/start/canvas-videos" },
                                        { text: "Filters", link: "/start/canvas-filters" },
                                        { text: "Lights", link: "/start/canvas-lights" },
                                        { text: "Spine 2D", link: "/start/canvas-spine2d" },
                                    ],
                                },
                                { text: "Components functions", link: "/start/canvas-functions" },
                                { text: "Position properties", link: "/start/canvas-position" },
                                { text: "Transitions", link: "/start/canvas-transition" },
                                {
                                    text: "Animations and Effects",
                                    link: "/start/canvas-animations-effects",
                                    items: [
                                        {
                                            text: "Primitives (ticker)",
                                            link: "/start/canvas-tickers",
                                            items: [
                                                { text: "Tickers methods", link: "/start/canvas-tickers-functions" },
                                            ],
                                        },
                                        { text: "Articulated", link: "/start/canvas-articulated-animations-effects" },
                                    ],
                                },
                            ],
                        },
                        { text: "Sounds and Music", link: "/start/sound" },
                        {
                            text: "Assets",
                            link: "/start/assets",
                            items: [{ text: "Assets management", link: "/start/assets-management" }],
                        },
                        {
                            text: "Game storage",
                            link: "/start/storage",
                            items: [
                                { text: "Flags Management", link: "/start/flags" },
                                { text: "Stored Classes", link: "/start/stored-classes" },
                            ],
                        },
                        {
                            text: "UI with JavaScript Framework",
                            link: "/start/interface",
                            items: [
                                {
                                    text: "JavaScript Frameworks",
                                    items: [
                                        { text: "Angular UI", link: "/start/interface-angular" },
                                        { text: "React UI", link: "/start/interface-react" },
                                        { text: "Vue UI", link: "/start/interface-vue" },
                                    ],
                                },
                                { text: "Navigate/switch between UI screens", link: "/start/interface-navigate" },
                                { text: "Connect the UI with the storage", link: "/start/interface-connect-storage" },
                            ],
                        },
                        { text: "Save and Load", link: "/start/save" },
                        { text: "Advanced topics", link: "/advanced/intercept-events" },
                    ],
                },
            ],
            "/ink/": [
                {
                    text: "ink",
                    items: [
                        {
                            text: "Narration with ink",
                            link: "/ink/ink",
                            items: [
                                { text: "Characters", link: "/ink/ink-character" },
                                { text: "Open a knot", link: "/ink/ink-label" },
                                { text: "Variables", link: "/ink/ink-variables" },
                                { text: "Markup language (to add text style)", link: "/ink/ink-markup" },
                                { text: "Input", link: "/ink/ink-input" },
                                { text: "Canvas", link: "/ink/ink-canvas" },
                                { text: "Sounds and Music", link: "/ink/ink-sound" },
                                { text: "Assets management", link: "/ink/ink-assets" },
                                { text: "Pause", link: "/ink/ink-pause" },
                                { text: "Text replacement", link: "/ink/ink-replacement" },
                                { text: "Translating", link: "/ink/ink-translate" },
                                { text: "Custom Hashtag Script", link: "/ink/ink-hashtag" },
                            ],
                        },
                        { text: "Back", link: "/start/narration" },
                    ],
                },
            ],
            "/renpy/": [
                {
                    text: "Ren’Py (In Development)",
                    items: [
                        { text: "Narration with Ren’Py", link: "/renpy/renpy" },
                        { text: "Back", link: "/start/narration" },
                    ],
                },
            ],
            "/advanced/": [
                {
                    text: "Advanced topics",
                    items: [
                        { text: "First steps", link: "/start/character" },
                        { text: "Intecept Events", link: "/advanced/intercept-events" },
                        {
                            text: "Distribution",
                            link: "/advanced/distribution",
                            items: [
                                { text: "Website distribution", link: "/advanced/distribution-website" },
                                { text: "Desktop & mobile devices", link: "/advanced/distribution-desktop-mobile" },
                            ],
                        },
                        { text: "Pixi’VN + Json", link: "/advanced/pixi-vn-json" },
                    ],
                },
            ],
            "/other/": [
                {
                    text: "Other topics",
                    items: [{ text: "Various Answers", link: "/other/various-answers" }],
                },
            ],
        },

        editLink: {
            pattern: "https://github.com/DRincs-Productions/pixi-vn/discussions/categories/wiki",
            text: "Suggest changes to this page",
        },

        socialLinks: [
            { icon: "discord", link: "https://discord.gg/E95FZWakzp" },
            { icon: "github", link: "https://github.com/DRincs-Productions/pixi-vn" },
            { icon: "npm", link: "https://www.npmjs.com/package/@drincs/pixi-vn" },
            { icon: "patreon", link: "https://www.patreon.com/c/pixi_vn" },
            // { icon: "paypal", link: "https://www.paypal.com/paypalme/DRincsProductions" },
            { icon: "reddit", link: "https://www.reddit.com/r/PixiVN" },
            { icon: "itchdotio", link: "https://drincs-productions.itch.io/pixi-vn" },
            { icon: "pixiv", link: "https://pixi-vn.fanbox.cc" },
        ],

        search: {
            provider: "local",
            options: {
                detailedView: true,
            },
        },
    },

    cleanUrls: true,
    sitemap: {
        hostname: "https://pixi-vn.web.app/",
        xmlns: {
            news: false,
            xhtml: true,
            image: false,
            video: false,
        },
        transformItems: (items) => {
            return items.map((item) => {
                if (item.url.includes("start")) {
                    return {
                        url: item.url,
                        changefreq: "monthly",
                        priority: 1,
                        lastmod: new Date(),
                    };
                }
                return {
                    url: item.url,
                    changefreq: "monthly",
                    priority: 0.7,
                    lastmod: new Date(),
                };
            });
        },
    },

    srcExclude: ["**/Home.md"],

    transformPageData(pageData) {
        const canonicalUrl = `${ogUrl}/${pageData.relativePath}`
            .replace(/\/index\.md$/, "/")
            .replace(/\/getting-started\.md$/, "/")
            .replace(/\/character\.md$/, "/")
            .replace(/\/dialogue\.md$/, "/")
            .replace(/\/images\.md$/, "/")
            .replace(/\.md$/, "/");
        pageData.frontmatter.head ??= [];
        pageData.frontmatter.head.unshift(
            ["link", { rel: "canonical", href: canonicalUrl }],
            ["meta", { property: "og:title", content: pageData.title }]
        );
        return pageData;
    },

    markdown: {
        config(md) {
            md.use(tabsMarkdownPlugin).use(container, "sandbox", {
                render(tokens, idx) {
                    return renderSandbox(tokens, idx, "sandbox");
                },
            });
            md.use(groupIconMdPlugin);
        },
        languages: [
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
    vite: {
        plugins: [groupIconVitePlugin()],
    },
});
