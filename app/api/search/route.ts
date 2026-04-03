import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
    // https://docs.orama.com/docs/orama-js/supported-languages
    language: "english",
    // map app locale codes to Orama-supported tokenizer language names
    // Orama doesn't support zh/ja/ko tokenizers, so fallback them to english
    localeMap: {
        zh: "english",
        ja: "english",
        ko: "english",
    },
});
