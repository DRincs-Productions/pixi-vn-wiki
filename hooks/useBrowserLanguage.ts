"use client";
import { useEffect, useState } from "react";

export function useBrowserLanguage() {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const ln = (navigator.language || navigator.languages?.[0] || "en").split("-")[0];
            if (ln === "ru" || ln === "it") {
                document.cookie = `lang=${ln}; path=/; max-age=31536000`; // 1 year
                setLang(ln);
            } else {
                document.cookie = `lang=en; path=/; max-age=31536000`; // 1 year
                setLang("en");
            }
        }
    }, []);

    return lang;
}
