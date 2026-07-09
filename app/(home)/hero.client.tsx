"use client";

import LogoImg from "@/app/icon.png";
import { buttonVariants } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { discordUrl } from "@/lib/shared";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const GrainGradient = dynamic(
    () => import("@paper-design/shaders-react").then((mod) => mod.GrainGradient),
    {
        ssr: false,
    },
);

const Dithering = dynamic(
    () => import("@paper-design/shaders-react").then((mod) => mod.Dithering),
    {
        ssr: false,
    },
);

const previewButtonVariants = cva(
    "z-[1] w-36 h-9 text-sm font-medium transition-colors rounded-full",
    {
        variants: {
            active: {
                true: "text-fd-primary-foreground",
                false: "text-fd-muted-foreground hover:text-fd-foreground",
            },
        },
    },
);

const demoUrls = [
    "https://pixi-vn-visual-novel-example.pages.dev/demo",
    "https://pixi-vn-point-and-click-example.pages.dev/demo",
];

export function Hero() {
    const { resolvedTheme } = useTheme();
    const t = useTranslations("HomePage");

    return (
        <>
            <GrainGradient
                className="absolute inset-0 animate-fd-fade-in duration-800"
                colors={
                    resolvedTheme === "dark"
                        ? ["#C832BB", "#1A2A8A", "#C832BB00"]
                        : ["#E080D8", "#6090D0", "#C832BB20"]
                }
                colorBack="#00000000"
                softness={1}
                intensity={0.9}
                noise={0.5}
                shape="corners"
                minPixelRatio={1}
                maxPixelCount={1920 * 1080}
                rotation={150}
                scale={2}
                speed={0.3}
            />
            <Dithering
                width={720}
                height={720}
                colorBack="#00000000"
                colorFront={resolvedTheme === "dark" ? "#C832BB" : "#AA28A4"}
                shape="sphere"
                type="4x4"
                scale={0.5}
                size={3}
                speed={0}
                frame={5000 * 120}
                className="absolute animate-fd-fade-in duration-400 max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0"
                minPixelRatio={1}
            />
            <div className="flex flex-col md:flex-row max-md:items-center md:items-start z-2 px-4 size-full md:p-12 max-md:text-center max-md:justify-center md:gap-8 pointer-events-none">
                <div className="flex flex-col max-md:items-center pointer-events-auto">
                    <p className="mt-2 md:mt-0 text-xs text-brand font-medium rounded-full p-2 border border-brand/50 w-fit">
                        {t("tagline")}
                    </p>
                    <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit mt-6 md:mt-6">
                        <Link
                            href="/start"
                            className={cn(
                                buttonVariants({ variant: "secondary" }),
                                "max-sm:text-sm",
                            )}
                        >
                            {t("getting_started")}
                        </Link>
                        <Link
                            href="/start/templates#visual-novel"
                            className={cn(
                                buttonVariants({ variant: "secondary" }),
                                "max-sm:text-sm",
                            )}
                        >
                            {t("open_demo")}
                        </Link>
                        <a
                            href={discordUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={cn(
                                buttonVariants({ variant: "secondary" }),
                                "max-sm:text-sm gap-2 border-transparent bg-[#5865F2] text-white hover:bg-[#4752C4] hover:shadow-[0_0_20px_-4px_#5865F2]",
                            )}
                        >
                            <DiscordIcon className="size-4" />
                            {t("discord")}
                        </a>
                    </div>
                    <TypewriterTitle
                        strings={[t("hero_title"), t("hero_title_2"), t("hero_title_3")]}
                    />
                </div>
                <div className="hidden md:block w-64 h-64 shrink-0" />
                <Image
                    src={LogoImg}
                    alt="preview"
                    priority
                    className="w-64 h-64 object-contain pointer-events-auto max-md:order-first max-md:mb-2 md:absolute md:top-10 md:right-10 md:w-64 md:h-64"
                />
            </div>
            <div className="hidden md:block absolute bottom-14 left-1/2 -translate-x-1/2 z-1 w-[40%] max-w-[540px]">
                <Preview />
            </div>
        </>
    );
}

function TypewriterTitle({ strings }: { strings: string[] }) {
    const [displayed, setDisplayed] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = strings[index];

        if (!deleting && displayed === current) {
            const id = setTimeout(() => setDeleting(true), 5000);
            return () => clearTimeout(id);
        }
        if (deleting && displayed === "") {
            setDeleting(false);
            setIndex((i) => (i + 1) % strings.length);
            return;
        }

        const id = setTimeout(
            () =>
                setDisplayed(
                    deleting ? displayed.slice(0, -1) : current.slice(0, displayed.length + 1),
                ),
            deleting ? 25 : 55,
        );
        return () => clearTimeout(id);
    }, [displayed, index, deleting, strings]);

    return (
        <h1 className="text-4xl mt-6 mb-0 leading-tighter font-medium xl:text-5xl min-h-[5.5rem] xl:min-h-[7rem]">
            {displayed}
            <span className="animate-pulse">|</span>
        </h1>
    );
}

function Preview() {
    const [active, setActive] = useState(0);
    const t = useTranslations("HomePage");
    const demos = [
        { label: t("demo_visual_novel"), url: demoUrls[0] },
        { label: t("demo_point_and_click"), url: demoUrls[1] },
    ];

    return (
        <div className="relative w-full">
            {demos.map((demo, i) => (
                <iframe
                    key={demo.url}
                    src={demo.url}
                    className={cn(
                        "w-full aspect-video rounded-xl border-0 shadow-xl",
                        active !== i && "hidden",
                    )}
                    title={demo.label}
                />
            ))}
            <div className="absolute flex flex-row left-1/2 -translate-x-1/2 bottom-0 translate-y-[65%] z-10 p-1 rounded-full bg-fd-card border shadow-xl dark:shadow-fd-background">
                <div
                    role="none"
                    className="absolute bg-fd-primary rounded-full w-36 h-9 transition-transform z-[-1]"
                    style={{
                        transform: `translateX(calc(var(--spacing) * 36 * ${active}))`,
                    }}
                />
                {demos.map((demo, i) => (
                    <button
                        key={demo.url}
                        type="button"
                        className={cn(previewButtonVariants({ active: active === i }))}
                        onClick={() => setActive(i)}
                    >
                        {demo.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
