import { baseOptions } from "@/app/layout.config";
import { renpySource } from "@/lib/renpySource";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { type ReactNode } from "react";

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
    const { lang } = await params;

    const tree: DocsLayoutProps["tree"] = {
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
    };
    return (
        <DocsLayout tree={tree} {...baseOptions(lang)}>
            {children}
        </DocsLayout>
    );
}
