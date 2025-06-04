import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../global.css";
import LayoutProvider from "../layout.provider";

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
    return <LayoutProvider lang={lang}>{children}</LayoutProvider>;
}
