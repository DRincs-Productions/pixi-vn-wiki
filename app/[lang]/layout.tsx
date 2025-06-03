import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@next/third-parties/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../global.css";
import Provider from "../provider";

const inter = Inter({
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ lang: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { lang } = await params;
    if (!hasLocale(routing.locales, lang)) {
        notFound();
    }
    return (
        <html lang={lang} className={inter.className} suppressHydrationWarning>
            <body className='flex flex-col min-h-screen'>
                <NextIntlClientProvider locale={"en"}>
                    <Provider>{children}</Provider>
                </NextIntlClientProvider>
            </body>
            <GoogleAnalytics gaId='G-KGCCEKXRVG' />
        </html>
    );
}
