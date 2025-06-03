"use client";
import { useEffect, useState } from "react";

const SUPPORTED_LANGS = ["en", "it", "ru"];

export function useBrowserLanguage() {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const stored = localStorage.getItem("lang");
        if (stored && SUPPORTED_LANGS.includes(stored)) {
            setLang(stored);
        } else {
            const ln = (navigator.language || navigator.languages?.[0] || "en").split("-")[0];
            setLang(SUPPORTED_LANGS.includes(ln) ? ln : "en");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    function changeLanguage(newLang: string) {
        if (SUPPORTED_LANGS.includes(newLang)) {
            setLang(newLang);
        }
    }

    return [lang, changeLanguage] as const;
}
