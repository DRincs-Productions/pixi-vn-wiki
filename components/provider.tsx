"use client";
import SearchDialog from "@/components/search";
import { useBrowserLanguage } from "@/hooks/useBrowserLanguage";
import { locales } from "@/lib/shared";
import type { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const cn: Partial<Translations> = {
    search: "Translated Content",
};

export function Provider({ children, locale }: { children: ReactNode; locale?: string }) {
    const changeLanguage = useBrowserLanguage();
    const pathname = usePathname();
    const isJsdocPath = pathname.startsWith("/jsdoc");

    return (
        <RootProvider
            search={{ SearchDialog }}
            i18n={{
                locale: isJsdocPath ? "en" : locale || "en",
                onLocaleChange: isJsdocPath ? undefined : changeLanguage,
                locales: isJsdocPath ? locales.filter((item) => item.locale === "en") : locales,
                translations: { cn }[locale as string],
            }}
        >
            {children}
        </RootProvider>
    );
}
