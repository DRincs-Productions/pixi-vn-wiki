"use client";

import { cardVariants, headingVariants } from "@/components/ui/button";
import { BaseIcon, ShadcnIcon, TailwindcssIcon } from "@/components/ui/icons";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { type RefObject, useEffect, useRef, useState } from "react";

const Dithering = dynamic(
    () => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
    { ssr: false },
);

const iconLinkClassName = "transition-transform duration-200 hover:scale-125";

export function DesignSystem() {
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
                {t("style_title")}
            </h3>
            <Markdown className="mb-20">{t("style_subtitle")}</Markdown>
            <div className="flex flex-row gap-2 mt-auto bg-brand text-brand-foreground rounded-xl p-2 w-fit">
                <a
                    href="https://base-ui.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <BaseIcon className="size-6" />
                </a>
                <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <ShadcnIcon className="size-6" />
                </a>
                <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <TailwindcssIcon className="size-6" />
                </a>
            </div>
            <Background />
        </div>
    );
}

function Background() {
    const ref = useRef<HTMLDivElement>(null);
    const visible = useIsVisible(ref);

    return (
        <div
            ref={ref}
            className="absolute inset-0 -z-1 mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
        >
            <Dithering
                colorBack="#00000000"
                colorFront="#6742D7"
                shape="simplex"
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
