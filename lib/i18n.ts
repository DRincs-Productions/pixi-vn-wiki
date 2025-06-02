import type { I18nConfig } from "fumadocs-core/i18n";
export const i18n: I18nConfig = {
    defaultLanguage: "en",
    languages: ["en", "it", "ru"],
};

export function getBrowserLocale(): "en" | "ru" | "it" {
    if (typeof window !== "undefined") {
        const ln = (navigator.language || navigator.languages?.[0] || "en").split("-")[0];
        if (ln === "ru" || ln === "it") {
            return ln as "ru" | "it";
        }
    }
    return "en";
}
