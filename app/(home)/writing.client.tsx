"use client";

import { cn } from "@/lib/cn";
import { Dot } from "lucide-react";
import { Fragment, useState, type ReactNode } from "react";

const WritingTabs = [
    {
        name: "ink",
        value: "ink",
    },
    {
        name: "TypeScript",
        value: "ts",
    },
    {
        name: "JSON",
        value: "json",
    },
] as const;
export function Writing({
    tabs: tabContents,
}: {
    tabs: Record<(typeof WritingTabs)[number]["value"], ReactNode>;
}) {
    const [tab, setTab] = useState<(typeof WritingTabs)[number]["value"]>("ink");

    return (
        <div className="col-span-full">
            <div className="flex justify-center items-center gap-4 text-fd-muted-foreground mb-6">
                {WritingTabs.map((item) => (
                    <Fragment key={item.value}>
                        <Dot className="size-4 first:hidden" />
                        <button
                            className={cn(
                                "text-lg font-medium transition-colors",
                                item.value === tab && "text-brand",
                            )}
                            onClick={() => setTab(item.value)}
                        >
                            {item.name}
                        </button>
                    </Fragment>
                ))}
            </div>
            {Object.entries(tabContents).map(([key, value]) => (
                <div
                    key={key}
                    aria-hidden={key !== tab}
                    className={cn("animate-fd-fade-in", key !== tab && "hidden")}
                >
                    {value}
                </div>
            ))}
        </div>
    );
}
