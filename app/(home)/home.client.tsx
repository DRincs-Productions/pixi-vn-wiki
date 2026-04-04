"use client";

import { cn } from "@/lib/cn";
import PCImg from "@/public/pointclick.png";
import VNImg from "@/public/visualnovel.png";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { type ComponentProps, Fragment, type HTMLAttributes, type ReactElement, useEffect, useState } from "react";

export function CreateAppAnimation(props: ComponentProps<'div'>) {
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
        <span key='command_type'>
            {installCmd.substring(0, tick)}
            {tick < timeCommandEnter && <div className='inline-block h-3 w-1 animate-pulse bg-fd-foreground' />}
        </span>,
    );

    if (tick >= timeCommandEnter) {
        lines.push(<span key='space'> </span>);
    }

    if (tick > timeCommandRun)
        lines.push(
            <Fragment key='command_response'>
                {tick > timeCommandRun + 1 && (
                    <>
                        <span className='font-medium'>◇ Project name</span>
                        <span>│ My Game</span>
                    </>
                )}
                {tick > timeCommandRun + 2 && (
                    <>
                        <span>│</span>
                        <span className='font-medium'>◆ Select the type of game you want to create:</span>
                    </>
                )}
                {tick > timeCommandRun + 3 && (
                    <>
                        <span>│ ● Visual Novel</span>
                        <span>│ ○ Game Engine</span>
                    </>
                )}
            </Fragment>,
        );

    return (
        <div
            {...props}
            onMouseEnter={() => {
                if (tick >= timeEnd) {
                    setTick(0);
                }
            }}
        >
            {tick > timeWindowOpen && (
                <LaunchAppWindow className='absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10' />
            )}
            <pre className='font-mono text-sm min-h-[240px]'>
                <code className='grid'>{lines}</code>
            </pre>
        </div>
    );
}

function LaunchAppWindow(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={cn("overflow-hidden rounded-md border bg-fd-popover shadow-lg", props.className)}>
            <p className='text-xs text-fd-muted-foreground text-center px-4 py-2 border-b'>localhost:1420</p>
            <p className='text-sm px-4 py-2'>New App launched!</p>
        </div>
    );
}

const previewButtonVariants = cva("w-20 h-9 text-sm font-medium transition-colors rounded-full", {
    variants: {
        active: {
            true: "text-fd-primary-foreground",
            false: "text-fd-muted-foreground",
        },
    },
});
export function PreviewImages() {
    const [active, setActive] = useState(0);

    return (
        <div className='mt-12 min-w-[800px] overflow-hidden xl:-mx-12 dark:[mask-image:linear-gradient(to_top,transparent,white_40px)]'>
            <div className='absolute flex flex-row left-1/2 -translate-1/2 bottom-4 z-2 p-1 rounded-full bg-fd-card border shadow-xl dark:shadow-fd-background'>
                <div
                    role='none'
                    className='absolute bg-fd-primary rounded-full w-20 h-9 transition-transform z-[-1]'
                    style={{
                        transform: `translateX(calc(var(--spacing) * 20 * ${active}))`,
                    }}
                />
                <button className={cn(previewButtonVariants({ active: active === 0 }))} onClick={() => setActive(0)}>
                    Visual Novel
                </button>
                <button className={cn(previewButtonVariants({ active: active === 1 }))} onClick={() => setActive(1)}>
                    Point & Click
                </button>
            </div>
            <Image
                src={VNImg}
                alt='preview'
                priority
                className={cn(
                    "w-full select-none duration-1000 animate-in fade-in -mb-60 slide-in-from-bottom-12 lg:-mb-40",
                    active !== 0 && "hidden",
                )}
            />
            {active === 1 && (
                <Image
                    src={PCImg}
                    alt='preview'
                    priority
                    className={cn(
                        "w-full select-none duration-1000 animate-in fade-in -mb-60 slide-in-from-bottom-12 lg:-mb-40",
                        active !== 1 && "hidden",
                    )}
                />
            )}
        </div>
    );
}
