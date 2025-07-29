import { baseOptions } from "@/app/layout.config";
import { renpyTree, sidebar } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { type ReactNode } from "react";
import LayoutProvider from "../layout.provider";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <LayoutProvider>
            <DocsLayout sidebar={sidebar()} tree={renpyTree()} {...baseOptions()}>
                {children}
            </DocsLayout>
        </LayoutProvider>
    );
}
