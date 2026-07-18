"use client";

import type { SandpackFiles } from "@codesandbox/sandpack-react";
import { ReactTemplate } from "./sandpack";

export function Live2DExample({
    files,
    previewHeight = 400,
}: {
    files?: SandpackFiles;
    previewHeight?: number;
}) {
    return (
        <ReactTemplate
            files={{
                "assets/manifest.ts": `import { AssetsManifest } from "@drincs/pixi-vn";

/**
 * Manifest for the assets used in the game.
 * You can read more about the manifest here: https://pixijs.com/8.x/guides/components/assets#loading-multiple-assets
 */
const manifest: AssetsManifest = {
    bundles: [
        {
            name: "start",
            assets: [
                {
                    alias: "shizuku",
                    src: "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json",
                },
            ],
        },
    ],
};
export default manifest;`,
                "constants.ts": `export const HEIGHT = 1080;
export const WIDTH = 1920;
export const BACKGROUND_COLOR = "#303030";`,
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Live2D } from "@drincs/pixi-vn-live2d";

export const startLabel = newLabel("start", [
    async () => {
        const live2d = new Live2D({
            source: "shizuku",
            xAlign: 0.5,
            yAlign: 1,
            scale: 0.5,
        });
        await live2d.ready;
        canvas.add("shizuku", live2d);
    },
]);`,
                "public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pixi’VN</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/live2dcubismcore@1.0.2/live2dcubismcore.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/live2dcubismcore@1.0.2/live2d.min.js"></script>
    <div id="root"></div>
  </body>
</html>
`,
                "labels/index.ts": `
import { extensions } from "pixi.js";
import { Live2DPlugin } from "untitled-pixi-live2d-engine/cubism";
extensions.add(Live2DPlugin);

import "./startLabel";
`,
                "index.tsx": `import { Assets, Container, Game, canvas, sound } from "@drincs/pixi-vn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BACKGROUND_COLOR, HEIGHT, WIDTH } from "./constants";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./hooks/useQueryInterface";
import "./styles.css";
import { defineAssets } from "./utils/assets-utility";

// Canvas setup with PIXI
const body = document.body;
if (!body) {
    throw new Error("body element not found");
}

async function loadScript(src: string) {
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

Game.init(body, {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: BACKGROUND_COLOR,
}).then(async () => {
    // Pixi.JS UI Layer
    canvas.addLayer("ui", new Container());

    // Sound setup
    sound.addChannel("bgm", { background: true });
    sound.addChannel("sfx");
    sound.defaultChannelAlias = "sfx";

    // React setup with ReactDOM
    const root = document.getElementById("root");
    if (!root) {
        throw new Error("root element not found");
    }

    const htmlLayout = canvas.addHtmlLayer("ui", root);
    if (!htmlLayout) {
        throw new Error("htmlLayout not found");
    }
    const reactRoot = createRoot(htmlLayout);
    const queryClient = new QueryClient();

    Game.onEnd(async () => {
        await Game.start("start", {});
    });
    Game.onLoadingLabel(async (_stepId, { id }) => await Assets.backgroundLoadBundle(id));

    reactRoot.render(
        <div
            style={{
                color: "white",
                position: "absolute",
                bottom: 0,
                left: 0,
            }}
        >
            Loading...
        </div>,
    );

    await loadScript(
  "https://cdn.jsdelivr.net/npm/live2dcubismcore@1.0.2/live2dcubismcore.min.js"
);

await loadScript(
  "https://cdn.jsdelivr.net/npm/live2dcubismcore@1.0.2/live2d.min.js"
);

await import("./labels");

    defineAssets().then(() => {
        Game.start("start", {}).then(() => {
            reactRoot.render(
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>,
            );
            queryClient.invalidateQueries({
                queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
            });
        });
    });
});`,
                ...files,
            }}
            previewHeight={previewHeight}
            dependencies={{
                "@drincs/pixi-vn-live2d": "latest",
                "untitled-pixi-live2d-engine": "latest",
            }}
        />
    );
}

export function MotionExample() {
    return (
        <Live2DExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Live2D } from "@drincs/pixi-vn-live2d";

export const startLabel = newLabel("start", [
    async () => {
        const live2d = new Live2D({
            source: "shizuku",
            xAlign: 0.5,
            yAlign: 1,
            scale: 0.5,
        });
        await live2d.ready;
        canvas.add("shizuku", live2d);
    },
    () => {
        canvas.find<Live2D>("shizuku")?.motion("tap_body");
    },
]);`,
            }}
        />
    );
}

export function ExpressionExample() {
    return (
        <Live2DExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Live2D } from "@drincs/pixi-vn-live2d";

export const startLabel = newLabel("start", [
    async () => {
        const live2d = new Live2D({
            source: "shizuku",
            xAlign: 0.5,
            yAlign: 1,
            scale: 0.5,
        });
        await live2d.ready;
        canvas.add("shizuku", live2d);
    },
    () => {
        canvas.find<Live2D>("shizuku")?.expression("f01");
    },
]);`,
            }}
        />
    );
}

export function PixiMotionExample() {
    return (
        <Live2DExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Live2D } from "@drincs/pixi-vn-live2d";

export const startLabel = newLabel("start", [
    async () => {
        const live2d = new Live2D({
            source: "shizuku",
            xAlign: 0.3,
            yAlign: 1,
            scale: 0.5,
        });
        await live2d.ready;
        canvas.add("shizuku", live2d);
        canvas.animate(
            live2d,
            [
                [{ x: canvas.width * 0.7 }, { duration: 2, ease: "linear" }],
                [{ x: canvas.width * 0.3 }, { duration: 2, ease: "linear" }],
            ],
            { repeat: Infinity },
        );
    },
]);`,
            }}
        />
    );
}

export function StopMotionsExample() {
    return (
        <Live2DExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Live2D } from "@drincs/pixi-vn-live2d";

export const startLabel = newLabel("start", [
    async () => {
        const live2d = new Live2D({
            source: "shizuku",
            xAlign: 0.5,
            yAlign: 1,
            scale: 0.5,
        });
        await live2d.ready;
        canvas.add("shizuku", live2d);
        live2d.motion("tap_body");
    },
    () => {
        canvas.find<Live2D>("shizuku")?.stopMotions();
    },
]);`,
            }}
        />
    );
}
