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

export function MoveExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, MoveTicker, newLabel, Repeat, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("alien");
    canvas.addTickersSequence("alien", [
      new MoveTicker({
        destination: { x: 1, y: 0, type: "align" },
      }),
      new MoveTicker({
        destination: { x: 1, y: 1, type: "align" },
        speed: 50,
      }),
      new MoveTicker({
        destination: { x: 0, y: 0, type: "align" },
        speed: 20,
      }),
      Repeat,
    ]);
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
          alias: "alien",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function RotateExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, newLabel, Repeat, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
    canvas.addTickersSequence("alien", [
      new RotateTicker({}, 2),
      new RotateTicker(
        {
          clockwise: false,
          speed: 10,
        },
        3
      ),
      Repeat,
    ]);
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
          alias: "alien",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function FadeExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, FadeAlphaTicker, newLabel, Repeat, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
    canvas.addTickersSequence("alien", [
      new FadeAlphaTicker({}),
      new FadeAlphaTicker({
        type: "show",
      }),
      Repeat,
    ]);
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
          alias: "alien",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function ZoomExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, newLabel, Repeat, showImage, ZoomTicker } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
    canvas.addTickersSequence("alien", [
      new ZoomTicker({
        limit: 3,
      }),
      new ZoomTicker({
        type: "unzoom",
        limit: -3,
      }),
      Repeat,
    ]);
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
          alias: "alien",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function MirrorExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, newLabel, Repeat, showImage, ZoomTicker } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
    canvas.addTickersSequence("alien", [
      new ZoomTicker({
        type: "unzoom",
        limit: { x: -1, y: 0 },
        speed: { x: 5, y: 0 },
      }),
      new ZoomTicker({
        limit: 1,
        speed: { x: 10, y: 0 },
      }),
      Repeat,
    ]);
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
          alias: "alien",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function SpecialPropertiesExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, MoveTicker, newLabel, Repeat, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("alien");
    canvas.addTickersSequence("alien", [
      new MoveTicker({
        destination: { x: 1, y: 0, type: "align" },
        speedProgression: { type: "linear", amt: -1, limit: 20 },
      }),
      new MoveTicker({
        destination: { x: 0, y: 0, type: "align" },
        speedProgression: { type: "exponential", percentage: 0.05 },
      }),
      Repeat,
    ]);
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
          alias: "alien",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function ShakeExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { CANVAS_APP_GAME_LAYER_ALIAS, newLabel, shakeEffect, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("bg", "bg", { scale: 1.3 });
    await showImage("alien", "alien", { align: 0.5 });
    shakeEffect("alien");
  },
  async () => {
    shakeEffect(CANVAS_APP_GAME_LAYER_ALIAS);
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
          alias: "alien",
          src: "https://pixijs.com/assets/eggHead.png",
        },
        {
          alias: "bg",
          src: "https://pixijs.com/assets/bg_grass.jpg",
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

export function ShowImageContainerExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, MoveTicker, newLabel, showImageContainer } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    let james = await showImageContainer("james", ["m01-body", "m01-eyes", "m01-mouth"], {
      xAlign: 0.5,
      yAlign: 1,
    });
  },
  () => {
    canvas.removeAllTickers();
    let tickerId = canvas.addTicker("james", new MoveTicker({ destination: { x: 0, y: 1, type: "align" } }));
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
          alias: "m01-body",
          src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media",
        },
        {
          alias: "m01-eyes",
          src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media",
        },
        {
          alias: "m01-mouth",
          src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media",
        },
      ],
    },
  ],
};
export default manifest;`,
                "constants.ts": `export const HEIGHT = 1080;
export const WIDTH = 1920;`,
            }}
        />
    );
}

export function AddImageContainerExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { addImageCointainer, canvas, ImageContainer, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => {
    let james = addImageCointainer("james", ["m01-body", "m01-eyes", "m01-mouth"], {
      xAlign: 0.5,
      yAlign: 1,
    });
  },
  async () => {
    let james = canvas.find<ImageContainer>("james");
    james && (await james.load());
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
          alias: "m01-body",
          src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media",
        },
        {
          alias: "m01-eyes",
          src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media",
        },
        {
          alias: "m01-mouth",
          src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media",
        },
      ],
    },
  ],
};
export default manifest;`,
                "constants.ts": `export const HEIGHT = 1080;
export const WIDTH = 1920;`,
            }}
        />
    );
}

export function AddCanvasComponents() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const sprite = new Sprite();
    const texture = await Assets.load("egg_head");
    sprite.texture = texture;
    canvas.add("sprite", sprite);
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
          alias: "egg_head",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function GetCanvasComponents() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const sprite = new Sprite();
    const texture = await Assets.load("egg_head");
    sprite.texture = texture;
    canvas.add("sprite", sprite);
  },
  () => {
    const sprite = canvas.find("sprite");
    if (sprite) {
      sprite.x = 100;
      sprite.y = 100;
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
          alias: "egg_head",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function RemoveCanvasComponents() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const sprite = new Sprite();
    const texture = await Assets.load("egg_head");
    sprite.texture = texture;
    canvas.add("sprite", sprite);
  },
  () => {
    canvas.remove("sprite");
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
          alias: "egg_head",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function RemoveAllCanvasComponents() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const texture = await Assets.load("egg_head");
    for (let i = 0; i < 3; i++) {
      const sprite = new Sprite();
      sprite.texture = texture;
      sprite.x = i * 150;
      canvas.add(\`sprite\${i}\`, sprite);
    }
  },
  () => {
    canvas.removeAll();
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
          alias: "egg_head",
          src: "https://pixijs.com/assets/eggHead.png",
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

export function AddListenerGivenEvent() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, showImage } from "@drincs/pixi-vn";
import ButtonEvent from "../canvas/events/ButtonEvent";

export const startLabel = newLabel("start_label", [
  async () => {
    const bunny = await showImage("bunny", "bunny", {
      align: 0.5,
      anchor: 0.5,
    });
    // Opt-in to interactivity
    bunny.eventMode = "static";
    // Shows hand cursor
    bunny.cursor = "pointer";
    // Pointers normalize touch and mouse (good for mobile and desktop)
    bunny.onEvent("pointerdown", ButtonEvent);
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
      assets: [{ alias: "bunny", src: "https://pixijs.com/assets/bunny.png" }],
    },
  ],
};
export default manifest;`,
                "canvas/events/ButtonEvent.ts": `import { CanvasEvent, CanvasEventNamesType, eventDecorator, Sprite } from "@drincs/pixi-vn";

@eventDecorator()
export default class ButtonEvent extends CanvasEvent<Sprite> {
  override fn(event: CanvasEventNamesType, sprite: Sprite): void {
    switch (event) {
      case "pointerdown":
        sprite.scale.x *= 1.25;
        sprite.scale.y *= 1.25;
        break;
    }
  }
}`,
            }}
        />
    );
}
