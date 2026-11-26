import { isLightDev } from "./dev-mode";
import type { I18nConfig } from "fumadocs-core/i18n";
export const i18n: I18nConfig = {
    defaultLanguage: "en",
    // light local development serves only English (see `lib/dev-mode.ts`)
    languages: isLightDev ? ["en"] : ["en", "it", "ru", "zh", "ja", "es", "fr", "ko", "de"],
};
