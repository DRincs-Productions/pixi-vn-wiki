import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";
import Provider from "./provider";

const inter = Inter({
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
    setRequestLocale("en");
    return (
        <html lang={"en"} className={inter.className} suppressHydrationWarning>
            <body className='flex flex-col min-h-screen'>
                <NextIntlClientProvider locale={"en"}>
                    <Provider>{children}</Provider>
                </NextIntlClientProvider>
            </body>
            <GoogleAnalytics gaId='G-KGCCEKXRVG' />
        </html>
    );
}
