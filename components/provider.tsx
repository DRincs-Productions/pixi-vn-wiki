"use client";
import SearchDialog from "@/components/search";
import { useBrowserLanguage } from "@/hooks/useBrowserLanguage";
import { locales } from "@/lib/shared";
import { translations } from "@/messages/translations";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";

export function Provider({ children, locale }: { children: ReactNode; locale?: string }) {
    const changeLanguage = useBrowserLanguage();

    return (
        <RootProvider
            search={{ SearchDialog }}
            i18n={{
                locale: locale || "en",
                onLocaleChange: changeLanguage,
                locales: locales,
                translations: translations[locale as string],
            }}
        >
            {children}
        </RootProvider>
    );
}
