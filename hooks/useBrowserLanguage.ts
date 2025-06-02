"use client";
import { useEffect, useState } from "react";

export function useBrowserLanguage() {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const ln = (navigator.language || navigator.languages?.[0] || "en").split("-")[0];
            if (ln === "ru" || ln === "it") {
                setLang(ln);
            } else {
                setLang("en");
            }
        }
    }, []);

    return lang;
}
