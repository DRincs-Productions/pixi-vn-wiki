import { sidebar, startTree } from "@/components/docs-layout-props";
import { baseOptions } from "@/lib/layout.shared";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { setRequestLocale } from "next-intl/server";
import LayoutProvider from "../layout.provider";

export default async function Layout({ children }: LayoutProps<"/start">) {
    setRequestLocale("en");
    const sidebarVar = await sidebar();
    const treeVar = await startTree();
    return (
        <LayoutProvider>
            <DocsLayout sidebar={sidebarVar} tree={treeVar} {...baseOptions()}>
                {children}
            </DocsLayout>
        </LayoutProvider>
    );
}
