import { baseOptions } from "@/app/layout.config";
import { otherTopicsTree } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout tree={otherTopicsTree} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}
