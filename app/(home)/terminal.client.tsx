"use client";

import { cn } from "@/lib/cn";
import { TerminalIcon } from "lucide-react";
import { Fragment, type HTMLAttributes, type ReactElement, useEffect, useState } from "react";

export function CreateAppAnimation() {
    const installCmd = "npm create pixi-vn@latest";
    const tickTime = 100;
    const timeCommandEnter = installCmd.length;
    const timeCommandRun = timeCommandEnter + 3;
    const timeCommandEnd = timeCommandRun + 3;
    const timeWindowOpen = timeCommandEnd + 1;
    const timeEnd = timeWindowOpen + 1;

    const [tick, setTick] = useState(timeEnd);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
        }, tickTime);

        return () => {
            clearInterval(timer);
        };
    }, [timeEnd]);

    const lines: ReactElement[] = [];

    lines.push(
        <span key="command_type">
            {installCmd.substring(0, tick)}
            {tick < timeCommandEnter && (
                <div className="inline-block h-3 w-1 animate-pulse bg-white" />
            )}
        </span>,
    );

    if (tick >= timeCommandEnter) {
        lines.push(<span key="space"> </span>);
    }

    if (tick > timeCommandRun)
        lines.push(
            <Fragment key="command_response">
                {tick > timeCommandRun + 1 && (
                    <>
                        <span className="font-bold">◇ Project name</span>
                        <span>│ My Game</span>
                    </>
                )}
                {tick > timeCommandRun + 2 && (
                    <>
                        <span>│</span>
                        <span className="font-bold">
                            ◆ Select the type of game you want to create:
                        </span>
                    </>
                )}
                {tick > timeCommandRun + 3 && (
                    <>
                        <span>│ ● Visual Novel</span>
                        <span>│ ○ Point & Click</span>
                    </>
                )}
            </Fragment>,
        );

    return (
        <div
            className="relative"
            onMouseEnter={() => {
                if (tick >= timeEnd) {
                    setTick(0);
                }
            }}
        >
            {tick > timeWindowOpen && (
                <LaunchAppWindow className="absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10" />
            )}
            <pre className="overflow-hidden rounded-xl border text-[13px] shadow-lg relative">
                {/* scanline overlay — gives a retro CRT feel */}
                <div
                    className="absolute inset-0 pointer-events-none z-10 rounded-xl"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,var(--pixivn-scanline-opacity,0.04)) 2px, rgba(0,0,0,var(--pixivn-scanline-opacity,0.04)) 4px)",
                    }}
                />
                <div className="flex flex-row items-center gap-2 border-b px-4 py-2">
                    <TerminalIcon className="size-4" /> <span className="font-bold">Terminal</span>
                    <div className="grow" />
                    <div className="size-2 rounded-full bg-red-400" />
                </div>
                <div className="min-h-[200px] bg-gradient-to-b from-fd-card">
                    <code className="grid p-4">{lines}</code>
                </div>
            </pre>
        </div>
    );
}

function LaunchAppWindow(props: HTMLAttributes<HTMLDivElement>): React.ReactElement {
    return (
        <div
            {...props}
            className={cn(
                "overflow-hidden rounded-md border bg-fd-background shadow-xl",
                props.className,
            )}
        >
            <div
                className="relative flex h-6 flex-row items-center border-b px-4 text-xs text-white"
                style={{
                    /* darken brand colors ~25% so white text meets WCAG AA (≥4.5:1) */
                    background:
                        "linear-gradient(90deg, color-mix(in oklab, var(--color-brand-primary) 75%, black), color-mix(in oklab, var(--color-brand-secondary) 75%, black))",
                }}
            >
                <p className="absolute inset-x-0 text-center">Visual Studio Code</p>
            </div>
            <div className="p-4 text-sm">New Game launched!</div>
        </div>
    );
}
