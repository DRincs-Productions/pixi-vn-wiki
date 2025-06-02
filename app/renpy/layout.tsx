import { baseOptions } from "@/app/layout.config";
import { renpySource } from "@/lib/renpySource";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { getLocale } from "next-intl/server";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const locale = await getLocale();

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
        <DocsLayout tree={tree} {...baseOptions(locale)}>
            {children}
        </DocsLayout>
    );
}
