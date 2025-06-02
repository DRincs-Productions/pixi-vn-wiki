import type { I18nConfig } from "fumadocs-core/i18n";
import { cookies } from "next/headers";
export const i18n: I18nConfig = {
    defaultLanguage: "en",
    languages: ["en", "it", "ru"],
};

export async function getBrowserLanguage() {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("lang")?.value;
    return myCookie;
}
