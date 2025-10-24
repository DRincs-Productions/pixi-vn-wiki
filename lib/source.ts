import { docs, faqDocs, inkDocs, jsonDocs, nqtrDocs, renpyDocs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { i18n } from "./i18n";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
    // it assigns a URL to your pages
    baseUrl: "/start",
    source: docs.toFumadocsSource(),
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
    pageTree: {},
    i18n,
});

export const inkSource = loader({
    // it assigns a URL to your pages
    baseUrl: "/ink",
    source: inkDocs.toFumadocsSource(),
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    pageTree: {},
    i18n,
});

export const faqSource = loader({
    // it assigns a URL to your pages
    baseUrl: "/faq",
    source: faqDocs.toFumadocsSource(),
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    pageTree: {},
    i18n,
});

export const renpySource = loader({
    // it assigns a URL to your pages
    baseUrl: "/renpy",
    source: renpyDocs.toFumadocsSource(),
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    pageTree: {},
    i18n,
});

export const nqtrSource = loader({
    // it assigns a URL to your pages
    baseUrl: "/nqtr",
    source: nqtrDocs.toFumadocsSource(),
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    pageTree: {},
    i18n,
});

export const jsonSource = loader({
    // it assigns a URL to your pages
    baseUrl: "/json",
    source: jsonDocs.toFumadocsSource(),
    icon(icon) {
        if (icon && icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
    pageTree: {},
    i18n,
});
