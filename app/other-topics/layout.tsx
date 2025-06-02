import { baseOptions } from "@/app/layout.config";
import { otherTopicsSource } from "@/lib/otherTopicsSource";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { getLocale } from "next-intl/server";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const locale = await getLocale();

    const tree: DocsLayoutProps["tree"] = {
        ...otherTopicsSource.pageTree,
        children: [
            {
                type: "separator",
                name: "Other Topics",
            },
            {
                type: "page",
                name: "FAQ",
                url: "/other-topics/faq",
            },
            {
                type: "page",
                name: "Migration",
                url: "/other-topics/migration",
            },
            {
                type: "page",
                name: "Intecept Events",
                url: "/other-topics/intercept-events",
            },
            {
                type: "page",
                name: "Pixi’VN + Json Integration",
                url: "/other-topics/pixi-vn-json",
            },
        ],
    };
    return (
        <DocsLayout tree={tree} {...baseOptions(locale)}>
            {children}
        </DocsLayout>
    );
}
