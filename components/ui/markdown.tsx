"use client";

import { createMarkdownRenderer } from "fumadocs-core/content/md";
import { Fragment, type HTMLAttributes } from "react";

const { Markdown: MarkdownRenderer } = createMarkdownRenderer();

export function Markdown({
    children,
    ...props
}: Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
    children: string;
}): React.ReactElement {
    return (
        <p {...props}>
            <MarkdownRenderer components={{ p: Fragment }}>{children}</MarkdownRenderer>
        </p>
    );
}
