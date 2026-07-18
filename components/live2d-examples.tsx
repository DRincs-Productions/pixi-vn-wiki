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
                "labels/index.ts": `import { extensions } from "pixi.js";
import { Live2DPlugin } from "untitled-pixi-live2d-engine/cubism";
extensions.add(Live2DPlugin);

import "./startLabel";
`,
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
