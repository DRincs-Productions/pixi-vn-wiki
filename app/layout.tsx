import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";
import Provider from "./provider";

const inter = Inter({
    subsets: ["latin"],
});

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
                <Provider lang={lang}>{children}</Provider>
            </body>
            <GoogleAnalytics gaId='G-KGCCEKXRVG' />
        </html>
    );
}
