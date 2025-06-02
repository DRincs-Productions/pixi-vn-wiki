"use client";
import CustomSearchDialog from "@/components/search";
import type { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import "./global.css";

// translations
const cn: Partial<Translations> = {
    search: "Translated Content",
};

// available languages that will be displayed on UI
// make sure `locale` is consistent with your i18n config
const locales = [
    {
        name: "English",
        locale: "en",
    },
    {
        name: "Русский (Русский)",
        locale: "ru",
    },
    {
        name: "Italiano (Incompleto)",
        locale: "it",
    },
];

export default function Provider({ children, lang }: { children: ReactNode; lang: string }) {
    return (
        <RootProvider
            search={{
                SearchDialog: CustomSearchDialog,
            }}
            i18n={{
                locale: lang,
                locales,
                onLocaleChange: () => {},
                translations: { cn }[lang],
            }}
        >
            {children}
        </RootProvider>
    );
}
