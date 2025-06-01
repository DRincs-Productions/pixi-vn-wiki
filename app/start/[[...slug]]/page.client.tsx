"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import Link from "fumadocs-core/link";

export function Translate() {
    return (
        <Link
            className={cn(
                buttonVariants({
                    variant: "secondary",
                    size: "xs",
                    className: "gap-2",
                })
            )}
            href={"https://crowdin.com/project/pixi-vn"}
        >
            Translate
        </Link>
    );
}
