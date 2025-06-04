import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Provider from "./provider";

const inter = Inter({
    subsets: ["latin"],
});

export default function LayoutProvider({ children, lang = "en" }: { children: ReactNode; lang?: string }) {
    setRequestLocale(lang);
    console.log("LayoutProvider lang:", lang);
    return (
        <html lang={lang} className={inter.className} suppressHydrationWarning>
            <body className='flex flex-col min-h-screen'>
                <NextIntlClientProvider locale={lang}>
                    <Provider locale={lang}>{children}</Provider>
                </NextIntlClientProvider>
            </body>
            <GoogleAnalytics gaId='G-KGCCEKXRVG' />
        </html>
    );
}
