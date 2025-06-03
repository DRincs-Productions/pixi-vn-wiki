"use client";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const SUPPORTED_LANGS = ["en", "it", "ru"];

export function useBrowserLanguage() {
    const locale = useLocale();

    useEffect(() => {
        const stored = localStorage.getItem("lang");
        if (stored && SUPPORTED_LANGS.includes(stored)) {
            if (stored !== locale) {
                // navigate to the stored language
            }
        } else {
            const ln = (navigator.language || navigator.languages?.[0] || "en").split("-")[0];
            localStorage.setItem("lang", SUPPORTED_LANGS.includes(ln) ? ln : "en");
        }
    }, [locale]);

    function changeLanguage(newLang: string) {
        if (SUPPORTED_LANGS.includes(newLang)) {
            localStorage.setItem("lang", newLang);
            // navigate to the new language
        }
    }

    return changeLanguage;
}
