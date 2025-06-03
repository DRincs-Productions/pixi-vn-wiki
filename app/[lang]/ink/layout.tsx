import { baseOptions } from "@/app/layout.config";
import { inkTree } from "@/components/docs-layout-props";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { getLocale } from "next-intl/server";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const locale = await getLocale();

    return (
        <DocsLayout tree={inkTree} {...baseOptions(locale)}>
            {children}
        </DocsLayout>
    );
}
