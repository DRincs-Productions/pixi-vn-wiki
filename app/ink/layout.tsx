import { baseOptions } from "@/app/layout.config";
import { inkTree } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout tree={inkTree} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}
