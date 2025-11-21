"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const SUPPORTED_LANGS = ["en", "it", "ru", "zh", "ja", "es", "fr", "ko"];

export function useBrowserLanguage() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("lang");
        if (stored && SUPPORTED_LANGS.includes(stored)) {
            if (stored !== locale) {
                // navigate to the stored language
                navigateToLocale(stored);
            }
        } else {
            const ln = (navigator.language || navigator.languages?.[0] || "en").split("-")[0];
            const lang = SUPPORTED_LANGS.includes(ln) ? ln : "en";
            localStorage.setItem("lang", lang);
            if (lang !== locale) {
                navigateToLocale(lang);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale]);

    function navigateToLocale(newLang: string) {
        let newPath = pathname;
        // Remove leading slash for easier manipulation
        const segments = newPath.startsWith("/") ? newPath.slice(1).split("/") : newPath.split("/");

        // Remove locale segment if present
        if (SUPPORTED_LANGS.includes(segments[0])) {
            segments.shift();
        }

        // Add locale segment if not "en"
        if (newLang !== "en") {
            segments.unshift(newLang);
        }

        newPath = "/" + segments.join("/");
        router.replace(newPath);
    }

    function changeLanguage(newLang: string) {
        if (SUPPORTED_LANGS.includes(newLang)) {
            localStorage.setItem("lang", newLang);
            navigateToLocale(newLang);
        }
    }

    return changeLanguage;
}
