import { baseOptions } from "@/app/layout.config";
import { inkSource } from "@/lib/inkSource";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { getLocale } from "next-intl/server";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const locale = await getLocale();

    const tree: DocsLayoutProps["tree"] = {
        ...inkSource.pageTree,
        children: [
            {
                type: "folder",
                name: "Narration with ink",
                defaultOpen: true,
                index: {
                    type: "page",
                    name: "ink",
                    url: "/ink/ink",
                },
                children: [
                    { type: "page", name: "Characters", url: "/ink/ink-character" },
                    { type: "page", name: "Open a knot", url: "/ink/ink-label" },
                    { type: "page", name: "Variables", url: "/ink/ink-variables" },
                    { type: "page", name: "Markup language (to add text style)", url: "/ink/ink-markup" },
                    { type: "page", name: "Input prompt", url: "/ink/ink-input" },
                    { type: "page", name: "Canvas", url: "/ink/ink-canvas" },
                    { type: "page", name: "Sounds and Music", url: "/ink/ink-sound" },
                    { type: "page", name: "Assets management", url: "/ink/ink-assets" },
                    { type: "page", name: "Pause", url: "/ink/ink-pause" },
                    { type: "page", name: "Text replacement", url: "/ink/ink-replacement" },
                    { type: "page", name: "Translating", url: "/ink/ink-translate" },
                    { type: "page", name: "Custom Hashtag Script", url: "/ink/ink-hashtag" },
                ],
            },
            {
                type: "page",
                name: "Back",
                url: "/start/narration",
            },
        ],
    };
    return (
        <DocsLayout tree={tree} {...baseOptions(locale)}>
            {children}
        </DocsLayout>
    );
}
