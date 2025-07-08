import { nqtrDocs } from "@/.source";
import { loader } from "fumadocs-core/source";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const nqtrSource = loader({
    // it assigns a URL to your pages
    baseUrl: "/nqtr",
    source: nqtrDocs.toFumadocsSource(),
    pageTree: {},
});
