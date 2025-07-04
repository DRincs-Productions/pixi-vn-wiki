import { baseOptions } from "@/app/layout.config";
import { startTree } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { type ReactNode } from "react";

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return (
        <DocsLayout tree={startTree(lang)} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}
