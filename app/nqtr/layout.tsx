import { baseOptions } from "@/app/layout.config";
import { nqtrTree, sidebar } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { setRequestLocale } from "next-intl/server";
import { type ReactNode } from "react";
import LayoutProvider from "../layout.provider";

export default async function Layout({ children }: { children: ReactNode }) {
    setRequestLocale("en");
    const sidebarVar = await sidebar();
    const treeVar = await nqtrTree();
    return (
        <LayoutProvider>
            <DocsLayout sidebar={sidebarVar} tree={treeVar} {...baseOptions()}>
                {children}
            </DocsLayout>
        </LayoutProvider>
    );
}
