"use client";

import LogoImg from "@/app/icon.png";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { discordUrl } from "@/lib/shared";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { type RefObject, useEffect, useRef, useState } from "react";

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

const demos = [
    { label: "Visual Novel", url: "https://pixi-vn-react-template.web.app/demo" },
    { label: "NQTR", url: "https://nqtr-react-template.firebaseapp.com/" },
];

export function Hero() {
    const { resolvedTheme } = useTheme();
    const ref = useRef<HTMLImageElement | null>(null);
    const visible = useIsVisible(ref);
    const [showShaders, setShowShaders] = useState(false);
    const t = useTranslations("HomePage");

    useEffect(() => {
        // apply some delay, otherwise on slower devices, it errors with uniform images not being fully loaded.
        setTimeout(() => {
            setShowShaders(true);
        }, 400);
    }, []);

    return (
        <>
            {showShaders && (
                <GrainGradient
                    className="absolute inset-0 animate-fd-fade-in duration-800"
                    colors={
                        resolvedTheme === "dark"
                            ? ["#39BE1C", "#9c2f05", "#7A2A0000"]
                            : ["#fcfc51", "#ffa057", "#7A2A0020"]
                    }
                    colorBack="#00000000"
                    softness={1}
                    intensity={0.9}
                    noise={0.5}
                    speed={visible ? 1 : 0}
                    shape="corners"
                    minPixelRatio={1}
                    maxPixelCount={1920 * 1080}
                />
            )}
            {showShaders && (
                <Dithering
                    width={720}
                    height={720}
                    colorBack="#00000000"
                    colorFront={resolvedTheme === "dark" ? "#DF3F00" : "#fa8023"}
                    shape="sphere"
                    type="4x4"
                    scale={0.5}
                    size={3}
                    speed={0}
                    frame={5000 * 120}
                    className="absolute animate-fd-fade-in duration-400 max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0"
                    minPixelRatio={1}
                />
            )}
            <div className="flex flex-col md:flex-row max-md:items-center md:items-start z-2 px-4 size-full md:p-12 max-md:text-center max-md:justify-center md:gap-8 pointer-events-none">
                <div className="flex flex-col max-md:items-center pointer-events-auto">
                    <p className="mt-2 md:mt-0 text-xs text-brand font-medium rounded-full p-2 border border-brand/50 w-fit">
                        {t("tagline")}
                    </p>
                    <h1 className="text-4xl my-8 leading-tighter font-medium xl:text-5xl xl:mb-12">
                        {t("hero_title")}
                    </h1>
                    <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
                        <Link href="/start" className={cn(buttonVariants(), "max-sm:text-sm")}>
                            {t("getting_started")}
                        </Link>
                        <Link
                            href="/start/templates#visual-novel"
                            className={cn(buttonVariants(), "max-sm:text-sm md:hidden")}
                        >
                            {t("open_demo")}
                        </Link>
                        <a
                            href={discordUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={cn(
                                buttonVariants({ variant: "secondary" }),
                                "max-sm:text-sm",
                            )}
                        >
                            {t("discord")}
                        </a>
                    </div>
                </div>
                <Image
                    src={LogoImg}
                    alt="preview"
                    priority
                    className="w-56 h-56 object-contain shrink-0 max-md:order-first max-md:mb-2 pointer-events-auto"
                />
            </div>
            <div className="hidden md:block absolute bottom-24 left-1/2 -translate-x-1/2 z-1 w-[40%] max-w-[540px]">
                <Preview />
            </div>
        </>
    );
}

function Preview() {
    const [active, setActive] = useState(0);

    return (
        <div className="relative w-full">
            {demos.map((demo, i) => (
                <iframe
                    key={demo.url}
                    src={demo.url}
                    className={cn("w-full aspect-video rounded-xl border-0 shadow-xl", active !== i && "hidden")}
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
