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
        name: "Русский",
        locale: "ru",
    },
    {
        name: "Italiano",
        locale: "it",
    },
    {
        name: "中文",
        locale: "zh",
    },
    {
        name: "日本語",
        locale: "ja",
    },
    {
        name: "Español",
        locale: "es",
    },
    {
        name: "Français",
        locale: "fr",
    },
    {
        name: "한국어",
        locale: "ko",
    },
];

export default function Provider({ children, locale }: { children: ReactNode; locale?: string }) {
    const changeLanguage = useBrowserLanguage();
    return (
        <RootProvider
            search={{
                SearchDialog: CustomSearchDialog,
            }}
            i18n={{
                locale: locale || "en",
                onLocaleChange: changeLanguage,
                locales,
                translations: { cn }[locale as string],
            }}
        >
            {children}
        </RootProvider>
    );
}
