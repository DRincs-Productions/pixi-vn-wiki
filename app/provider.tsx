"use client";
import CustomSearchDialog from "@/components/search";
import { useBrowserLanguage } from "@/hooks/useBrowserLanguage";
import type { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";

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

export default function Provider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useBrowserLanguage();

    return (
        <RootProvider
            search={{
                SearchDialog: CustomSearchDialog,
            }}
            i18n={{
                locale: locale,
                onLocaleChange(v) {
                    setLocale(v);
                },
                locales,
                translations: { cn }[locale as string],
            }}
        >
            {children}
        </RootProvider>
    );
}
