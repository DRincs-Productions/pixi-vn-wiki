import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["it", "ru", "zh", "ja", "es", "fr", "ko"],

    // Used when no locale matches
    defaultLocale: "en" as unknown as "it" | "ru" | "zh" | "ja" | "es" | "fr" | "ko",
});
