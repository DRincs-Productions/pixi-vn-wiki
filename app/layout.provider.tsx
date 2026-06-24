import { Provider } from "@/components/provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Manrope, Sora } from "next/font/google";
import type { ReactNode } from "react";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});

export default function LayoutProvider({
    children,
    lang = "en",
}: {
    children: ReactNode;
    lang?: string;
}) {
    setRequestLocale(lang);
    return (
        <html lang={lang} className={`${manrope.variable} ${sora.variable}`} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <NextIntlClientProvider locale={lang}>
                    <Provider locale={lang}>{children}</Provider>
                </NextIntlClientProvider>
            </body>
            <GoogleAnalytics gaId="G-KGCCEKXRVG" />
        </html>
    );
}
