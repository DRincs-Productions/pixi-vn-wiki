import { baseOptions } from "@/app/layout.config";
import { inkTree, sidebar } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { type ReactNode } from "react";

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const sidebarVar = await sidebar(lang);
    const treeVar = await inkTree(lang);
    return (
        <DocsLayout sidebar={sidebarVar} tree={treeVar} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}
