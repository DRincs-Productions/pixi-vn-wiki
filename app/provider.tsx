"use client";
import CustomSearchDialog from "@/components/search";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const inter = Inter({
    subsets: ["latin"],
});

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
function getBrowserLocale(): "en" | "ru" | "it" {
    if (typeof window !== "undefined") {
        const ln = (navigator.language || navigator.languages?.[0] || "en").split("-")[0];
        if (ln === "ru" || ln === "it") {
            return ln as "ru" | "it";
        }
    }
    return "en";
}

export default function Provider({ children }: { children: ReactNode }) {
    const locale = getBrowserLocale();

    return (
        <html lang={locale} className={inter.className} suppressHydrationWarning>
            <body className='flex flex-col min-h-screen'>
                <NextIntlClientProvider locale={locale}>
                    <RootProvider
                        search={{
                            SearchDialog: CustomSearchDialog,
                        }}
                        i18n={{
                            locale: locale,
                            locales,
                            onLocaleChange: () => {
                                // Handle locale change if needed
                            },
                            translations: { cn }[locale as string],
                        }}
                    >
                        {children}
                    </RootProvider>
                </NextIntlClientProvider>
            </body>
            <GoogleAnalytics gaId='G-KGCCEKXRVG' />
        </html>
    );
}
