import { sidebar } from "@/components/docs-layout-props";
import { baseOptions } from "@/lib/layout.shared";
import { jsdocPixiVnAiSource } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import LayoutProvider from "../../layout.provider";

export default async function Layout({ children }: { children: ReactNode }) {
    setRequestLocale("en");
    const sidebarVar = await sidebar();
    return (
        <LayoutProvider>
            <DocsLayout sidebar={sidebarVar} tree={jsdocPixiVnAiSource.pageTree} {...baseOptions()}>
                {children}
            </DocsLayout>
        </LayoutProvider>
    );
}
