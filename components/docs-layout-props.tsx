import { inkSource, nqtrSource, otherTopicsSource, renpySource, source } from "@/lib/source";
import { Image } from "fumadocs-core/framework";
import { DocsLayoutProps, LinkItemType } from "fumadocs-ui/layouts/docs";
import { SidebarOptions } from "fumadocs-ui/layouts/docs/shared";
import {
    Album,
    BookOpenText,
    Boxes,
    Database,
    Globe,
    Hammer,
    History,
    MessageCircleQuestion,
    Music,
    Rocket,
    Sparkles,
    User,
} from "lucide-react";
import { ReactNode } from "react";

export function startTree(lang?: string): DocsLayoutProps["tree"] {
    const preUrl = lang ? `/${lang}` : "";
    return {
        ...source.pageTree,
        name: "Pixi’VN",
        children: [
            {
                type: "separator",
                name: "Introduction",
            },
            {
                type: "folder",
                name: "Quick Start",
                icon: <Album />,
                index: {
                    type: "page",
                    name: "Quick Start",
                    url: `${preUrl}/start/getting-started`,
                },
                children: [
                    {
                        type: "page",
                        name: "Templates",
                        url: `${preUrl}/start/templates`,
                    },
                ],
            },
            {
                type: "folder",
                name: "Why Pixi’VN?",
                icon: <MessageCircleQuestion />,
                index: {
                    type: "page",
                    name: "Why Pixi’VN?",
                    url: `${preUrl}/start/why`,
                },
                children: [
                    {
                        type: "page",
                        name: "Ren'Py vs Pixi’VN",
                        url: `${preUrl}/start/versus-renpy`,
                        icon: <Image width={16} height={16} src='/renpy.svg' alt="Ren'Py" />,
                    },
                ],
            },
            {
                type: "folder",
                name: "Make your first",
                defaultOpen: true,
                icon: <Hammer />,
                children: [
                    {
                        type: "page",
                        name: "Visual Novel",
                        url: `${preUrl}/start/make-visual-novel`,
                    },
                    {
                        type: "page",
                        name: "Point & Click Adventure",
                        url: `${preUrl}/start/make-point-and-click`,
                    },
                    {
                        type: "page",
                        name: "RPG game",
                        url: `${preUrl}/start/make-rpg`,
                    },
                    {
                        type: "page",
                        name: "Game Engine",
                        url: `${preUrl}/start/make-game-engine`,
                    },
                ],
            },
            {
                type: "separator",
                name: "First steps",
            },
            { type: "page", name: "Characters", url: `${preUrl}/start/character`, icon: <User /> },
            {
                type: "folder",
                name: "Narration",
                icon: <BookOpenText />,
                index: {
                    type: "page",
                    name: "Narration",
                    url: `${preUrl}/start/narration`,
                },
                children: [
                    {
                        type: "page",
                        name: "Narration with ink",
                        url: `${preUrl}/ink`,
                        icon: <Image width={16} height={16} src='/ink.svg' alt='ink' />,
                    },
                    {
                        type: "page",
                        name: "Narration with Ren’Py",
                        url: `${preUrl}/renpy`,
                        icon: <Image width={16} height={16} src='/renpy.svg' alt="Ren'Py" />,
                    },
                    {
                        type: "folder",
                        name: "Narration with JS/TS",
                        icon: <Image width={16} height={16} src='/typescript.svg' alt='TypeScript' />,
                        children: [
                            { type: "page", name: "Dialogue", url: `${preUrl}/start/dialogue` },
                            {
                                type: "folder",
                                name: "Labels and steps",
                                index: {
                                    type: "page",
                                    name: "Labels and steps",
                                    url: `${preUrl}/start/labels`,
                                },
                                children: [
                                    { type: "page", name: "Game flow with labels", url: `${preUrl}/start/labels-flow` },
                                    { type: "page", name: "Label features", url: `${preUrl}/start/labels-advanced` },
                                ],
                            },
                            { type: "page", name: "Choice Menus", url: `${preUrl}/start/choices` },
                            { type: "page", name: "Input prompt", url: `${preUrl}/start/input` },
                            { type: "page", name: "Other features", url: `${preUrl}/start/other-narrative-features` },
                        ],
                    },
                    {
                        type: "folder",
                        name: "Markup language (to add text style)",
                        icon: <Sparkles />,
                        index: {
                            type: "page",
                            name: "Markup language (to add text style)",
                            url: `${preUrl}/start/markup`,
                        },
                        children: [
                            {
                                type: "page",
                                name: "Markdown",
                                url: `${preUrl}/start/markup-markdown`,
                                icon: (
                                    <Image
                                        width={16}
                                        height={16}
                                        src='/markdown.svg'
                                        alt='Markdown'
                                        style={{
                                            backgroundColor: "white",
                                            borderRadius: "50%",
                                        }}
                                    />
                                ),
                            },
                            {
                                type: "page",
                                name: "Tailwind CSS",
                                url: `${preUrl}/start/markup-tailwindcss`,
                                icon: <Image width={16} height={16} src='/tailwindcss.svg' alt='Tailwind CSS' />,
                            },
                        ],
                    },
                    { type: "page", name: "History", icon: <History />, url: `${preUrl}/start/history` },
                    { type: "page", name: "Translating", icon: <Globe />, url: `${preUrl}/start/translate` },
                ],
            },
            {
                type: "folder",
                name: "Canvas (WebGL)",
                index: {
                    type: "page",
                    name: "Canvas (WebGL)",
                    url: `${preUrl}/start/canvas`,
                },
                children: [
                    { type: "page", name: "Canvas alias", url: `${preUrl}/start/canvas-alias` },
                    {
                        type: "folder",
                        name: "Canvas Components",
                        index: {
                            type: "page",
                            name: "Canvas Components",
                            url: `${preUrl}/start/canvas-components`,
                        },
                        children: [
                            { type: "page", name: "ImageSprite", url: `${preUrl}/start/canvas-images` },
                            { type: "page", name: "ImageContainer", url: `${preUrl}/start/canvas-image-container` },
                            { type: "page", name: "VideoSprite", url: `${preUrl}/start/canvas-videos` },
                            { type: "page", name: "Filters", url: `${preUrl}/start/canvas-filters` },
                            { type: "page", name: "Lights", url: `${preUrl}/start/canvas-lights` },
                            { type: "page", name: "Spine 2D", url: `${preUrl}/start/canvas-spine2d` },
                            {
                                type: "page",
                                name: "Three.js",
                                url: `${preUrl}/start/canvas-threejs`,
                                icon: <Image width={16} height={16} src='/threejs.svg' alt='Three.js' />,
                            },
                        ],
                    },
                    { type: "page", name: "Components functions", url: `${preUrl}/start/canvas-functions` },
                    { type: "page", name: "Position properties", url: `${preUrl}/start/canvas-position` },
                    { type: "page", name: "Transitions", url: `${preUrl}/start/canvas-transition` },
                    {
                        type: "folder",
                        name: "Animations and Effects",
                        index: {
                            type: "page",
                            name: "Animations and Effects",
                            url: `${preUrl}/start/canvas-animations-effects`,
                        },
                        children: [
                            {
                                type: "folder",
                                name: "Primitives (ticker)",
                                index: {
                                    type: "page",
                                    name: "Primitives (ticker)",
                                    url: `${preUrl}/start/canvas-tickers`,
                                },
                                children: [
                                    {
                                        type: "page",
                                        name: "Tickers methods",
                                        url: `${preUrl}/start/canvas-tickers-functions`,
                                    },
                                ],
                            },
                            {
                                type: "page",
                                name: "Articulated",
                                url: `${preUrl}/start/canvas-articulated-animations-effects`,
                            },
                        ],
                    },
                ],
            },
            {
                type: "page",
                name: "Sounds and Music",
                url: `${preUrl}/start/sound`,
                icon: <Music />,
            },
            {
                type: "folder",
                name: "Assets",
                icon: <Boxes />,
                index: {
                    type: "page",
                    name: "Assets",
                    url: `${preUrl}/start/assets`,
                },
                children: [
                    {
                        type: "page",
                        name: "Assets management",
                        url: `${preUrl}/start/assets-management`,
                    },
                ],
            },
            {
                type: "folder",
                name: "Storage",
                icon: <Database />,
                index: {
                    type: "page",
                    name: "Storage",
                    url: `${preUrl}/start/storage`,
                },
                children: [
                    {
                        type: "page",
                        name: "Temporary storage",
                        url: `${preUrl}/start/temp-storage`,
                    },
                    {
                        type: "page",
                        name: "Flags Management",
                        url: `${preUrl}/start/flags`,
                    },
                    {
                        type: "page",
                        name: "Stored Classes",
                        url: `${preUrl}/start/stored-classes`,
                    },
                ],
            },
            {
                type: "folder",
                name: "User Interface (UI)",
                index: {
                    type: "page",
                    name: "User Interface (UI)",
                    url: `${preUrl}/start/interface`,
                },
                children: [
                    {
                        type: "folder",
                        name: "JavaScript Frameworks",
                        defaultOpen: true,
                        children: [
                            {
                                type: "page",
                                name: "React",
                                url: `${preUrl}/start/interface-react`,
                                icon: <Image width={16} height={16} src='/react.svg' alt='React' />,
                            },
                            {
                                type: "page",
                                name: "Vue",
                                url: `${preUrl}/start/interface-vue`,
                                icon: <Image width={16} height={16} src='/vue.svg' alt='Vue' />,
                            },
                            {
                                type: "page",
                                name: "PixiJS",
                                url: `${preUrl}/start/interface-pixijs`,
                                icon: <Image width={16} height={16} src='/pixijs.svg' alt='PixiJS' />,
                            },
                        ],
                    },
                    {
                        type: "page",
                        name: "UI screen examples",
                        url: `${preUrl}/start/interface-examples`,
                    },
                    {
                        type: "page",
                        name: "Navigate/switch between UI screens",
                        url: `${preUrl}/start/interface-navigate`,
                    },
                    {
                        type: "page",
                        name: "Connect the UI with the storage",
                        url: `${preUrl}/start/interface-connect-storage`,
                    },
                ],
            },
            {
                type: "page",
                name: "Save and Load",
                url: `${preUrl}/start/save`,
            },
            {
                type: "folder",
                name: "Distribution",
                icon: <Rocket />,
                index: {
                    type: "page",
                    name: "Distribution",
                    url: `${preUrl}/start/distribution`,
                },
                children: [
                    {
                        type: "page",
                        name: "Website distribution",
                        url: `${preUrl}/start/distribution-website`,
                    },
                    {
                        type: "page",
                        name: "Desktop & mobile devices",
                        url: `${preUrl}/start/distribution-desktop-mobile`,
                    },
                    {
                        type: "page",
                        name: "itch.io",
                        url: `${preUrl}/start/distribution-itchio`,
                    },
                ],
            },
        ],
    };
}

export function renpyTree(lang?: string): DocsLayoutProps["tree"] {
    const preUrl = lang ? `/${lang}` : "";
    return {
        ...renpySource.pageTree,
        name: "Ren’Py",
        children: [
            {
                type: "folder",
                name: "Narration with Ren’Py (In progress)",
                defaultOpen: true,
                index: {
                    type: "page",
                    name: "Ren’Py",
                    url: `${preUrl}/renpy`,
                },
                children: [],
            },
            { type: "page", name: "Back", url: `${preUrl}/start/narration` },
        ],
    };
}

export function inkTree(lang?: string): DocsLayoutProps["tree"] {
    const preUrl = lang ? `/${lang}` : "";
    return {
        ...inkSource.pageTree,
        name: "ink",
        children: [
            {
                type: "folder",
                name: "Narration with ink",
                defaultOpen: true,
                index: {
                    type: "page",
                    name: "ink",
                    url: `${preUrl}/ink`,
                },
                children: [
                    { type: "page", name: "Characters", url: `${preUrl}/ink/ink-character` },
                    { type: "page", name: "Open a knot", url: `${preUrl}/ink/ink-label` },
                    { type: "page", name: "Variables", url: `${preUrl}/ink/ink-variables` },
                    { type: "page", name: "Markup language (to add text style)", url: `${preUrl}/ink/ink-markup` },
                    { type: "page", name: "Input prompt", url: `${preUrl}/ink/ink-input` },
                    { type: "page", name: "Canvas", url: `${preUrl}/ink/ink-canvas` },
                    { type: "page", name: "Sounds and Music", url: `${preUrl}/ink/ink-sound` },
                    { type: "page", name: "Assets management", url: `${preUrl}/ink/ink-assets` },
                    { type: "page", name: "Pause", url: `${preUrl}/ink/ink-pause` },
                    { type: "page", name: "Text replacement", url: `${preUrl}/ink/ink-replacement` },
                    { type: "page", name: "Translating", url: `${preUrl}/ink/ink-translate` },
                    { type: "page", name: "Custom Hashtag Script", url: `${preUrl}/ink/ink-hashtag` },
                ],
            },
            {
                type: "page",
                name: "Back",
                url: `${preUrl}/start/narration`,
            },
        ],
    };
}

export function otherTopicsTree(lang?: string): DocsLayoutProps["tree"] {
    const preUrl = lang ? `/${lang}` : "";
    return {
        ...otherTopicsSource.pageTree,
        name: "Other Topics",
        children: [
            {
                type: "separator",
                name: "Other Topics",
            },
            {
                type: "page",
                name: "FAQ",
                url: `${preUrl}/other-topics/faq`,
            },
            {
                type: "page",
                name: "Migration",
                url: `${preUrl}/other-topics/migration`,
            },
            {
                type: "page",
                name: "Intecept Events",
                url: `${preUrl}/other-topics/intercept-events`,
            },
            {
                type: "page",
                name: "Pixi’VN + Json Integration",
                url: `${preUrl}/other-topics/pixi-vn-json`,
            },
        ],
    };
}

export function homeLinks(lang?: string): LinkItemType[] {
    const preUrl = lang ? `/${lang}` : "";
    return [
        {
            type: "menu",
            text: "Make your first",
            items: [
                {
                    text: "Visual Novel",
                    url: `${preUrl}/start/make-visual-novel`,
                },
                {
                    text: "Point & Click Adventure",
                    url: `${preUrl}/start/make-point-and-click`,
                },
                {
                    text: "RPG game",
                    url: `${preUrl}/start/make-rpg`,
                },
                {
                    text: "Game engine",
                    url: `${preUrl}/start/make-game-engine`,
                },
            ],
        },
        {
            text: "Guide",
            url: `${preUrl}/start/getting-started`,
        },
        {
            type: "menu",
            text: "Other topics",
            items: [
                {
                    text: "FAQ",
                    url: `${preUrl}/other-topics/faq`,
                },
                {
                    text: "Migration",
                    url: `${preUrl}/other-topics/migration`,
                },
                {
                    text: "Intecept Events",
                    url: `${preUrl}/other-topics/intercept-events`,
                },
                {
                    text: "Pixi’VN + Json Integration",
                    url: `${preUrl}/other-topics/pixi-vn-json`,
                },
            ],
        },
    ];
}

export function nqtrTree(lang?: string): DocsLayoutProps["tree"] {
    const preUrl = lang ? `/${lang}` : "";
    return {
        ...nqtrSource.pageTree,
        name: "Navigation Quest Time Routine (NQTR)",
        children: [
            {
                type: "folder",
                name: "Navigation Quest Time Routine (NQTR)",
                defaultOpen: true,
                index: {
                    type: "page",
                    name: "NQTR",
                    url: `${preUrl}/nqtr`,
                },
                children: [
                    {
                        type: "page",
                        name: "Navigation and map",
                        url: `${preUrl}/nqtr/navigation`,
                    },
                    {
                        type: "page",
                        name: "Time system",
                        url: `${preUrl}/nqtr/time`,
                    },
                    {
                        type: "page",
                        name: "Activity",
                        url: `${preUrl}/nqtr/activity`,
                    },
                    {
                        type: "page",
                        name: "Routine",
                        url: `${preUrl}/nqtr/routine`,
                    },
                ],
            },
        ],
    };
}

export function sidebar(lang?: string): Partial<SidebarOptions> & {
    enabled?: boolean;
    component?: ReactNode;
} {
    const preUrl = lang ? `/${lang}` : "";
    return {
        tabs: [
            {
                title: "Pixi’VN",
                icon: <Image width={16} height={16} src='/icon.png' alt='Pixi’VN' />,
                description: "Getting started with Pixi’VN",
                url: `${preUrl}/start/getting-started`,
            },
            {
                title: "NQTR (Beta)",
                description: "Navigation Quest Time Routine",
                url: `${preUrl}/nqtr`,
            },
            {
                title: "ink",
                icon: <Image width={16} height={16} src='/ink.svg' alt='ink' />,
                description: "ink narration",
                url: `${preUrl}/ink`,
            },
            {
                title: "Ren’Py",
                icon: <Image width={16} height={16} src='/renpy.svg' alt="Ren'Py" />,
                description: "Ren’Py narration",
                url: `${preUrl}/renpy`,
            },
            {
                title: "Other Topics",
                description: "Other topics",
                url: `${preUrl}/other-topics/faq`,
            },
        ],
    };
}
