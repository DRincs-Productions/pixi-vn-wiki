import { baseOptions } from "@/app/layout.config";
import { inkSource } from "@/lib/inkSource";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { useMemo, type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const tree = useMemo<DocsLayoutProps["tree"]>(
        () => ({
            ...inkSource.pageTree,
        }),
        []
    );
    return (
        <DocsLayout tree={tree} {...baseOptions}>
            {children}
        </DocsLayout>
    );
}
