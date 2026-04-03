"use client";
import SearchDialog from "@/components/search";
import { useBrowserLanguage } from "@/hooks/useBrowserLanguage";
import { locales } from "@/lib/shared";
import { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { type ReactNode } from "react";

const cn: Partial<Translations> = {
    search: "Translated Content",
};

export function Provider({ children, locale }: { children: ReactNode; locale?: string }) {
    const changeLanguage = useBrowserLanguage();
    return (
        <RootProvider
            search={{ SearchDialog }}
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
