import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { useMemo, type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const tree = useMemo<DocsLayoutProps["tree"]>(
        () => ({
            ...source.pageTree,
            children: [
                {
                    type: "separator",
                    name: "Introduction",
                },
                {
                    type: "folder",
                    name: "Why Pixi’VN?",
                    index: {
                        type: "page",
                        name: "Why Pixi’VN?",
                        url: "/start/why",
                    },
                    children: [
                        {
                            type: "page",
                            name: "Ren'Py vs Pixi’VN",
                            url: "/start/versus-renpy",
                        },
                    ],
                },
                {
                    type: "page",
                    name: "Quick Start",
                    url: "/start/getting-started",
                },
                {
                    type: "folder",
                    name: "Make your first",
                    defaultOpen: true,
                    children: [
                        {
                            type: "page",
                            name: "Visual Novel",
                            url: "/start/make-visual-novel",
                        },
                        {
                            type: "page",
                            name: "Point and Click adventure game",
                            url: "/start/make-point-and-click",
                        },
                        {
                            type: "page",
                            name: "RPG game",
                            url: "/start/make-rpg",
                        },
                        {
                            type: "page",
                            name: "Game Engine",
                            url: "/start/make-game-engine",
                        },
                    ],
                },
                {
                    type: "separator",
                    name: "First steps",
                },
                { type: "page", name: "Characters", url: "/start/character" },
                {
                    type: "folder",
                    name: "Narration",
                    defaultOpen: true,
                    index: {
                        type: "page",
                        name: "Narration",
                        url: "/start/narration",
                    },
                    children: [
                        { type: "page", name: "Narration with ink", url: "/ink/ink" },
                        { type: "page", name: "Narration with Ren’Py", url: "/renpy/renpy" },
                        {
                            type: "folder",
                            name: "Narration with JS/TS",
                            children: [
                                { type: "page", name: "Dialogue", url: "/start/dialogue" },
                                {
                                    type: "folder",
                                    name: "Label and Game Step",
                                    index: {
                                        type: "page",
                                        name: "Label and Game Step",
                                        url: "/start/labels",
                                    },
                                    children: [
                                        { type: "page", name: "Game flow with labels", url: "/start/labels-flow" },
                                        { type: "page", name: "Label features", url: "/start/labels-advanced" },
                                    ],
                                },
                                { type: "page", name: "Choice Menus", url: "/start/choices" },
                                { type: "page", name: "Input prompt", url: "/start/input" },
                                { type: "page", name: "History", url: "/start/history" },
                                { type: "page", name: "Translating", url: "/start/translate" },
                                {
                                    type: "folder",
                                    name: "Markup language (to add text style)",
                                    index: {
                                        type: "page",
                                        name: "Markup language (to add text style)",
                                        url: "/start/markup",
                                    },
                                    children: [
                                        { type: "page", name: "Markdown", url: "/start/markup-markdown" },
                                        { type: "page", name: "Tailwind CSS", url: "/start/markup-tailwindcss" },
                                    ],
                                },
                                { type: "page", name: "Other features", url: "/start/other-narrative-features" },
                            ],
                        },
                    ],
                },
                {
                    type: "folder",
                    name: "PixiJS Canvas",
                    index: {
                        type: "page",
                        name: "PixiJS Canvas",
                        url: "/start/canvas",
                    },
                    children: [
                        { type: "page", name: "Canvas alias", url: "/start/canvas-alias" },
                        {
                            type: "folder",
                            name: "Canvas Components",
                            index: {
                                type: "page",
                                name: "Canvas Components",
                                url: "/start/canvas-components",
                            },
                            children: [
                                { type: "page", name: "ImageSprite", url: "/start/canvas-images" },
                                { type: "page", name: "ImageContainer", url: "/start/canvas-image-container" },
                                { type: "page", name: "VideoSprite", url: "/start/canvas-videos" },
                                { type: "page", name: "Filters", url: "/start/canvas-filters" },
                                { type: "page", name: "Lights", url: "/start/canvas-lights" },
                                { type: "page", name: "Spine 2D", url: "/start/canvas-spine2d" },
                                { type: "page", name: "Three.js", url: "/start/canvas-threejs" },
                            ],
                        },
                        { type: "page", name: "Components functions", url: "/start/canvas-functions" },
                        { type: "page", name: "Position properties", url: "/start/canvas-position" },
                        { type: "page", name: "Transitions", url: "/start/canvas-transition" },
                        {
                            type: "folder",
                            name: "Animations and Effects",
                            index: {
                                type: "page",
                                name: "Animations and Effects",
                                url: "/start/canvas-animations-effects",
                            },
                            children: [
                                {
                                    type: "folder",
                                    name: "Primitives (ticker)",
                                    index: {
                                        type: "page",
                                        name: "Primitives (ticker)",
                                        url: "/start/canvas-tickers",
                                    },
                                    children: [
                                        {
                                            type: "page",
                                            name: "Tickers methods",
                                            url: "/start/canvas-tickers-functions",
                                        },
                                    ],
                                },
                                {
                                    type: "page",
                                    name: "Articulated",
                                    url: "/start/canvas-articulated-animations-effects",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "page",
                    name: "Sounds and Music",
                    url: "/start/sound",
                },
                {
                    type: "folder",
                    name: "Assets",
                    index: {
                        type: "page",
                        name: "Assets",
                        url: "/start/assets",
                    },
                    children: [
                        {
                            type: "page",
                            name: "Assets management",
                            url: "/start/assets-management",
                        },
                    ],
                },
                {
                    type: "folder",
                    name: "Game storage",
                    index: {
                        type: "page",
                        name: "Game storage",
                        url: "/start/storage",
                    },
                    children: [
                        {
                            type: "page",
                            name: "Flags Management",
                            url: "/start/flags",
                        },
                        {
                            type: "page",
                            name: "Stored Classes",
                            url: "/start/stored-classes",
                        },
                    ],
                },
                {
                    type: "folder",
                    name: "UI with JavaScript Framework",
                    index: {
                        type: "page",
                        name: "UI with JavaScript Framework",
                        url: "/start/interface",
                    },
                    children: [
                        {
                            type: "folder",
                            name: "JavaScript Frameworks",
                            defaultOpen: true,
                            children: [
                                {
                                    type: "page",
                                    name: "Angular UI",
                                    url: "/start/interface-angular",
                                },
                                {
                                    type: "page",
                                    name: "React UI",
                                    url: "/start/interface-react",
                                },
                                {
                                    type: "page",
                                    name: "Vue UI",
                                    url: "/start/interface-vue",
                                },
                            ],
                        },
                        {
                            type: "page",
                            name: "Navigate/switch between UI screens",
                            url: "/start/interface-navigate",
                        },
                        {
                            type: "page",
                            name: "Connect the UI with the storage",
                            url: "/start/interface-connect-storage",
                        },
                    ],
                },
                {
                    type: "page",
                    name: "Save and Load",
                    url: "/start/save",
                },
                {
                    type: "folder",
                    name: "Distribution",
                    url: "/start/distribution",
                    children: [
                        {
                            type: "page",
                            name: "Website distribution",
                            url: "/start/distribution-website",
                        },
                        {
                            type: "page",
                            name: "Desktop & mobile devices",
                            url: "/start/distribution-desktop-mobile",
                        },
                        {
                            type: "page",
                            name: "itch.io",
                            url: "/start/distribution-itchio",
                        },
                    ],
                },
            ],
        }),
        []
    );
    return (
        <DocsLayout tree={tree} {...baseOptions}>
            {children}
        </DocsLayout>
    );
}
