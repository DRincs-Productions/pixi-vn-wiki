"use client";
import CustomSearchDialog from "@/components/search";
import { getBrowserLocale } from "@/lib/i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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

export default function Provider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<"en" | "ru" | "it">(getBrowserLocale());

    // On mount, check if user has a preferred locale in localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("locale");
            if (stored === "en" || stored === "ru" || stored === "it") {
                setLocale(stored);
            }
        }
    }, []);

    // Allow user to set any supported language
    const handleLocaleChange = (newLocale: "en" | "ru" | "it") => {
        setLocale(newLocale);
        if (typeof window !== "undefined") {
            localStorage.setItem("locale", newLocale);
        }
    };

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
                            onLocaleChange: (ln) => handleLocaleChange(ln as "en" | "ru" | "it"),
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
