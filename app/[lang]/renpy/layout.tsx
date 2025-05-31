import { baseOptions } from "@/app/layout.config";
import { renpySource } from "@/lib/renpySource";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { useMemo, type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const tree = useMemo<DocsLayoutProps["tree"]>(
        () => ({
            ...renpySource.pageTree,
            children: [
                {
                    type: "folder",
                    name: "Narration with Ren’Py (In progress)",
                    defaultOpen: true,
                    index: {
                        type: "page",
                        name: "Ren’Py",
                        url: "/renpy/renpy",
                    },
                    children: [],
                },
                { type: "page", name: "Back", url: "/start/narration" },
            ],
        }),
        []
    );
    return (
        <DocsLayout tree={tree} {...baseOptions}>
            {children}
        </DocsLayout>
    );
}
