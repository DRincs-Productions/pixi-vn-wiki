"use client";

import { createMarkdownRenderer } from "fumadocs-core/content/md";
import { Fragment, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const { Markdown: MarkdownRenderer } = createMarkdownRenderer();

export function Markdown({
    children,
    className,
    ...props
}: Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
    children: string;
}): React.ReactElement {
    return (
        <p className={cn("[&_a]:underline [&_a]:underline-offset-4", className)} {...props}>
            <MarkdownRenderer components={{ p: Fragment }}>{children}</MarkdownRenderer>
        </p>
    );
}
