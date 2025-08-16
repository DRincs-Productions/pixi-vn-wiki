import { inkSource, nqtrSource, otherTopicsSource, renpySource, source } from "@/lib/source";
import { Image } from "fumadocs-core/framework";
import { DocsLayoutProps, LinkItemType } from "fumadocs-ui/layouts/docs";
import { SidebarOptions } from "fumadocs-ui/layouts/docs/shared";
import {
    Album,
    BookOpenText,
    Boxes,
    Database,
    Gamepad2,
    Globe,
    Hammer,
    History,
    MessageCircleQuestion,
    Music,
    Rocket,
    Save,
    Sparkles,
    User,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export async function startTree(lang?: string): Promise<DocsLayoutProps["tree"]> {
    const preUrl = lang ? `/${lang}` : "";
    const t = await getTranslations("layout");
    return {
        ...source.pageTree,
        name: "Pixi’VN",
        children: [
            {
                type: "separator",
                name: t("introduction"),
            },
            {
                type: "folder",
                name: t("start"),
                icon: <Album />,
                index: {
                    type: "page",
                    name: t("start"),
                    url: `${preUrl}/start`,
                },
                children: [
                    {
                        type: "page",
                        name: t("templates"),
                        url: `${preUrl}/start/templates`,
                    },
                ],
            },
            {
                type: "folder",
                name: t("why"),
                icon: <MessageCircleQuestion />,
                index: {
                    type: "page",
                    name: t("why"),
                    url: `${preUrl}/start/why`,
                },
                children: [
                    {
                        type: "page",
                        name: t("versus-renpy"),
                        url: `${preUrl}/start/versus-renpy`,
                        icon: <Image width={16} height={16} src='/renpy.svg' alt="Ren'Py" />,
                    },
                ],
            },
            {
                type: "folder",
                name: t("make-your-first"),
                defaultOpen: true,
                icon: <Hammer />,
                children: [
                    {
                        type: "page",
                        name: t("make-visual-novel"),
                        url: `${preUrl}/start/make-visual-novel`,
                    },
                    {
                        type: "page",
                        name: t("make-point-and-click"),
                        url: `${preUrl}/start/make-point-and-click`,
                    },
                    {
                        type: "page",
                        name: t("make-rpg"),
                        url: `${preUrl}/start/make-rpg`,
                    },
                    {
                        type: "page",
                        name: t("make-game-engine"),
                        url: `${preUrl}/start/make-game-engine`,
                    },
                ],
            },
            {
                type: "separator",
                name: t("first-steps"),
            },
            { type: "page", name: t("character"), url: `${preUrl}/start/character`, icon: <User /> },
            {
                type: "folder",
                name: t("narration"),
                icon: <BookOpenText />,
                index: {
                    type: "page",
                    name: t("narration"),
                    url: `${preUrl}/start/narration`,
                },
                children: [
                    {
                        type: "page",
                        name: t("ink"),
                        url: `${preUrl}/ink`,
                        icon: <Image width={16} height={16} src='/ink.svg' alt='ink' />,
                    },
                    {
                        type: "page",
                        name: t("renpy"),
                        url: `${preUrl}/renpy`,
                        icon: <Image width={16} height={16} src='/renpy.svg' alt="Ren'Py" />,
                    },
                    {
                        type: "folder",
                        name: t("js-ts"),
                        icon: <Image width={16} height={16} src='/typescript.svg' alt='TypeScript' />,
                        children: [
                            { type: "page", name: t("dialogue"), url: `${preUrl}/start/dialogue` },
                            {
                                type: "folder",
                                name: t("labels"),
                                index: {
                                    type: "page",
                                    name: t("labels"),
                                    url: `${preUrl}/start/labels`,
                                },
                                children: [
                                    { type: "page", name: t("labels-flow"), url: `${preUrl}/start/labels-flow` },
                                    {
                                        type: "page",
                                        name: t("labels-advanced"),
                                        url: `${preUrl}/start/labels-advanced`,
                                    },
                                ],
                            },
                            { type: "page", name: t("choices"), url: `${preUrl}/start/choices` },
                            { type: "page", name: t("input"), url: `${preUrl}/start/input` },
                            {
                                type: "page",
                                name: t("other-narrative-features"),
                                url: `${preUrl}/start/other-narrative-features`,
                            },
                        ],
                    },
                    {
                        type: "folder",
                        name: t("markup"),
                        icon: <Sparkles />,
                        index: {
                            type: "page",
                            name: t("markup"),
                            url: `${preUrl}/start/markup`,
                        },
                        children: [
                            {
                                type: "page",
                                name: t("markup-markdown"),
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
                                name: t("markup-tailwindcss"),
                                url: `${preUrl}/start/markup-tailwindcss`,
                                icon: <Image width={16} height={16} src='/tailwindcss.svg' alt='Tailwind CSS' />,
                            },
                        ],
                    },
                    { type: "page", name: t("history"), icon: <History />, url: `${preUrl}/start/history` },
                    { type: "page", name: t("translate"), icon: <Globe />, url: `${preUrl}/start/translate` },
                ],
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
                name: t("canvas"),
                index: {
                    type: "page",
                    name: t("canvas"),
                    url: `${preUrl}/start/canvas`,
                },
                children: [
                    { type: "page", name: t("canvas-alias"), url: `${preUrl}/start/canvas-alias` },
                    {
                        type: "folder",
                        name: t("canvas-components"),
                        index: {
                            type: "page",
                            name: t("canvas-components"),
                            url: `${preUrl}/start/canvas-components`,
                        },
                        children: [
                            { type: "page", name: t("canvas-images"), url: `${preUrl}/start/canvas-images` },
                            {
                                type: "page",
                                name: t("canvas-image-container"),
                                url: `${preUrl}/start/canvas-image-container`,
                            },
                            { type: "page", name: t("canvas-videos"), url: `${preUrl}/start/canvas-videos` },
                            { type: "page", name: t("canvas-filters"), url: `${preUrl}/start/canvas-filters` },
                            { type: "page", name: t("canvas-lights"), url: `${preUrl}/start/canvas-lights` },
                            { type: "page", name: t("canvas-spine2d"), url: `${preUrl}/start/canvas-spine2d` },
                            {
                                type: "page",
                                name: t("canvas-threejs"),
                                url: `${preUrl}/start/canvas-threejs`,
                                icon: <Image width={16} height={16} src='/threejs.svg' alt='Three.js' />,
                            },
                        ],
                    },
                    { type: "page", name: t("canvas-functions"), url: `${preUrl}/start/canvas-functions` },
                    { type: "page", name: t("canvas-position"), url: `${preUrl}/start/canvas-position` },
                    {
                        type: "folder",
                        name: t("canvas-animations-effects"),
                        index: {
                            type: "page",
                            name: t("canvas-animations-effects"),
                            url: `${preUrl}/start/canvas-animations-effects`,
                        },
                        children: [
                            {
                                type: "folder",
                                name: t("canvas-motion"),
                                index: {
                                    type: "page",
                                    name: t("canvas-motion"),
                                    url: `${preUrl}/start/canvas-motion`,
                                },
                                children: [
                                    {
                                        type: "page",
                                        name: t("canvas-articulated-animations-effects"),
                                        url: `${preUrl}/start/canvas-articulated-animations-effects`,
                                    },
                                ],
                            },
                            { type: "page", name: t("canvas-transition"), url: `${preUrl}/start/canvas-transition` },
                            {
                                type: "folder",
                                name: t("canvas-tickers"),
                                index: {
                                    type: "page",
                                    name: t("canvas-tickers"),
                                    url: `${preUrl}/start/canvas-tickers`,
                                },
                                children: [
                                    {
                                        type: "page",
                                        name: t("canvas-tickers-functions"),
                                        url: `${preUrl}/start/canvas-tickers-functions`,
                                    },
                                ],
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
                        name: "Flags management",
                        url: `${preUrl}/start/flags`,
                    },
                    {
                        type: "page",
                        name: "Stored classes",
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
                name: "Minigames",
                icon: <Gamepad2 />,
                url: `${preUrl}/start/minigames`,
            },
            {
                type: "page",
                name: "Save and Load",
                icon: <Save />,
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

export async function renpyTree(lang?: string): Promise<DocsLayoutProps["tree"]> {
    const preUrl = lang ? `/${lang}` : "";
    const t = await getTranslations("layout");
    return {
        ...renpySource.pageTree,
        name: "Ren’Py",
        children: [
            {
                type: "separator",
                name: "Introduction",
            },
            {
                type: "page",
                name: t("start"),
                icon: <Album />,
                url: `${preUrl}/renpy`,
            },
        ],
    };
}

export async function inkTree(lang?: string): Promise<DocsLayoutProps["tree"]> {
    const preUrl = lang ? `/${lang}` : "";
    const t = await getTranslations("layout");
    return {
        ...inkSource.pageTree,
        name: "ink",
        children: [
            {
                type: "separator",
                name: "Introduction",
            },
            {
                type: "page",
                name: t("start"),
                icon: <Album />,
                url: `${preUrl}/ink`,
            },
            {
                type: "separator",
                name: "First steps",
            },
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
    };
}

export async function otherTopicsTree(lang?: string): Promise<DocsLayoutProps["tree"]> {
    const preUrl = lang ? `/${lang}` : "";
    // const t = await getTranslations("layout");
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

export async function homeLinks(lang?: string): Promise<LinkItemType[]> {
    const preUrl = lang ? `/${lang}` : "";
    // const t = await getTranslations("layout");
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
            url: `${preUrl}/start`,
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

export async function nqtrTree(lang?: string): Promise<DocsLayoutProps["tree"]> {
    const preUrl = lang ? `/${lang}` : "";
    const t = await getTranslations("layout");
    return {
        ...nqtrSource.pageTree,
        name: "Navigation Quest Time Routine (NQTR)",
        children: [
            {
                type: "separator",
                name: "Introduction",
            },
            {
                type: "page",
                name: t("start"),
                icon: <Album />,
                url: `${preUrl}/nqtr`,
            },
            {
                type: "separator",
                name: "First steps",
            },
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
            {
                type: "page",
                name: "Quests",
                url: `${preUrl}/nqtr/quest`,
            },
        ],
    };
}

export async function sidebar(lang?: string): Promise<
    Partial<SidebarOptions> & {
        enabled?: boolean;
        component?: ReactNode;
    }
> {
    const preUrl = lang ? `/${lang}` : "";
    // const t = await getTranslations("layout");
    return {
        tabs: [
            {
                title: "Pixi’VN",
                icon: <Image width={16} height={16} src='/icon.png' alt='Pixi’VN' />,
                description: "Getting started with Pixi’VN",
                url: `${preUrl}/start`,
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
                title: "Ren’Py (Cooming soon)",
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
