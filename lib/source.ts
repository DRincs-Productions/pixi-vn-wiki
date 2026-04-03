import { docs, faqDocs, inkDocs, jsonDocs, nqtrDocs, renpyDocs } from "collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { i18n } from "./i18n";
import {
    docsContentRoute,
    docsImageRoute,
    faqRoute,
    inkRoute,
    jsonRoute,
    nqtrRoute,
    renpyRoute,
    startRoute,
} from "./shared";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
    baseUrl: startRoute,
    source: docs.toFumadocsSource(),
    plugins: [],
    icon(icon) {
        switch (icon) {
            case "page":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/vue.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/spine.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/threejs.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/react.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
            case "/markdown.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "0.6em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                        backgroundColor: "white",
                    },
                });
            case "/tailwindcss.svg":
                return createElement("img", {
                    src: icon,
                    alt: "icon",
                    style: {
                        width: "1em",
                        height: "1em",
                        verticalAlign: "middle",
                        borderRadius: "5px",
                    },
                });
        }
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    i18n,
});

export const inkSource = loader({
    // it assigns a URL to your pages
    baseUrl: inkRoute,
    source: inkDocs.toFumadocsSource(),
    plugins: [],
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    i18n,
});

export const faqSource = loader({
    // it assigns a URL to your pages
    baseUrl: faqRoute,
    source: faqDocs.toFumadocsSource(),
    plugins: [],
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    i18n,
});

export const renpySource = loader({
    // it assigns a URL to your pages
    baseUrl: renpyRoute,
    source: renpyDocs.toFumadocsSource(),
    plugins: [],
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    i18n,
});

export const nqtrSource = loader({
    // it assigns a URL to your pages
    baseUrl: nqtrRoute,
    source: nqtrDocs.toFumadocsSource(),
    plugins: [],
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    i18n,
});

export const jsonSource = loader({
    // it assigns a URL to your pages
    baseUrl: jsonRoute,
    source: jsonDocs.toFumadocsSource(),
    plugins: [],
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    i18n,
});

export function getPageImage(page: InferPageType<typeof source>) {
    const segments = [...page.slugs, "image.png"];

    return {
        segments,
        url: `${docsImageRoute}/${segments.join("/")}`,
    };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
    const segments = [...page.slugs, "content.md"];

    return {
        segments,
        url: `${docsContentRoute}/${segments.join("/")}`,
    };
}

export async function getLLMText(page: InferPageType<typeof source>) {
    const processed = await page.data.getText("processed");

    return `# ${page.data.title} (${page.url})

${processed}`;
}
