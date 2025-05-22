import { UwuHero } from "@/app/(home)/uwu";
import { CodeBlockPre } from "@/components/code-block";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import LogoImg from "@/public/logo.webp";
import { cva } from "class-variance-authority";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import {
    Heart,
    KeyboardIcon,
    LayoutIcon,
    type LucideIcon,
    MousePointer,
    PersonStandingIcon,
    RocketIcon,
    SearchIcon,
    TimerIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ArchImg from "./arch.png";
import { NetlifyLogo, VercelLogo } from "./icons";
import { CreateAppAnimation } from "./page.client";

const badgeVariants = cva(
    "inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground"
);

export default function Page() {
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
                        <UwuHero />
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

function Architecture() {
    return (
        <div className='flex flex-col gap-4 border-x border-t p-8 md:px-12 lg:flex-row'>
            <div className='text-start'>
                <p className='px-2 py-1 text-sm font-mono bg-fd-primary text-fd-primary-foreground font-bold w-fit mb-4'>
                    Designed with Love
                </p>
                <h2 className='text-2xl font-semibold mb-4'>A breakable framework.</h2>
                <p className='text-fd-muted-foreground mb-6'>
                    Fumadocs makes it easy to build beautiful docs, write content, and transform content into data for
                    your React.js framework.
                </p>
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

function Highlights(): React.ReactElement {
    return (
        <div className='grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3'>
            <div className='col-span-full flex flex-row items-start justify-center border-l border-t p-8 pb-2 text-center'>
                <h2 className='bg-fd-primary text-fd-primary-foreground px-1 text-2xl font-semibold'>Highlights</h2>
                <MousePointer className='-ml-1 mt-8' />
            </div>
            <Highlight icon={TimerIcon} heading='Light & Fast.'>
                Less Javascript with React Server Component, and optimized images.
            </Highlight>
            <Highlight icon={LayoutIcon} heading='Accessibility & UX first.'>
                Focus on user experience and accessibility.
            </Highlight>
            <Highlight icon={RocketIcon} heading='Next.js First.'>
                Powerful documentation site with Next.js, React Router, or Tanstack Start.
            </Highlight>
            <Highlight icon={SearchIcon} heading='Syntax Highlighting.'>
                Beautiful syntax highlighter, powered by{" "}
                <a href='https://shiki.style' rel='noreferrer noopener'>
                    Shiki
                </a>
                .
            </Highlight>
            <Highlight icon={KeyboardIcon} heading='Automation.'>
                Useful remark/rehype plugins. Typescript Twoslash, OpenAPI docs generation, and more.
            </Highlight>
            <Highlight icon={PersonStandingIcon} heading='Personalized.'>
                Advanced options for customising your theme in a comfortable way.
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

function Hero() {
    return (
        <div
            className='relative z-[2] flex flex-col border-x border-t bg-fd-background/80 px-4 pt-12 max-md:text-center md:px-12 md:pt-16 [.uwu_&]:hidden overflow-hidden
            md:flex-row md:items-center'
        >
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
                <h1 className='mb-8 text-4xl font-medium md:hidden'>Build Your Visual Novel</h1>
                <h1 className='mb-8 max-w-[600px] text-4xl font-medium max-md:hidden'>
                    Build fantastic visual novel with your favorite JS Frameworks
                </h1>
                <p className='mb-8 text-fd-muted-foreground md:max-w-[80%] md:text-xl'>
                    Pixi’VN is a very versatile and powerful 2D game engine. It is based on JavaScript/TypeScript and
                    PixiJS.
                </p>

                <div className='inline-flex items-center gap-3 max-md:mx-auto'>
                    <Link
                        href='/start/getting-started'
                        className={cn(buttonVariants({ size: "lg", className: "rounded-full" }))}
                    >
                        Getting Started
                    </Link>
                    <Link href='/start/why' className={cn(buttonVariants({ size: "lg", className: "rounded-full" }))}>
                        Why Pixi’VN?
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
                            })
                        )}
                    >
                        Discord
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
                            })
                        )}
                    >
                        Open Demo
                    </a>
                </div>
            </div>
        </div>
    );
}

function Introduction(): React.ReactElement {
    return (
        <div className='grid grid-cols-1 border-r md:grid-cols-2'>
            <div className='flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16'>
                <div className={cn(badgeVariants())}>1</div>
                <h3 className='text-xl font-semibold'>Create it.</h3>
                <p className='mb-8 text-fd-muted-foreground'>Initialize a new game with a command.</p>
                <CreateAppAnimation />
            </div>
            <div className='flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16'>
                <div className={cn(badgeVariants())}>2</div>
                <h3 className='text-xl font-semibold'>Write.</h3>
                <p className='text-fd-muted-foreground'>{"Write your story in your favorite narrative language."}</p>
                <div className='relative flex flex-col'>
                    <Tabs items={["ink", "TypeScript"]} className='absolute inset-x-2 top-0 shadow-lg'>
                        <Tab>
                            <CodeBlockPre
                                lang='bash'
                                code={`=== start ===
# show image bg bg01-hallway
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1 with movein direction right speed 300
james: You're my roommate's replacement, huh?
What is your name?
# rename mc { _input_value_ }

# show imagecontainer james [m01-body m01-eyes-grin m01-mouth-smile01]
james: [james]!
# show imagecontainer james [m01-body m01-eyes-grin m01-mouth-grin00]
mc: ...[mc].

# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-grin00]
I take his hand and shake.`}
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
        () => { narration.dialogue = \`What is your name?\` },
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
                            <File name='startLabel.ts' />
                        </Folder>
                    </Files>
                </div>
            </div>
            <div className='col-span-full flex flex-col items-center gap-2 border-l border-t px-6 py-16 text-center'>
                <div className={cn(badgeVariants())}>3</div>
                <h3 className='text-2xl font-semibold'>Ship.</h3>
                <p className='text-fd-muted-foreground'>
                    Deploy your docs easily with Next.js compatible hosting platforms.
                </p>

                <div className='mt-4 flex flex-row flex-wrap items-center gap-8'>
                    <a href='https://vercel.com' rel='noreferrer noopener'>
                        <VercelLogo className='h-auto w-32' />
                    </a>
                    <a href='https://netlify.com' rel='noreferrer noopener'>
                        <NetlifyLogo className='h-auto w-32' />
                    </a>
                </div>
            </div>
        </div>
    );
}

function Contributing() {
    return (
        <div className='flex flex-col items-center border-x border-t px-4 py-16 text-center'>
            <Heart fill='currentColor' className='text-pink-500 mb-4' />
            <h2 className='mb-4 text-xl font-semibold sm:text-2xl'>Made Possible by You.</h2>
            <p className='mb-4 text-fd-muted-foreground'>
                Fumadocs is 100% powered by passion and open source community.
            </p>
            <div className='mb-8 flex flex-row items-center gap-2'>
                <Link href='/sponsors' className={cn(buttonVariants({ variant: "outline" }))}>
                    Sponsors
                </Link>
                <a
                    href='https://github.com/fuma-nama/fumadocs/graphs/contributors'
                    rel='noreferrer noopener'
                    className={cn(buttonVariants({ variant: "ghost" }))}
                >
                    Contributors
                </a>
            </div>
        </div>
    );
}
