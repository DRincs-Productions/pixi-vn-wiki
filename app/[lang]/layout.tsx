import CustomSearchDialog from "@/components/search";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const inter = Inter({
    subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang='en' className={inter.className} suppressHydrationWarning>
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
