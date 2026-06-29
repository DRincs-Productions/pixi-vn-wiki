"use client";
import SearchDialog from "@/components/search";
import { useBrowserLanguage } from "@/hooks/useBrowserLanguage";
import { locales } from "@/lib/shared";
import { translations } from "@/messages/translations";
import { RootProvider } from "fumadocs-ui/provider/next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function Provider({ children, locale }: { children: ReactNode; locale?: string }) {
    const changeLanguage = useBrowserLanguage();
    const pathname = usePathname();
    const isJsdocRoute = pathname.startsWith("/jsdoc");
    const englishLocale = locales.find((item) => item.locale === "en");
    const jsdocLocales = englishLocale ? [englishLocale] : locales;

    return (
        <RootProvider
            search={{ SearchDialog }}
            i18n={{
                locale: isJsdocRoute ? "en" : locale || "en",
                onLocaleChange: changeLanguage,
                locales: isJsdocRoute ? jsdocLocales : locales,
                translations: translations[locale as string],
            }}
        >
            {children}
        </RootProvider>
    );
}
