import { baseOptions } from "@/app/layout.config";
import { homeLinks } from "@/components/docs-layout-props";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    setRequestLocale(lang);
    const linksVar = await homeLinks(lang);
    return (
        <HomeLayout {...baseOptions()} links={linksVar}>
            {children}
        </HomeLayout>
    );
}
