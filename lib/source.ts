import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createElement } from "react";

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
                    },
                });
        }
    },
    pageTree: {},
});
