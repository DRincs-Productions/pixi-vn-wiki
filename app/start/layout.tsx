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
                    name: "Getting Started",
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
                { name: "Getting Started", url: "/start/getting-started" },
                {
                    name: "Make your first",
                    children: [
                        { name: "Visual Novel", url: "/start/make-visual-novel" },
                        { name: "Point and Click adventure game", url: "/start/make-point-and-click" },
                        { name: "RPG game", url: "/start/make-rpg" },
                        { name: "Game Engine", url: "/start/make-game-engine" },
                    ],
                },
                {
                    name: "First steps",
                    children: [
                        { name: "Characters", url: "/start/character" },
                        {
                            name: "Narration",
                            url: "/start/narration",
                            children: [
                                { name: "Narration with ink", url: "/ink/ink" },
                                { name: "Narration with Ren’Py", url: "/renpy/renpy" },
                                {
                                    name: "Narration with JS/TS",
                                    collapsed: true,
                                    children: [
                                        { name: "Dialogue", url: "/start/dialogue" },
                                        {
                                            name: "Label and Game Step",
                                            url: "/start/labels",
                                            children: [
                                                { name: "Game flow with labels", url: "/start/labels-flow" },
                                                { name: "Label features", url: "/start/labels-advanced" },
                                            ],
                                        },
                                        { name: "Choice Menus", url: "/start/choices" },
                                        { name: "Input prompt", url: "/start/input" },
                                        { name: "History", url: "/start/history" },
                                        { name: "Translating", url: "/start/translate" },
                                        {
                                            name: "Markup language (to add text style)",
                                            url: "/start/markup",
                                            collapsed: true,
                                            children: [
                                                { name: "Markdown", url: "/start/markup-markdown" },
                                                { name: "Tailwind CSS", url: "/start/markup-tailwindcss" },
                                            ],
                                        },
                                        { name: "Other features", url: "/start/other-narrative-features" },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "PixiJS Canvas",
                            url: "/start/canvas",
                            collapsed: true,
                            children: [
                                { name: "Initialize", url: "/start/canvas-initialize" },
                                { name: "Canvas alias", url: "/start/canvas-alias" },
                                {
                                    name: "Canvas Components",
                                    url: "/start/canvas-components",
                                    collapsed: true,
                                    children: [
                                        { name: "ImageSprite", url: "/start/canvas-images" },
                                        { name: "ImageContainer", url: "/start/canvas-image-container" },
                                        { name: "VideoSprite", url: "/start/canvas-videos" },
                                        { name: "Filters", url: "/start/canvas-filters" },
                                        { name: "Lights", url: "/start/canvas-lights" },
                                        { name: "Spine 2D", url: "/start/canvas-spine2d" },
                                        { name: "Three.js", url: "/start/canvas-threejs" },
                                    ],
                                },
                                { name: "Components functions", url: "/start/canvas-functions" },
                                { name: "Position properties", url: "/start/canvas-position" },
                                { name: "Transitions", url: "/start/canvas-transition" },
                                {
                                    name: "Animations and Effects",
                                    url: "/start/canvas-animations-effects",
                                    collapsed: true,
                                    children: [
                                        {
                                            name: "Primitives (ticker)",
                                            url: "/start/canvas-tickers",
                                            children: [
                                                {
                                                    name: "Tickers methods",
                                                    url: "/start/canvas-tickers-functions",
                                                },
                                            ],
                                        },
                                        {
                                            name: "Articulated",
                                            url: "/start/canvas-articulated-animations-effects",
                                        },
                                    ],
                                },
                            ],
                        },
                        { name: "Sounds and Music", url: "/start/sound" },
                        {
                            name: "Assets",
                            url: "/start/assets",
                            collapsed: true,
                            children: [{ name: "Assets management", url: "/start/assets-management" }],
                        },
                        {
                            name: "Game storage",
                            url: "/start/storage",
                            collapsed: true,
                            children: [
                                { name: "Flags Management", url: "/start/flags" },
                                { name: "Stored Classes", url: "/start/stored-classes" },
                            ],
                        },
                        {
                            name: "UI with JavaScript Framework",
                            url: "/start/interface",
                            collapsed: true,
                            children: [
                                {
                                    name: "JavaScript Frameworks",
                                    children: [
                                        { name: "Angular UI", url: "/start/interface-angular" },
                                        { name: "React UI", url: "/start/interface-react" },
                                        { name: "Vue UI", url: "/start/interface-vue" },
                                    ],
                                },
                                {
                                    name: "Navigate/switch between UI screens",
                                    url: "/start/interface-navigate",
                                },
                                {
                                    name: "Connect the UI with the storage",
                                    url: "/start/interface-connect-storage",
                                },
                            ],
                        },
                        { name: "Save and Load", url: "/start/save" },
                        {
                            name: "Distribution",
                            url: "/start/distribution",
                            collapsed: true,
                            children: [
                                { name: "Website distribution", url: "/start/distribution-website" },
                                {
                                    name: "Desktop & mobile devices",
                                    url: "/start/distribution-desktop-mobile",
                                },
                            ],
                        },
                    ],
                },
            ],
            "/ink/": [
                {
                    name: "ink",
                    children: [
                        {
                            name: "Narration with ink",
                            url: "/ink/ink",
                            children: [
                                { name: "Characters", url: "/ink/ink-character" },
                                { name: "Open a knot", url: "/ink/ink-label" },
                                { name: "Variables", url: "/ink/ink-variables" },
                                { name: "Markup language (to add text style)", url: "/ink/ink-markup" },
                                { name: "Input prompt", url: "/ink/ink-input" },
                                { name: "Canvas", url: "/ink/ink-canvas" },
                                { name: "Sounds and Music", url: "/ink/ink-sound" },
                                { name: "Assets management", url: "/ink/ink-assets" },
                                { name: "Pause", url: "/ink/ink-pause" },
                                { name: "Text replacement", url: "/ink/ink-replacement" },
                                { name: "Translating", url: "/ink/ink-translate" },
                                { name: "Custom Hashtag Script", url: "/ink/ink-hashtag" },
                            ],
                        },
                        { name: "Back", url: "/start/narration" },
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
