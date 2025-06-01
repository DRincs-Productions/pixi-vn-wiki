"use client";

import CustomSearchDialog from "@/components/search";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RootProvider } from "fumadocs-ui/provider";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import "./global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const lang = useMemo(() => navigator.language.slice(0, 2), []);

    useEffect(() => {
        if (lang === "it") router.replace("/it");
        else if (lang === "en") router.replace("/en");
    }, [lang, router]);

    return (
        <html lang={lang} suppressHydrationWarning>
            <body className='flex flex-col min-h-screen'>
                <RootProvider
                    search={{
                        SearchDialog: CustomSearchDialog,
                    }}
                >
                    {children}
                </RootProvider>
            </body>
            <GoogleAnalytics gaId='G-KGCCEKXRVG' />
        </html>
    );
}
