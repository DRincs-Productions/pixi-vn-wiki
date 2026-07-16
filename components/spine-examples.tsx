"use client";

import type { SandpackFiles } from "@codesandbox/sandpack-react";
import { ReactTemplate } from "./sandpack";

function SpineExample({
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
          alias: "spineboySkeleton",
          src: "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/spineboy/export/spineboy-pro.skel",
        },
        {
          alias: "spineboyAtlas",
          src: "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/spineboy/export/spineboy-pma.atlas",
        },
            {
      alias: "goblinsSkeleton",
      src: "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/goblins/export/goblins-pro.skel",
    },
    {
      alias: "goblinsAtlas",
      src: "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/goblins/export/goblins-pma.atlas",
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
import { Spine } from "@drincs/pixi-vn-spine";

export const startLabel = newLabel("start", [
    async () => {
        await Assets.load(["spineboySkeleton", "spineboyAtlas"]);
        const spine = new Spine({
            atlas: "spineboyAtlas",
            skeleton: "spineboySkeleton",
            xAlign: 0.5,
            yAlign: 1,
            animation: "idle",
        });
        canvas.add("boy", spine);
    },
    () => {
        canvas.find<Spine>("spine")?.addAnimation("walk", { loop: true });
    },
]);`,
                ...files,
            }}
            previewHeight={previewHeight}
            dependencies={{
                "@drincs/pixi-vn-spine": "latest",
                "@esotericsoftware/spine-pixi-v8": "latest",
            }}
        />
    );
}

export function AnimationExample() {
    return (
        <SpineExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Spine } from "@drincs/pixi-vn-spine";

export const startLabel = newLabel("start", [
    async () => {
        await Assets.load(["spineboySkeleton", "spineboyAtlas"]);
        const spine = new Spine({
            atlas: "spineboyAtlas",
            skeleton: "spineboySkeleton",
            xAlign: 0.5,
            yAlign: 1,
            animation: "idle",
        });
        canvas.add("boy", spine);
    },
    () => {
        canvas.find<Spine>("spine")?.addAnimation("walk", { loop: true });
    },
]);`,
            }}
        />
    );
}

export function MotionExample() {
    return (
        <SpineExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Spine } from "@drincs/pixi-vn-spine";

export const startLabel = newLabel("start", [
  async () => {
    await Assets.load(["spineboySkeleton", "spineboyAtlas"]);
    const spine = new Spine({ atlas: "spineboyAtlas", skeleton: "spineboySkeleton", xAlign: 0, yAlign: 1 });
    spine.addAnimation("walk", { loop: true });
    canvas.add("spine", spine);
    canvas.animate(
      spine,
      [
        [{ xAlign: 1 }, { duration: 1, ease: "linear" }],
        [{ scaleX: -1 }, { duration: 0.2 }],
        [{ xAlign: 0 }, { duration: 1, ease: "linear" }],
        [{ scaleX: 1 }, { duration: 0.2 }],
      ],
      { repeat: Infinity },
    );
  },
]);`,
            }}
        />
    );
}

export function AnimationSequenceExample() {
    return (
        <SpineExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Spine } from "@drincs/pixi-vn-spine";

export const startLabel = newLabel("start", [
  async () => {
    await Assets.load(["spineboySkeleton", "spineboyAtlas"]);
    const spine = new Spine({ atlas: "spineboyAtlas", skeleton: "spineboySkeleton", xAlign: 0.5, yAlign: 1 });
    spine.playSequence([["idle", { loop: true, duration: 2 }], "jump"], {
      repeat: Infinity,
    });
    canvas.add("spine", spine);
  },
]);`,
            }}
        />
    );
}

export function SkinExample() {
    return (
        <SpineExample
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel } from "@drincs/pixi-vn";
import { Spine } from "@drincs/pixi-vn-spine";

export const startLabel = newLabel("start", [
    async () => {
        await Assets.load(["goblinsSkeleton", "goblinsAtlas"]);
        const spine = new Spine({
            atlas: "goblinsAtlas",
            skeleton: "goblinsSkeleton",
            skin: "goblin",
            xAlign: 0.5,
            yAlign: 1,
            animation: "walk",
        });
        canvas.add("goblin", spine);
    },
    () => {
        canvas.find<Spine>("goblin")?.setSkin("goblingirl");
    },
]);`,
            }}
        />
    );
}
