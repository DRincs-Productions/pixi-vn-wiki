"use client";

import { SandpackFiles } from "@codesandbox/sandpack-react";
import { ReactTemplate } from "./sandpack";

function SpineExample({ files, previewHeight = 400 }: { files?: SandpackFiles; previewHeight?: number }) {
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
          src: "https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pro.skel",
        },
        {
          alias: "spineboyAtlas",
          src: "https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pma.atlas",
        },
      ],
    },
  ],
};
export default manifest;`,
                ...files,
            }}
            previewHeight={previewHeight}
            dependencies={{
                "@drincs/pixi-vn-spine": "^0.2.0",
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
    await Assets.load("spineboySkeleton", "spineboyAtlas");
    const spine = new Spine({ atlas: "spineboyAtlas", skeleton: "spineboySkeleton", xAlign: 0.5, yAlign: 1 });
    spine.addAnimation("idle", { loop: true });
    canvas.add("spine", spine);
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
    await Assets.load("spineboySkeleton", "spineboyAtlas");
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
    await Assets.load("spineboySkeleton", "spineboyAtlas");
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
