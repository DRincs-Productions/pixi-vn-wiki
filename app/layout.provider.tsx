import { Provider } from "@/components/provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Oxanium } from "next/font/google";
import type { ReactNode } from "react";

const oxanium = Oxanium({
    subsets: ["latin"],
    variable: "--font-oxanium",
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
        <html lang={lang} className={oxanium.variable} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <NextIntlClientProvider locale={lang}>
                    <Provider locale={lang}>{children}</Provider>
                </NextIntlClientProvider>
            </body>
            <GoogleAnalytics gaId="G-KGCCEKXRVG" />
        </html>
    );
}
