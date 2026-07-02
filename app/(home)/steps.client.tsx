"use client";

import { GooglePlayLogo, ItchLogo, RedditLogo, SteamLogo } from "@/components/ui/icons";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";

const badgeVariants = cva(
    "absolute z-30 inline-flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground ring-4 ring-fd-primary/20",
);

// visible (as a plain centered badge) on mobile where there is no measured overlay;
// invisible from md up, where it only serves as a position anchor for the JS-measured badge
const anchorVariants = cva(
    "absolute z-30 inline-flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground ring-4 ring-fd-primary/20 md:invisible",
);

function centerOf(el: HTMLElement, containerRect: DOMRect) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
    };
}

export function StepsGrid({ terminal, writing }: { terminal: ReactNode; writing: ReactNode }) {
    const t = useTranslations("Introduction");

    const containerRef = useRef<HTMLDivElement>(null);
    const badge1Ref = useRef<HTMLDivElement>(null);
    const badge2Ref = useRef<HTMLDivElement>(null);
    const badge3Ref = useRef<HTMLDivElement>(null);
    const [path, setPath] = useState<string | null>(null);
    const [mobilePath, setMobilePath] = useState<string | null>(null);
    const [positions, setPositions] = useState<{
        p1: { x: number; y: number };
        p2: { x: number; y: number };
        p3: { x: number; y: number };
    } | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        function update() {
            const badge1 = badge1Ref.current;
            const badge2 = badge2Ref.current;
            const badge3 = badge3Ref.current;
            if (!container || !badge1 || !badge2 || !badge3) {
                setPath(null);
                setPositions(null);
                setMobilePath(null);
                return;
            }

            const containerRect = container.getBoundingClientRect();
            const curlR = 8;
            const startCurl = `a ${curlR} ${curlR} 0 1 1 ${-0.1} 0`;
            const endCurl = `a ${curlR} ${curlR} 0 1 1 ${0.1} 0`;

            if (window.innerWidth < 768) {
                setPath(null);
                setPositions(null);
                // mobile: a simple straight rail, hugging the right edge, from just before 1 to just after 3
                const m1 = centerOf(badge1, containerRect);
                const m3 = centerOf(badge3, containerRect);
                const railX = containerRect.width - 16;
                const railStart = { x: railX, y: m1.y };
                const railEnd = { x: railX, y: m3.y + 30 };
                setMobilePath(
                    `M ${railStart.x} ${railStart.y} ${startCurl}` +
                        ` L ${railX} ${m3.y}` +
                        ` L ${railEnd.x} ${railEnd.y} ${endCurl}`,
                );
                return;
            }
            setMobilePath(null);

            const p1 = centerOf(badge1, containerRect);
            const p2 = centerOf(badge2, containerRect);
            const p3 = centerOf(badge3, containerRect);
            setPositions({ p1, p2, p3 });

            // start a bit before 1, and end a bit after 3
            const start = { x: p1.x - 56, y: p1.y };
            const end = { x: p3.x, y: p3.y + 56 };
            // a gentle S: dips out of 1, then eases back up into 2 (double curve, not a single hump)
            const mid1 = { x: p1.x + (p2.x - p1.x) / 3, y: p1.y + 72 };
            const midPoint = { x: (p1.x + p2.x) / 2, y: p1.y + 20 };
            const mid2 = { x: p1.x + (2 * (p2.x - p1.x)) / 3, y: p2.y - 32 };
            // curve to the right on the way down from 2 to 3, clamped so it never runs past the viewport
            const bulge = Math.min(110, window.innerWidth - containerRect.left - p2.x - 6);
            const drop = (p3.y - p2.y) / 3;
            const ride1 = { x: p2.x + bulge, y: p2.y + drop };
            const ride2 = { x: p3.x + bulge, y: p3.y - drop };

            setPath(
                `M ${start.x} ${start.y} ${startCurl}` +
                    ` L ${p1.x} ${p1.y}` +
                    ` C ${mid1.x} ${mid1.y} ${mid1.x} ${mid1.y} ${midPoint.x} ${midPoint.y}` +
                    ` C ${mid2.x} ${mid2.y} ${mid2.x} ${mid2.y} ${p2.x} ${p2.y}` +
                    ` C ${ride1.x} ${ride1.y} ${ride2.x} ${ride2.y} ${p3.x} ${p3.y}` +
                    ` L ${end.x} ${end.y} ${endCurl}`,
            );
        }

        update();
        const observer = new ResizeObserver(update);
        observer.observe(container);
        window.addEventListener("resize", update);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
            {path && (
                <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 hidden size-full overflow-visible md:block"
                >
                    <motion.path
                        d={path}
                        fill="none"
                        stroke="var(--color-brand-secondary)"
                        strokeOpacity={0.9}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                </svg>
            )}
            {mobilePath && (
                <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 block size-full overflow-visible md:hidden"
                >
                    <motion.path
                        d={mobilePath}
                        fill="none"
                        stroke="var(--color-brand-secondary)"
                        strokeOpacity={0.9}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                </svg>
            )}
            {positions && (
                <>
                    <div
                        className={cn(badgeVariants())}
                        style={{ left: positions.p1.x, top: positions.p1.y }}
                    >
                        1
                    </div>
                    <div
                        className={cn(badgeVariants())}
                        style={{ left: positions.p2.x, top: positions.p2.y }}
                    >
                        2
                    </div>
                    <div
                        className={cn(badgeVariants())}
                        style={{ left: positions.p3.x, top: positions.p3.y }}
                    >
                        3
                    </div>
                </>
            )}
            <div className="relative z-10 flex flex-col gap-2 rounded-2xl border bg-fd-card p-6 pt-8 shadow-lg md:p-8 md:pt-8">
                <div
                    ref={badge1Ref}
                    className={cn(
                        anchorVariants(),
                        "top-0 left-1/2 md:left-auto md:right-16 md:translate-x-0",
                    )}
                >
                    1
                </div>
                <h3 className="text-center text-xl font-semibold">{t("create_it")}</h3>
                <Markdown className="mb-8 text-center text-fd-muted-foreground">
                    {t("create_it_description")}
                </Markdown>
                {terminal}
            </div>
            <div className="relative z-10 flex flex-col gap-2 rounded-2xl border bg-fd-card p-6 pt-8 shadow-lg md:p-8 md:pt-8">
                <div
                    ref={badge2Ref}
                    className={cn(
                        anchorVariants(),
                        "top-0 left-1/2 md:left-auto md:right-16 md:translate-x-0",
                    )}
                >
                    2
                </div>
                <h3 className="text-center text-xl font-semibold">{t("write")}</h3>
                {writing}
            </div>
            <div className="relative z-10 col-span-full flex flex-col items-center gap-2 rounded-2xl border bg-fd-card p-6 py-16 text-center shadow-lg md:p-8">
                <div
                    ref={badge3Ref}
                    className={cn(
                        anchorVariants(),
                        "top-0 left-1/2 md:left-auto md:right-16 md:translate-x-0",
                    )}
                >
                    3
                </div>
                <h3 className="text-2xl font-semibold">{t("ship")}</h3>
                <Markdown className="text-fd-muted-foreground">{t("ship_description")}</Markdown>
                <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-8">
                    <Link href="/start/distribution-steam" rel="noreferrer noopener">
                        <SteamLogo className="h-10 w-auto" />
                    </Link>
                    <Link href="/start/distribution-itchio" rel="noreferrer noopener">
                        <ItchLogo className="h-10 w-auto" />
                    </Link>
                    <Link href="/start/distribution-reddit" rel="noreferrer noopener">
                        <RedditLogo className="h-10 w-auto" />
                    </Link>
                    <Link href="/start/distribution-desktop-mobile" rel="noreferrer noopener">
                        <GooglePlayLogo className="h-10 w-auto" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
