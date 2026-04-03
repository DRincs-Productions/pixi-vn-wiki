import { inkTree, sidebar } from "@/components/docs-layout-props";
import { baseOptions } from "@/lib/layout.shared";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { setRequestLocale } from "next-intl/server";
import { type ReactNode } from "react";
import LayoutProvider from "../layout.provider";

export default async function Layout({ children }: { children: ReactNode }) {
    setRequestLocale("en");
    const sidebarVar = await sidebar();
    const treeVar = await inkTree();
    return (
        <LayoutProvider>
            <DocsLayout sidebar={sidebarVar} tree={treeVar} {...baseOptions()}>
                {children}
            </DocsLayout>
        </LayoutProvider>
    );
}
