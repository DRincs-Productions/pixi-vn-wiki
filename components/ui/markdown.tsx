"use client";

import { cn } from "@/lib/cn";
import { createMarkdownRenderer } from "fumadocs-core/content/md";
import type { HTMLAttributes, ReactNode } from "react";

const { Markdown: MarkdownRenderer } = createMarkdownRenderer();

// Renders the paragraph content without an extra <p> (the wrapper below already is one).
// A plain component is used instead of `Fragment`, whose `ref` type (React 19.3) is not compatible with <p>.
const Unwrapped = ({ children }: { children?: ReactNode }) => <>{children}</>;

export function Markdown({
    children,
    className,
    ...props
}: Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
    children: string;
}): React.ReactElement {
    return (
        <p className={cn("[&_a]:underline [&_a]:underline-offset-4", className)} {...props}>
            <MarkdownRenderer components={{ p: Unwrapped }}>{children}</MarkdownRenderer>
        </p>
    );
}
