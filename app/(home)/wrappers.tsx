"use client";

import { cardVariants, headingVariants } from "@/components/ui/button";
import {
    MatkDownIcon,
    MotionIcon,
    PixiJSIcon,
    ReactIcon,
    TanstackIcon,
    ViteIcon,
} from "@/components/ui/icons";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { type RefObject, useEffect, useRef, useState } from "react";

const Dithering = dynamic(
    () => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
    { ssr: false },
);

const iconLinkClassName = "transition-transform duration-200 hover:scale-125";

export function Wrappers() {
    const t = useTranslations("Ecosystem");

    return (
        <div className={cn(cardVariants(), "relative flex flex-col overflow-hidden z-2")}>
            <h3
                className={cn(
                    headingVariants({
                        variant: "h3",
                        className: "mb-6",
                    }),
                )}
            >
                {t("wrappers_title")}
            </h3>
            <Markdown className="mb-20">{t("wrappers_subtitle")}</Markdown>
            <div className="flex flex-row gap-2 mt-auto bg-brand text-brand-foreground rounded-xl p-2 w-fit">
                <a
                    href="https://motion.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <MotionIcon className="size-6" />
                </a>
                <a
                    href="https://pixijs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <PixiJSIcon className="size-6" />
                </a>
                <a
                    href="https://vite.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <ViteIcon className="size-6" />
                </a>
                <a
                    href="https://react.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <ReactIcon className="size-6" />
                </a>
                <a
                    href="https://tanstack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <TanstackIcon className="size-6" />
                </a>
                <a
                    href="https://daringfireball.net/projects/markdown/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <MatkDownIcon className="size-6" />
                </a>
            </div>
            <Background />
        </div>
    );
}

function Background() {
    const ref = useRef<HTMLDivElement>(null);
    const visible = useIsVisible(ref);
    const { resolvedTheme } = useTheme();

    return (
        <div
            ref={ref}
            className="absolute inset-0 -z-1 mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
        >
            <Dithering
                colorBack="#00000000"
                colorFront={resolvedTheme === "dark" ? "#175482" : "#A5CBE9"}
                shape="warp"
                type="4x4"
                speed={visible ? 0.4 : 0}
                className="size-full"
                minPixelRatio={1}
            />
        </div>
    );
}

let observer: IntersectionObserver;
const observerTargets = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function useIsVisible(ref: RefObject<HTMLElement | null>) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        observer ??= new IntersectionObserver((entries) => {
            for (const entry of entries) {
                observerTargets.get(entry.target)?.(entry);
            }
        });

        const element = ref.current;
        if (!element) return;
        observerTargets.set(element, (entry) => {
            setVisible(entry.isIntersecting);
        });
        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observerTargets.delete(element);
        };
    }, [ref]);

    return visible;
}
