"use client";

import LogoImg from "@/app/icon.png";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { discordUrl } from "@/lib/shared";
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

export function Hero() {
    const { resolvedTheme } = useTheme();
    const ref = useRef<HTMLImageElement | null>(null);
    const visible = useIsVisible(ref);
    const [showShaders, setShowShaders] = useState(false);
    // const [imageReady, setImageReady] = useState(false);
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
            {/* <Image
                ref={ref}
                src={HeroImage}
                alt="hero-image"
                className={cn(
                    "absolute top-[460px] left-[20%] max-w-[1200px] rounded-xl border-2 lg:top-[400px]",
                    imageReady ? "animate-in fade-in duration-400" : "invisible",
                )}
                onLoad={() => setImageReady(true)}
                priority
            /> */}
            <div className="flex flex-col md:flex-row items-center z-2 px-4 size-full md:p-12 max-md:text-center max-md:justify-center md:gap-8">
                <div className="flex flex-col max-md:items-center">
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
                            className={cn(buttonVariants(), "max-sm:text-sm")}
                        >
                            {t("open_demo")}
                        </Link>
                        <a
                            href={discordUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={cn(buttonVariants({ variant: "secondary" }), "max-sm:text-sm")}
                        >
                            {t("discord")}
                        </a>
                    </div>
                </div>
                <Image
                    src={LogoImg}
                    alt="preview"
                    priority
                    className="w-56 h-56 object-contain shrink-0 max-md:order-first max-md:mb-2"
                />
            </div>
        </>
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
