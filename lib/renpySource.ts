import { renpyDocs } from "@/.source";
import { loader } from "fumadocs-core/source";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const renpySource = loader({
    // it assigns a URL to your pages
    baseUrl: "/renpy",
    source: renpyDocs.toFumadocsSource(),
    pageTree: {},
});
