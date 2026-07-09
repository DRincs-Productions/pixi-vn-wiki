"use client";

import { cardVariants, headingVariants } from "@/components/ui/button";
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

export function CharacterAnimation() {
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
                {t("animation_title")}
            </h3>
            <Markdown className="mb-20">{t("animation_subtitle")}</Markdown>
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
                colorFront={resolvedTheme === "dark" ? "#824517" : "#E9C2A5"}
                shape="dots"
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
