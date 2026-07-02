import { Hero } from "@/app/(home)/hero.client";
import { StepsGrid } from "@/app/(home)/steps.client";
import { Terminal } from "@/app/(home)/terminal";
import { AnybodyCanWrite } from "@/app/(home)/writing";
import { buttonVariants } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/cn";
import { createMetadata } from "@/lib/metadata";
import { patreonUrl } from "@/lib/shared";
import { source } from "@/lib/source";
import ArchImg from "@/public/arch.png";
import {
    Heart,
    LayoutIcon,
    type LucideIcon,
    MousePointer,
    SearchIcon,
    TimerIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { ReactNode } from "react";

export async function generateStaticParams() {
    return source.generateParams();
}

export default async function Home() {
    const t = await getTranslations("HomePage");
    return (
        <main className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
            <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
                <Hero />
            </div>
            <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">
                <Markdown className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
                    {t("description")}
                </Markdown>
            </div>
            <div className="mx-auto mt-12 w-full max-w-[1400px] lg:mt-20">
                <StepsGrid terminal={<Terminal />} writing={<AnybodyCanWrite />} />
            </div>
            <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">
                <div className="relative p-4 rounded-2xl col-span-full z-2 overflow-hidden md:p-8">
                    <Architecture />
                    <Highlights />
                    <Why />
                    <Contributing />
                </div>
            </div>
        </main>
    );
}

async function Architecture() {
    const t = await getTranslations("Architecture");

    return (
        <div className="flex flex-col gap-4 border-x border-t p-8 md:px-12 lg:flex-row">
            <div className="text-start">
                <p
                    className="px-2 py-1 text-sm font-mono text-fd-primary-foreground font-bold w-fit mb-4 animate-pixivn-shimmer"
                    style={{
                        background:
                            "linear-gradient(90deg, var(--color-fd-primary), var(--color-brand-secondary), var(--color-fd-primary))",
                        backgroundSize: "200% auto",
                    }}
                >
                    {t("info")}
                </p>
                <h2 className="text-2xl font-semibold mb-4">{t("title")}</h2>
                <p className="text-fd-muted-foreground mb-6">{t("subtitle")}</p>
            </div>
            <Image
                src={ArchImg}
                alt="Architecture"
                className="mx-auto -my-16 w-full max-w-[400px] invert dark:invert-0 lg:mx-0"
            />
        </div>
    );
}

async function Why() {
    return <div className="relative overflow-hidden border-x border-t p-2"></div>;
}

async function Highlights() {
    const t = await getTranslations("Highlights");

    return (
        <div className="grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full flex flex-row items-start justify-center border-l border-t p-8 pb-2 text-center">
                <h2 className="bg-fd-primary text-fd-primary-foreground px-1 text-2xl font-semibold">
                    {t("info")}
                </h2>
                <MousePointer className="-ml-1 mt-8" />
            </div>
            <Highlight icon={TimerIcon} heading={t("light_title")}>
                {t("light_subtitle")}
            </Highlight>
            <Highlight icon={LayoutIcon} heading={t("flexible_title")}>
                {t("flexible_subtitle")}
            </Highlight>
            <Highlight icon={SearchIcon} heading={t("smart_title")}>
                {t("smart_subtitle")}
            </Highlight>
        </div>
    );
}

function Highlight({
    icon: Icon,
    heading,
    children,
}: {
    icon: LucideIcon;
    heading: ReactNode;
    children: ReactNode;
}): React.ReactElement {
    return (
        <div className="border-l border-t px-6 py-12 group transition-all duration-300 hover:bg-fd-accent/30 hover:shadow-[inset_4px_0_0_0_var(--color-fd-primary)]">
            <div className="mb-4 flex flex-row items-center gap-2 text-fd-muted-foreground">
                <Icon className="size-4 group-hover:text-fd-primary transition-colors duration-300" />
                <h2 className="text-sm font-medium">{heading}</h2>
            </div>
            <span className="font-medium">{children}</span>
        </div>
    );
}

async function Contributing() {
    const t = await getTranslations("Contributing");

    return (
        <div className="flex flex-col items-center border-x border-t px-4 py-16 text-center relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.10]"
                style={{
                    background:
                        "radial-gradient(ellipse at center, var(--color-brand-secondary) 0%, transparent 70%)",
                }}
            />
            <Heart fill="currentColor" className="text-pink-500 mb-4 animate-pixivn-float" />
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">{t("title")}</h2>
            <p className="mb-4 text-fd-muted-foreground">{t("subtitle")}</p>
            <div className="mb-8 flex flex-row items-center gap-2">
                <a
                    href={patreonUrl}
                    target="_blank"
                    className={cn(buttonVariants({ variant: "outline" }))}
                    rel="noopener"
                >
                    {t("patreon")}
                </a>
                <a
                    href="https://pixi-vn.fanbox.cc/"
                    target="_blank"
                    className={cn(buttonVariants({ variant: "outline" }))}
                    rel="noopener"
                >
                    {t("fanbox")}
                </a>
                <a
                    href="https://github.com/DRincs-Productions/pixi-vn/graphs/contributors"
                    rel="noreferrer noopener"
                    target="_blank"
                    className={cn(buttonVariants({ variant: "ghost" }))}
                >
                    {t("contributors")}
                </a>
            </div>
        </div>
    );
}

export async function generateMetadata() {
    return createMetadata({}, {});
}
