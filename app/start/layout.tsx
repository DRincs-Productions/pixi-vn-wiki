import { baseOptions } from "@/app/layout.config";
import { startTree } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const lang = "en";

    return (
        <DocsLayout tree={startTree} {...baseOptions(lang)}>
            {children}
        </DocsLayout>
    );
}
