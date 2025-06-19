"use client";

import { ReactTemplate } from "./sandpack";

export function VisualNovelExample() {
    return <ReactTemplate />;
}

export function PerformanceExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, ImageSprite, newLabel, Sprite, TickerBase, tickerDecorator, TickerValue } from "@drincs/pixi-vn";

interface TintingTestTickerArgs {
  direction: number;
  turningSpeed: number;
  speed: number;
}

@tickerDecorator("TintingTestTicker")
export class TintingTestTicker extends TickerBase<TintingTestTickerArgs> {
  override fn(_t: TickerValue, args: TintingTestTickerArgs, aliases: string[]): void {
    aliases.forEach((alias) => {
      // create a bounding box for the little dudes
      const dudeBoundsPadding = 100;
      const dudeBoundsXY = -dudeBoundsPadding;
      let dudeBoundsWidth = canvas.screen.width + dudeBoundsPadding * 2;
      let dudeBoundsHeight = canvas.screen.height + dudeBoundsPadding * 2;

      let dude = canvas.find(alias);
      if (dude && dude instanceof Sprite) {
        args.direction += args.turningSpeed * 0.01;
        dude.x += Math.sin(args.direction) * args.speed;
        dude.y += Math.cos(args.direction) * args.speed;
        dude.rotation = -args.direction - Math.PI / 2;

        // wrap the dudes by testing their bounds...
        if (dude.x < dudeBoundsXY) {
          dude.x += dudeBoundsWidth;
        } else if (dude.x > dudeBoundsXY + dudeBoundsWidth) {
          dude.x -= dudeBoundsWidth;
        }

        if (dude.y < dudeBoundsXY) {
          dude.y += dudeBoundsHeight;
        } else if (dude.y > dudeBoundsXY + dudeBoundsHeight) {
          dude.y -= dudeBoundsHeight;
        }
      }
    });
  }
}

/**
 * https://pixijs.com/examples/basic/tinting
 */
export const startLabel = newLabel("start_label", [
  async () => {
    const totalDudes = 300;

    for (let i = 0; i < totalDudes; i++) {
      // create a new Sprite that uses the image name that we just generated as its source
      const dude = new ImageSprite({}, "eggHead");
      await dude.load();

      // set the anchor point so the texture is centered on the sprite
      dude.anchor.set(0.5);

      // set a random scale for the dude - no point them all being the same size!
      dude.scale.set(0.8 + Math.random() * 0.3);

      // finally lets set the dude to be at a random position..
      dude.x = Math.random() * canvas.screen.width;
      dude.y = Math.random() * canvas.screen.height;

      dude.tint = Math.random() * 0xffffff;

      let args: TintingTestTickerArgs = {
        direction: 0,
        turningSpeed: 0,
        speed: 0,
      };

      // create some extra properties that will control movement :
      // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
      args.direction = Math.random() * Math.PI * 2;

      // this number will be used to modify the direction of the dude over time
      args.turningSpeed = Math.random() - 0.8;

      // create a random speed for the dude between 2 - 4
      args.speed = 2 + Math.random() * 2;

      canvas.add("alien" + i, dude);
      canvas.addTicker("alien" + i, new TintingTestTicker(args));
    }
  },
]);`,
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
          alias: "eggHead",
          src: "https://pixijs.com/assets/eggHead.png",
        },
      ],
    },
  ],
};
export default manifest;`,
                "constants.ts": `export const HEIGHT = 1080;
export const WIDTH = 1920;`,
                "App.tsx": `export default function App() {
  return null;
}`,
            }}
        />
    );
}

export function CurrentDialogueExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { narration, newLabel } from "@drincs/pixi-vn";
import { eggHead } from "../values/characters";

// What is a Label? https://pixi-vn.web.app/start/labels.html
export const startLabel = newLabel("start_label", [
  () => {
    // in this example, not exists a character with id 'Alice'
    // so when you get the current dialogue, the character is a fake character with the name 'Alice'
    narration.dialogue = {
      character: "Alice",
      text: "Hello, world!",
    };
  },
  () => {
    // in this example, exists a character with id 'egg-head'
    // so when you get the current dialogue, the character is the character with id 'egg-head'
    narration.dialogue = {
      character: "egg-head",
      text: "Hello, world!",
    };
    // or better
    narration.dialogue = {
      character: eggHead,
      text: "Hello, world!",
    };
  },
  // if don't want to set a character, you can set a string
  () => (narration.dialogue = "Hello, world!"),
]);`,
                "values/characters.ts": `import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";

export const eggHead = new CharacterBaseModel("egg-head", {
  name: "Egg",
  surname: "Head",
  age: 25,
  icon: "https://pixijs.com/assets/eggHead.png",
  color: "#9e2e12",
});

RegisteredCharacters.add([eggHead]);`,
            }}
        />
    );
}

export function DialogueGlueExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { narration, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => {
    narration.dialogue = "Hello, my name is Alice and ...";
  },
  () => {
    narration.dialogGlue = true;
    narration.dialogue = "I am a character in this game.";
  },
]);`,
            }}
        />
    );
}

export function HeredityFactorExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import {
  canvas,
  moveIn,
  MoveTicker,
  newLabel,
  pushIn,
  Repeat,
  RotateTicker,
  showImage,
  showWithDissolve,
  showWithFade,
  zoomIn,
} from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("alien", "eggHead", { anchor: 0.5, align: 0 });

    canvas.addTicker(
      "alien",
      new RotateTicker({
        speed: 6,
      })
    );
    canvas.addTickersSequence("alien", [
      new MoveTicker({
        destination: { x: 0, y: 0, type: "align" },
        speed: 30,
      }),
      new MoveTicker({
        destination: { x: 0, y: 1, type: "align" },
        speed: 30,
      }),
      new MoveTicker({
        destination: { x: 1, y: 1, type: "align" },
        speed: 30,
      }),
      new MoveTicker({
        destination: { x: 1, y: 0, type: "align" },
        speed: 30,
      }),
      Repeat,
    ]);
  },
  async () => await showImage("alien", "flowerTop"),
  async () => await showWithDissolve("alien", "helmlok"),
  async () => await showWithFade("alien", "skully"),
  async () => await moveIn("alien", "eggHead", { speed: 100 }),
  async () => await zoomIn("alien", "flowerTop"),
  async () => await pushIn("alien", "helmlok", { speed: 100 }),
]);`,
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
          alias: "eggHead",
          src: "https://pixijs.com/assets/eggHead.png",
        },
        {
          alias: "flowerTop",
          src: "https://pixijs.com/assets/flowerTop.png",
        },
        {
          alias: "helmlok",
          src: "https://pixijs.com/assets/helmlok.png",
        },
        {
          alias: "skully",
          src: "https://pixijs.com/assets/skully.png",
        },
      ],
    },
  ],
};
export default manifest;`,
            }}
        />
    );
}
