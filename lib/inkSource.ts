import { inkDocs } from "@/.source";
import { loader } from "fumadocs-core/source";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const inkSource = loader({
    // it assigns a URL to your pages
    baseUrl: "/ink",
    source: inkDocs.toFumadocsSource(),
    pageTree: {},
});
