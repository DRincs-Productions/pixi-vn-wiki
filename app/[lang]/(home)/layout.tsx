import { baseOptions } from "@/app/layout.config";
import { homeLinks } from "@/components/docs-layout-props";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <HomeLayout {...baseOptions()} links={homeLinks(lang)}>
            {children}
        </HomeLayout>
    );
}
