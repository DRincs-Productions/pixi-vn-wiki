import { baseOptions } from "@/app/layout.config";
import { otherTopicsTree, sidebar } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { setRequestLocale } from "next-intl/server";
import { type ReactNode } from "react";
import LayoutProvider from "../layout.provider";

export default async function Layout({ children }: { children: ReactNode }) {
    setRequestLocale("en");
    const sidebarVar = await sidebar();
    const treeVar = await otherTopicsTree();
    return (
        <LayoutProvider>
            <DocsLayout sidebar={sidebarVar} tree={treeVar} {...baseOptions()}>
                {children}
            </DocsLayout>
        </LayoutProvider>
    );
}
