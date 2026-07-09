"use client";

import { cardVariants, headingVariants } from "@/components/ui/button";
import { CloudeIcon, CodexIcon, ComfyUiIcon, CopilotIcon, CursorIcon } from "@/components/ui/icons";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/cn";
import { useIsVisible } from "@/lib/useIsVisible";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useRef } from "react";

const Dithering = dynamic(
    () => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
    { ssr: false },
);

const iconLinkClassName = "transition-transform duration-200 hover:scale-125";

export function AiFirst() {
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
                {t("ai_title")}
            </h3>
            <Markdown className="mb-20">{t("ai_subtitle")}</Markdown>
            <div className="flex flex-row gap-2 mt-auto bg-brand text-brand-foreground rounded-xl p-2 w-fit">
                <a
                    href="https://claude.com/claude-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <CloudeIcon className="size-6" />
                </a>
                <a
                    href="https://openai.com/codex/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <CodexIcon className="size-6" />
                </a>
                <a
                    href="https://cursor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <CursorIcon className="size-6" />
                </a>
                <a
                    href="https://github.com/features/copilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <CopilotIcon className="size-6" />
                </a>
                <a
                    href="https://www.comfy.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClassName}
                >
                    <ComfyUiIcon className="size-6" />
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
                colorFront={resolvedTheme === "dark" ? "#821779" : "#E9A5E3"}
                shape="swirl"
                type="4x4"
                speed={visible ? 0.4 : 0}
                className="size-full"
                minPixelRatio={1}
            />
        </div>
    );
}
