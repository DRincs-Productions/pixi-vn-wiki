import { faqSource, inkSource, jsonSource, nqtrSource, renpySource, source } from "@/lib/source";
import { Image } from "fumadocs-core/framework";
import { DocsLayoutProps, LinkItemType } from "fumadocs-ui/layouts/docs";
import {
    Album,
    ArrowBigUpDash,
    BookOpenText,
    Boxes,
    CircleQuestionMark,
    Crop,
    Database,
    File,
    Gamepad2,
    Globe,
    Hammer,
    History,
    ImageIcon,
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
                        url: `${preUrl}/nqtr/make-point-and-click`,
                    },
                    {
                        type: "page",
                        name: t("make-rpg"),
                        url: `${preUrl}/start/make-rpg`,
                    },
                    {
                        type: "page",
                        name: t("make-ide"),
                        url: `${preUrl}/start/make-ide`,
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
                icon: <ImageIcon />,
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
                            { type: "page", name: t("canvas-image"), url: `${preUrl}/start/canvas-image` },
                            {
                                type: "page",
                                name: t("canvas-image-container"),
                                url: `${preUrl}/start/canvas-image-container`,
                            },
                            { type: "page", name: t("canvas-video"), url: `${preUrl}/start/canvas-video` },
                            { type: "page", name: t("canvas-text"), url: `${preUrl}/start/canvas-text` },
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
                name: t("sound"),
                url: `${preUrl}/start/sound`,
                icon: <Music />,
            },
            {
                type: "folder",
                name: t("storage"),
                icon: <Database />,
                index: {
                    type: "page",
                    name: t("storage"),
                    url: `${preUrl}/start/storage`,
                },
                children: [
                    {
                        type: "page",
                        name: t("temp-storage"),
                        url: `${preUrl}/start/temp-storage`,
                    },
                    {
                        type: "page",
                        name: t("flags"),
                        url: `${preUrl}/start/flags`,
                    },
                    {
                        type: "page",
                        name: t("stored-classes"),
                        url: `${preUrl}/start/stored-classes`,
                    },
                ],
            },
            {
                type: "folder",
                name: "User Interface (UI)",
                icon: <Crop />,
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
                name: "Save and load",
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
                name: t("introduction"),
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
            { type: "separator", name: t("introduction") },
            { type: "page", name: t("start"), icon: <Album />, url: `${preUrl}/ink` },
            { type: "page", name: t("vscode-extension"), url: `${preUrl}/ink/vscode-extension` },
            {
                type: "folder",
                name: t("make-your-first"),
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
                        url: `${preUrl}/nqtr/make-point-and-click`,
                    },
                    {
                        type: "page",
                        name: t("make-rpg"),
                        url: `${preUrl}/start/make-rpg`,
                    },
                ],
            },
            {
                type: "separator",
                name: t("first-steps"),
            },
            { type: "page", name: t("character"), url: `${preUrl}/ink/character`, icon: <User /> },
            {
                type: "folder",
                name: t("narration"),
                icon: <BookOpenText />,
                defaultOpen: true,
                children: [
                    { type: "page", name: "Knots", url: `${preUrl}/ink/labels` },
                    { type: "page", name: t("choices"), url: `${preUrl}/ink/choices` },
                    { type: "page", name: t("input"), url: `${preUrl}/ink/input` },
                    {
                        type: "page",
                        name: t("other-narrative-features"),
                        url: `${preUrl}/ink/other-narrative-features`,
                    },
                    { type: "page", name: t("markup"), icon: <Sparkles />, url: `${preUrl}/ink/markup` },
                    { type: "page", name: t("translate"), icon: <Globe />, url: `${preUrl}/ink/translate` },
                ],
            },
            { type: "page", name: t("storage"), icon: <Database />, url: `${preUrl}/ink/storage` },
            { type: "page", name: t("canvas"), icon: <ImageIcon />, url: `${preUrl}/ink/canvas` },
            { type: "page", name: t("sound"), url: `${preUrl}/ink/sound` },
            { type: "page", name: "Assets management", url: `${preUrl}/ink/assets` },
            { type: "page", name: "Text replacement", url: `${preUrl}/ink/replacement` },
            { type: "page", name: "Custom Hashtag Script", url: `${preUrl}/ink/hashtag` },
        ],
    };
}

export async function faqTree(lang?: string): Promise<DocsLayoutProps["tree"]> {
    const preUrl = lang ? `/${lang}` : "";
    const t = await getTranslations("layout");
    return {
        ...faqSource.pageTree,
        name: "FAQ",
        children: [
            {
                type: "page",
                name: t("faq"),
                icon: <CircleQuestionMark />,
                url: `${preUrl}/faq`,
            },
            {
                type: "page",
                name: "Migration",
                icon: <ArrowBigUpDash />,
                url: `${preUrl}/faq/migration`,
            },
        ],
    };
}

export async function homeLinks(lang?: string): Promise<LinkItemType[]> {
    const preUrl = lang ? `/${lang}` : "";
    const t = await getTranslations("layout");
    return [
        {
            type: "menu",
            text: t("make-your-first"),
            items: [
                {
                    text: t("make-visual-novel"),
                    url: `${preUrl}/start/make-visual-novel`,
                },
                {
                    text: t("make-point-and-click"),
                    url: `${preUrl}/nqtr/make-point-and-click`,
                },
                {
                    text: t("make-rpg"),
                    url: `${preUrl}/start/make-rpg`,
                },
                {
                    text: t("make-game-engine"),
                    url: `${preUrl}/start/make-game-engine`,
                },
            ],
        },
        {
            text: t("start"),
            url: `${preUrl}/start`,
        },
        {
            text: t("ink"),
            url: `${preUrl}/ink`,
        },
        {
            text: t("faq"),
            url: `${preUrl}/faq`,
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
                name: t("introduction"),
            },
            {
                type: "page",
                name: t("start"),
                icon: <Album />,
                url: `${preUrl}/nqtr`,
            },
            {
                type: "folder",
                name: t("make-your-first"),
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
                        url: `${preUrl}/nqtr/make-point-and-click`,
                    },
                    {
                        type: "page",
                        name: t("make-rpg"),
                        url: `${preUrl}/start/make-rpg`,
                    },
                ],
            },
            {
                type: "separator",
                name: t("first-steps"),
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

export async function jsonTree(lang?: string): Promise<DocsLayoutProps["tree"]> {
    const preUrl = lang ? `/${lang}` : "";
    const t = await getTranslations("layout");
    return {
        ...jsonSource.pageTree,
        name: "Pixi’VN Json",
        children: [
            {
                type: "page",
                name: t("start"),
                icon: <Album />,
                url: `${preUrl}/json`,
            },
            { type: "separator", name: t("models") },
            {
                type: "folder",
                name: "PixiVNJson",
                icon: <File />,
                index: {
                    type: "page",
                    name: "PixiVNJson",
                    url: `${preUrl}/json/PixiVNJson`,
                },
                children: [
                    {
                        type: "page",
                        name: t("choices"),
                        icon: <File />,
                        url: `${preUrl}/json/PixiVNJsonChoices`,
                    },
                    {
                        type: "page",
                        name: t("labels-flow"),
                        icon: <File />,
                        url: `${preUrl}/json/PixiVNJsonLabelToOpen`,
                    },
                    {
                        type: "page",
                        name: t("operations"),
                        icon: <File />,
                        url: `${preUrl}/json/PixiVNJsonOperation`,
                    },
                ],
            },
            {
                type: "page",
                name: t("conditions"),
                icon: <File />,
                url: `${preUrl}/json/PixiVNJsonConditionalStatements`,
            },
        ],
    };
}

export async function sidebar(lang?: string): Promise<
    Partial<DocsLayoutProps["sidebar"]> & {
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
                title: "NQTR",
                icon: <Image width={16} height={16} src='/nqtr.png' alt='NQTR' />,
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
                title: "Pixi’VN Json",
                icon: <Image width={16} height={16} src='/pixivn-json.svg' alt='Pixi’VN Json' />,
                description: "Json Integration",
                url: `${preUrl}/json`,
            },
            {
                title: "FAQ",
                description: "Frequently Asked Questions",
                url: `${preUrl}/faq`,
            },
        ],
    };
}
