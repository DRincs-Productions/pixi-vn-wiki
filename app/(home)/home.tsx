import { CodeBlockPre } from "@/components/code-block";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import ArchImg from "@/public/arch.png";
import LogoImg from "@/public/logo.webp";
import { cva } from "class-variance-authority";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Heart, LayoutIcon, type LucideIcon, MousePointer, SearchIcon, TimerIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CreateAppAnimation, PreviewImages } from "./home.client";
import { ItchLogo } from "./icons";

const badgeVariants = cva(
    "inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground",
);

export async function generateStaticParams() {
    return source.generateParams();
}

export default function Home() {
    const gridColor = "color-mix(in oklab, var(--color-fd-primary) 10%, transparent)";

    return (
        <>
            <div
                className='absolute inset-x-0 top-[360px] h-[250px] max-md:hidden'
                style={{
                    background: `repeating-linear-gradient(to right, ${gridColor}, ${gridColor} 1px,transparent 1px,transparent 50px), repeating-linear-gradient(to bottom, ${gridColor}, ${gridColor} 1px,transparent 1px,transparent 50px)`,
                }}
            />
            <main className='container relative max-w-[1100px] px-2 py-4 z-[2] lg:py-8'>
                <div
                    style={{
                        background:
                            "repeating-linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-fd-primary) 1%, transparent) 500px, transparent 1000px)",
                    }}
                >
                    <div className='relative'>
                        <Hero />
                    </div>
                    <Introduction />
                    <Architecture />
                    <Highlights />
                    <Why />
                    <Contributing />
                </div>
            </main>
        </>
    );
}

async function Architecture() {
    const t = await getTranslations("Architecture");

    return (
        <div className='flex flex-col gap-4 border-x border-t p-8 md:px-12 lg:flex-row'>
            <div className='text-start'>
                <p className='px-2 py-1 text-sm font-mono bg-fd-primary text-fd-primary-foreground font-bold w-fit mb-4'>
                    {t("info")}
                </p>
                <h2 className='text-2xl font-semibold mb-4'>{t("title")}</h2>
                <p className='text-fd-muted-foreground mb-6'>{t("subtitle")}</p>
            </div>
            <Image
                src={ArchImg}
                alt='Architecture'
                className='mx-auto -my-16 w-full max-w-[400px] invert dark:invert-0 lg:mx-0'
            />
        </div>
    );
}

async function Why() {
    return <div className='relative overflow-hidden border-x border-t p-2'></div>;
}

async function Highlights() {
    const t = await getTranslations("Highlights");

    return (
        <div className='grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3'>
            <div className='col-span-full flex flex-row items-start justify-center border-l border-t p-8 pb-2 text-center'>
                <h2 className='bg-fd-primary text-fd-primary-foreground px-1 text-2xl font-semibold'>{t("info")}</h2>
                <MousePointer className='-ml-1 mt-8' />
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
        <div className='border-l border-t px-6 py-12'>
            <div className='mb-4 flex flex-row items-center gap-2 text-fd-muted-foreground'>
                <Icon className='size-4' />
                <h2 className='text-sm font-medium'>{heading}</h2>
            </div>
            <span className='font-medium'>{children}</span>
        </div>
    );
}

async function Hero() {
    const t = await getTranslations("HomePage");

    return (
        <div className='relative z-2 flex flex-col border-x border-t bg-fd-background/80 px-4 pt-12 max-md:text-center md:px-12 md:pt-16 [.uwu_&]:hidden overflow-hidden'>
            <div className='flex flex-col md:flex-row md:items-center'>
                {/* logo div */}
                <div className='order-1 md:order-2 flex justify-center items-center mt-8 md:mt-0 md:w-[30%] h-full relative'>
                    <div
                        className='flex justify-center items-center w-full h-full
                        md:absolute md:top-[-2.5rem] md:left-[-2.5rem] md:right-0'
                    >
                        <div className='w-[300px] h-[300px] md:w-auto md:h-auto flex justify-center items-center'>
                            <Image src={LogoImg} alt='preview' priority className='w-full h-full object-contain' />
                        </div>
                    </div>
                </div>
                {/* info div */}
                <div className='order-2 md:order-1 md:w-[70%] md:pr-8 flex-1'>
                    <div
                        className='absolute inset-0 z-[-1] blur-2xl hidden dark:block'
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent, white, transparent)",
                            background:
                                "repeating-linear-gradient(65deg, var(--color-blue-500), var(--color-blue-500) 12px, color-mix(in oklab, var(--color-blue-600) 30%, transparent) 20px, transparent 200px)",
                        }}
                    />
                    <div
                        className='absolute inset-0 z-[-1] blur-2xl dark:hidden'
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent, white, transparent)",
                            background:
                                "repeating-linear-gradient(65deg, var(--color-purple-300), var(--color-purple-300) 12px, color-mix(in oklab, var(--color-blue-600) 30%, transparent) 20px, transparent 200px)",
                        }}
                    />
                    <h1 className='mb-8 text-4xl font-medium md:hidden'>{t("mobile_title")}</h1>
                    <h1 className='mb-8 max-w-[600px] text-4xl font-medium max-md:hidden'>{t("title")}</h1>
                    <p className='mb-8 text-fd-muted-foreground md:max-w-[80%] md:text-xl'>{t("subtitle")}</p>

                    <div className='inline-flex items-center gap-3 max-md:mx-auto'>
                        <Link href='/start' className={cn(buttonVariants({ size: "lg", className: "rounded-full" }))}>
                            {t("getting_started")}
                        </Link>
                        <Link
                            href='/start/why'
                            className={cn(buttonVariants({ size: "lg", className: "rounded-full" }))}
                        >
                            {t("why_pixivn")}
                        </Link>
                        <a
                            href='https://discord.gg/E95FZWakzp'
                            target='_blank'
                            rel='noreferrer noopener'
                            className={cn(
                                buttonVariants({
                                    size: "lg",
                                    variant: "outline",
                                    className: "rounded-full bg-fd-background",
                                }),
                            )}
                        >
                            {t("discord")}
                        </a>
                        <a
                            href='https://drincs-productions.itch.io/pixi-vn'
                            target='_blank'
                            rel='noreferrer noopener'
                            className={cn(
                                buttonVariants({
                                    size: "lg",
                                    variant: "outline",
                                    className: "rounded-full bg-fd-background",
                                }),
                            )}
                        >
                            {t("open_demo")}
                        </a>
                    </div>
                </div>
            </div>
            <PreviewImages />
        </div>
    );
}

async function Introduction() {
    const t = await getTranslations("Introduction");

    return (
        <div className='grid grid-cols-1 border-r md:grid-cols-2'>
            <div className='flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16'>
                <div className={cn(badgeVariants())}>1</div>
                <h3 className='text-xl font-semibold'>{t("create_it")}</h3>
                <p className='mb-8 text-fd-muted-foreground'>{t("create_it_description")}</p>
                <CreateAppAnimation />
            </div>
            <div className='flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16'>
                <div className={cn(badgeVariants())}>2</div>
                <h3 className='text-xl font-semibold'>{t("write")}</h3>
                <p className='text-fd-muted-foreground'>{t("write_description")}</p>
                <div className='relative flex flex-col'>
                    <Tabs items={["ink", "TypeScript", "Json"]} className='absolute inset-x-2 top-0 shadow-lg'>
                        <Tab>
                            <CodeBlockPre
                                lang='bash'
                                code={`=== start ===
# show image bg bg01-hallway
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1 with movein direction right speed 300
james: You're my roommate's replacement, huh?
What is your name?
# rename mc { _input_value_ }
`}
                            />
                        </Tab>
                        <Tab>
                            <CodeBlockPre
                                lang='ts'
                                code={`const startLabel = newLabel("start", [
  async () => {
    await showImage("bg", "bg01-hallway");
    await showImageContainer("james", ["m01-body", "m01-eyes-smile", "m01-mouth-neutral01"], { xAlign: 0.5, yAlign: 1, });
    narration.dialogue = { character: james, text: \`You're my roommate's replacement, huh?\` };
  },
  () => narration.dialogue = "What is your name?",
`}
                            />
                        </Tab>
                        <Tab>
                            <CodeBlockPre
                                lang='json'
                                code={`{ labels: { start: [
    { operations: [
        { type: "image", alias: "bg", operationType: "show", url: "bg01-hallway" },
        { type: "imagecontainer", alias: "james", operationType: "show", urls: ["m01-body", "m01-eyes-smile", "m01-mouth-neutral01"], props: { xAlign: 0.5, yAlign: 1 }, transition: { type: "movein", props: { direction: "right", speed: 300 }}} 
    ], goNextStep: true },
    { dialogue: "james: You're my roommate's replacement, huh?" },
    { dialogue: "What is your name?" },
    { operations: [{ type: "operationtoconvert", values: ["rename mc ", { type: "value", storageOperationType: "get", storageType: "storage", key: "_input_value_" } ] }], goNextStep: true }
]}};
`}
                            />
                        </Tab>
                    </Tabs>
                    <Files className='z-[2] mt-55 shadow-xl'>
                        <Folder name='ink' defaultOpen>
                            <File name='start.ink' />
                        </Folder>
                        <Folder name='labels' defaultOpen>
                            <File name='animations-labels.ts' />
                            {/* <File name='startLabel.ts' /> */}
                        </Folder>
                    </Files>
                </div>
            </div>
            <div className='col-span-full flex flex-col items-center gap-2 border-l border-t px-6 py-16 text-center'>
                <div className={cn(badgeVariants())}>3</div>
                <h3 className='text-2xl font-semibold'>{t("ship")}</h3>
                <p className='text-fd-muted-foreground'>{t("ship_description")}</p>

                <div className='mt-4 flex flex-row flex-wrap items-center gap-8'>
                    <Link href='/start/distribution-itchio' rel='noreferrer noopener'>
                        <ItchLogo className='h-auto w-32' />
                    </Link>
                </div>
            </div>
        </div>
    );
}

async function Contributing() {
    const t = await getTranslations("Contributing");

    return (
        <div className='flex flex-col items-center border-x border-t px-4 py-16 text-center'>
            <Heart fill='currentColor' className='text-pink-500 mb-4' />
            <h2 className='mb-4 text-xl font-semibold sm:text-2xl'>{t("title")}</h2>
            <p className='mb-4 text-fd-muted-foreground'>{t("subtitle")}</p>
            <div className='mb-8 flex flex-row items-center gap-2'>
                <a
                    href='https://www.patreon.com/pixi_vn'
                    target='_blank'
                    className={cn(buttonVariants({ variant: "outline" }))}
                >
                    {t("patreon")}
                </a>
                <a
                    href='https://pixi-vn.fanbox.cc/'
                    target='_blank'
                    className={cn(buttonVariants({ variant: "outline" }))}
                >
                    {t("fanbox")}
                </a>
                <a
                    href='https://github.com/DRincs-Productions/pixi-vn/graphs/contributors'
                    rel='noreferrer noopener'
                    target='_blank'
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
