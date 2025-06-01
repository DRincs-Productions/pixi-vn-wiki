import CustomSearchDialog from "@/components/search";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Translations } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider";
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

export default async function RootLayout({
    params,
    children,
}: {
    params: Promise<{ lang: string }>;
    children: ReactNode;
}) {
    const lang = (await params).lang;

    return (
        <html lang={lang} className={inter.className} suppressHydrationWarning>
            <body className='flex flex-col min-h-screen'>
                <RootProvider
                    search={{
                        SearchDialog: CustomSearchDialog,
                    }}
                    i18n={{
                        locale: lang,
                        locales,
                        translations: { cn }[lang],
                    }}
                >
                    {children}
                </RootProvider>
            </body>
            <GoogleAnalytics gaId='G-KGCCEKXRVG' />
        </html>
    );
}
