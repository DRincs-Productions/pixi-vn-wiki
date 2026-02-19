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
export const WIDTH = 1920;
export const BACKGROUND_COLOR = "#303030";`,
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
                "labels/startLabel.ts": `import { canvas, moveIn, newLabel, pushIn, showImage, showWithDissolve, showWithFade, zoomIn } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const alien = await showImage("alien", "eggHead", { anchor: 0.5, align: 0.5 });

    canvas.animate(
      alien,
      {
        angle: 360,
      },
      {
        duration: 5,
        repeat: Infinity,
      }
    );
    canvas.animate(
      alien,
      { xAlign: [0, 1, 1, 0, 0], yAlign: [0, 0, 1, 1, 0] },
      {
        repeat: Infinity,
        duration: 10,
      }
    );
  },
  async () => await showImage("alien", "flowerTop"),
  async () => await showWithDissolve("alien", "helmlok"),
  async () => await showWithFade("alien", "skully"),
  async () => await moveIn("alien", "eggHead", { removeOldComponentWithMoveOut: true }),
  async () => await zoomIn("alien", "flowerTop", { removeOldComponentWithZoomOut: true }),
  async () => await pushIn("alien", "helmlok"),
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
                "labels/startLabel.ts": `import { canvas, ImageSprite, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const alien = await showImage("alien");
    canvas.animate(alien, { xAlign: 1, yAlign: 0 }, { ease: "easeOut" });
  },
  () => canvas.animate<ImageSprite>("alien", { xAlign: 1, yAlign: 1 }, { ease: "backOut" }),
  () => canvas.animate<ImageSprite>("alien", { xAlign: 0, yAlign: 1 }, { ease: "circIn" }),
  () => canvas.animate<ImageSprite>("alien", { xAlign: 0, yAlign: 0 }, { ease: "linear" }),
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
                "labels/startLabel.ts": `import { canvas, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const alien = await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
    canvas.animate(alien, { angle: 360 }, { duration: 1, type: "spring", repeat: Infinity, repeatDelay: 0.2 });
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
                "labels/startLabel.ts": `import { canvas, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const alien = await showImage("alien", "alien", { align: 0.5, anchor: 0.5, alpha: 0 });
        canvas.animate(alien, { alpha: 1 }, { ease: "linear", duration: 1 });
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
                "labels/startLabel.ts": `import { canvas, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const alien = await showImage("alien", "alien", { align: 0.5, anchor: 0.5, scale: 0 });
    canvas.animate(alien, { scaleX: 1, scaleY: 1 }, { ease: "circInOut", duration: 1 });
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
                "labels/startLabel.ts": `import { canvas, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const alien = await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
    canvas.animate(alien, { scaleX: -1 });
  },
  () => canvas.animate("alien", { scaleX: 1 }),
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
    let tickerId = canvas.animate<ImageContainer>("james", { xAlign: 0, yAlign: 1 });
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
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
        },
        {
          alias: "m01-eyes",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
        },
        {
          alias: "m01-mouth",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
        },
      ],
    },
  ],
};
export default manifest;`,
                "constants.ts": `export const HEIGHT = 1080;
export const WIDTH = 1920;
export const BACKGROUND_COLOR = "#303030";`,
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
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
        },
        {
          alias: "m01-eyes",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
        },
        {
          alias: "m01-mouth",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
        },
      ],
    },
  ],
};
export default manifest;`,
                "constants.ts": `export const HEIGHT = 1080;
export const WIDTH = 1920;
export const BACKGROUND_COLOR = "#303030";`,
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
import { buttonEvent } from "../canvas/events";

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
    bunny.on("pointerdown", buttonEvent); // [!code focus]
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
                "canvas/events.ts": `import { AllFederatedEventMap } from "@drincs/pixi-vn/pixi.js";
import { eventDecorator, Sprite } from "@drincs/pixi-vn";

@eventDecorator()
export function buttonEvent(event: AllFederatedEventMap, sprite: Sprite): void {
    switch (event) {
      case "pointerdown":
        sprite.scale.x *= 1.25;
        sprite.scale.y *= 1.25;
        break;
  }
}`,
            }}
        />
    );
}

export function ReturningDifferentStepLists() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { narration, newLabel, storage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", () => {
  let condition = storage.getFlag("condition");
  if (condition) {
    return [
      () => {
        narration.dialogue = "Step 2";
      },
      () => {
        narration.dialogue = "Restart";
      },
    ];
  } else {
    return [
      () => {
        narration.dialogue = "Step 1";
      },
      async (props, { labelId }) => {
        storage.setFlag("condition", true);
        return await narration.jump(labelId, props);
      },
    ];
  }
});`,
            }}
        />
    );
}

export function ChoiceMenus() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { narration, newChoiceOption, newCloseChoiceOption, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    narration.dialogue = "Choose a fruit:";
    narration.choices = [
      newChoiceOption("Orange", orangeLabel, {}), // by default, the label will be called by call
      newChoiceOption("Banana", bananaLabel, {}, { type: "jump" }),
      newChoiceOption("Apple", appleLabel, { quantity: 5 }, { type: "call" }),
      newCloseChoiceOption("Cancel"),
    ];
  },
  () => {
    narration.dialogue = "Restart";
  },
  async (props) => await narration.jump("start_label", props),
]);

const appleLabel = newLabel<{ quantity: number }>("AppleLabel", [
  (props) => {
    narration.dialogue = \`You have \${props?.quantity ?? 0} apples\`;
  },
]);
const orangeLabel = newLabel("OrangeLabel", [
  () => {
    narration.dialogue = "You have an orange";
  },
]);
const bananaLabel = newLabel("BananaLabel", [
  () => {
    narration.dialogue = "You have a banana";
  },
]);`,
            }}
        />
    );
}

export function InputPrompt() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { narration, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => {
    narration.dialogue = "Hello";
  },
  () => {
    narration.dialogue = "What is your name?";
    narration.requestInput({ type: "string" });
  },
  () => {
    narration.dialogue = \`My name is \${narration.inputValue}\`;
  },
  () => {
    narration.dialogue = "How old are you?";
    narration.requestInput({ type: "number" }, 18);
  },
  () => {
    narration.dialogue = \`I am \${narration.inputValue} years old\`;
  },
  () => {
    narration.dialogue = "Describe who you are:";
    narration.requestInput({ type: "html textarea" });
  },
  () => {
    narration.dialogue = \`\${narration.inputValue}\`;
  },
  () => {
    narration.dialogue = "Restart";
  },
]);`,
            }}
        />
    );
}

export function SequenceExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const alien = await showImage("alien");
    canvas.animate(
      alien,
      {
        xAlign: [0, 1, 1, 0, 0],
        yAlign: [0, 0, 1, 1, 0],
      },
      { repeat: Infinity, duration: 10 }
    );
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

export function MotionSequenceExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    const alien = await showImage("alien");
    canvas.animate(
      alien,
      [
        [{ xAlign: 0, yAlign: 0 }, { ease: "circInOut" }],
        [{ xAlign: 1, yAlign: 0 }, { ease: "backInOut" }],
        [{ xAlign: 1, yAlign: 1 }, { ease: "linear" }],
        [{ xAlign: 0, yAlign: 1 }, { ease: "anticipate" }],
        [{ xAlign: 0, yAlign: 0 }, { ease: "easeOut" }],
      ],
      { repeat: 10, duration: 10 }
    );
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

export function DissolveTransitionExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, removeWithDissolve, showWithDissolve } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showWithDissolve("alien", "egg_head");
    await showWithDissolve("human", {
      value: ["m01-body", "m01-eyes", "m01-mouth"],
      options: { scale: 0.5, xAlign: 0.7 },
    });
  },
  async () => {
    await showWithDissolve("alien", "flower_top");
    removeWithDissolve("human");
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
        {
          alias: "flower_top",
          src: "https://pixijs.com/assets/flowerTop.png",
        },
        {
          alias: "m01-body",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
        },
        {
          alias: "m01-eyes",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
        },
        {
          alias: "m01-mouth",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
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

export function FadeTransitionExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, removeWithFade, showWithFade } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showWithFade("alien", "egg_head", { duration: 5 }); // [!code focus]
        await showWithFade("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await showWithFade("alien", "flower_top"); // [!code focus]
        removeWithFade("human"); // [!code focus]
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
                {
                    alias: "flower_top",
                    src: "https://pixijs.com/assets/flowerTop.png",
                },
                {
                    alias: "m01-body",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
                },
                {
                    alias: "m01-eyes",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
                },
                {
                    alias: "m01-mouth",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
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

export function MoveinTransitionExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { moveIn, moveOut, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await moveIn("alien", "egg_head", { direction: "up" }); // [!code focus]
        await moveIn("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await moveIn("alien", "flower_top", { direction: "up" }); // [!code focus]
        moveOut("human"); // [!code focus]
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
                {
                    alias: "flower_top",
                    src: "https://pixijs.com/assets/flowerTop.png",
                },
                {
                    alias: "m01-body",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
                },
                {
                    alias: "m01-eyes",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
                },
                {
                    alias: "m01-mouth",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
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

export function PushinTransitionExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, pushIn, pushOut } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await pushIn("alien", "egg_head"); // [!code focus]
        await pushIn("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await pushIn("alien", "flower_top", { direction: "up" }); // [!code focus]
        pushOut("human"); // [!code focus]
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
                {
                    alias: "flower_top",
                    src: "https://pixijs.com/assets/flowerTop.png",
                },
                {
                    alias: "m01-body",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
                },
                {
                    alias: "m01-eyes",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
                },
                {
                    alias: "m01-mouth",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
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

export function ZoominTransitionExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, zoomIn, zoomOut } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await zoomIn("alien", "egg_head"); // [!code focus]
        await zoomIn("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await zoomIn("alien", "flower_top"); // [!code focus]
        zoomOut("human"); // [!code focus]
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
                {
                    alias: "flower_top",
                    src: "https://pixijs.com/assets/flowerTop.png",
                },
                {
                    alias: "m01-body",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
                },
                {
                    alias: "m01-eyes",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
                },
                {
                    alias: "m01-mouth",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
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

export function PositionwithpercentageExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("egg_head", "egg_head", {
      percentagePosition: 0.5,
      anchor: 0.5,
    });
    await showImage("flower_top", "flower_top", {
      percentagePosition: 0,
    });
    await showImage("panda", "panda", {
      percentageX: 1,
      percentageY: 0,
      anchor: { x: 1, y: 0 },
    });
    await showImage("skully", "skully", {
      percentageX: 0,
      percentageY: 1,
      anchor: { x: 0, y: 1 },
    });
    await showImage("helmlok", "helmlok", {
      percentagePosition: 1,
      anchor: 1,
    });
    await showImage("bunny", "bunny", {
      percentageX: 0.5,
      percentageY: 1,
      anchor: { x: 0.5, y: 1 },
    });
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
        { alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" },
        { alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" },
        { alias: "panda", src: "https://pixijs.com/assets/panda.png" },
        { alias: "skully", src: "https://pixijs.com/assets/skully.png" },
        { alias: "helmlok", src: "https://pixijs.com/assets/helmlok.png" },
        { alias: "bunny", src: "https://pixijs.com/assets/bunny.png" },
      ],
    },
  ],
};
export default manifest;`,
            }}
        />
    );
}

export function AlignExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("egg_head", "egg_head", { align: 0.5 });
    await showImage("flower_top", "flower_top", { align: 0 });
    await showImage("panda", "panda", { xAlign: 1, yAlign: 0 });
    await showImage("skully", "skully", { xAlign: 0, yAlign: 1 });
    await showImage("helmlok", "helmlok", { align: 1 });
    await showImage("bunny", "bunny", { xAlign: 0.5, yAlign: 1 });
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
        { alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" },
        { alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" },
        { alias: "panda", src: "https://pixijs.com/assets/panda.png" },
        { alias: "skully", src: "https://pixijs.com/assets/skully.png" },
        { alias: "helmlok", src: "https://pixijs.com/assets/helmlok.png" },
        { alias: "bunny", src: "https://pixijs.com/assets/bunny.png" },
      ],
    },
  ],
};
export default manifest;`,
            }}
        />
    );
}

export function ImageSpriteShow() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    let alien1 = await showImage("alien");
    let alien2 = await showImage("alien2", "alien", {
      xAlign: 0.5,
    });
    let alien3 = await showImage("alien3", "https://pixijs.com/assets/eggHead.png", {
      xAlign: 1,
    });
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

export function ImageSpriteAdd() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { addImage, canvas, ImageSprite, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => {
    let alien1 = addImage("alien");
    let alien2 = addImage("alien2", "alien", {
      xAlign: 0.5,
    });
    let alien3 = addImage("alien3", "https://pixijs.com/assets/eggHead.png", {
      xAlign: 1,
    });
  },
  async () => {
    let alien1 = canvas.find<ImageSprite>("alien");
    let alien2 = canvas.find<ImageSprite>("alien2");
    let alien3 = canvas.find<ImageSprite>("alien3");
    // Load the textures
    alien1 && (await alien1.load());
    alien2 && (await alien2.load());
    alien3 && (await alien3.load());
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

export function VideoSpriteShow() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, showVideo } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    let video1 = await showVideo("video");
    let video2 = await showVideo("video2", "video", {
      xAlign: 0.5,
    });
    let video3 = await showVideo("video3", "https://pixijs.com/assets/video.mp4", {
      xAlign: 1,
    });
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
          alias: "video",
          src: "https://pixijs.com/assets/video.mp4",
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

export function VideoSpriteAdd() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { addVideo, canvas, newLabel, VideoSprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => {
    let video1 = addVideo("video");
    let video2 = addVideo("video2", "video", {
      xAlign: 0.5,
    });
    let video3 = addVideo("video3", "https://pixijs.com/assets/video.mp4", {
      xAlign: 1,
    });
  },
  async () => {
    let video1 = canvas.find<VideoSprite>("video");
    let video2 = canvas.find<VideoSprite>("video2");
    let video3 = canvas.find<VideoSprite>("video3");
    // Load the textures
    video1 && (await video1.load());
    video2 && (await video2.load());
    video3 && (await video3.load());
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
          alias: "video",
          src: "https://pixijs.com/assets/video.mp4",
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

export function VideoSpritePlayPause() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, narration, newLabel, showVideo, VideoSprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    narration.dialogue = "add video";
    await showVideo("video");
  },
  async () => {
    narration.dialogue = "pause video";
    let video = canvas.find<VideoSprite>("video");
    if (video) {
      video.pause();
      // or: video.paused = true
    }
  },
  async () => {
    narration.dialogue = "resume video";
    let video = canvas.find<VideoSprite>("video");
    if (video) {
      video.play();
      // or: video.paused = false
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
          alias: "video",
          src: "https://pixijs.com/assets/video.mp4",
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

export function VideoSpriteLooping() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, showVideo } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    let video = await showVideo("video");
    video.loop = true;
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
          alias: "video",
          src: "https://pixijs.com/assets/video.mp4",
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

export function VideoSpriteRestart() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, narration, newLabel, showVideo, VideoSprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        narration.dialogue = "add video";
        await showVideo("video");
    },
    async () => {
        narration.dialogue = "restart video";
        let video = canvas.find<VideoSprite>("video");
        if (video) {
            video.restart(); 
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
          alias: "video",
          src: "https://pixijs.com/assets/video.mp4",
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

export function TextCanvas() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel, showText } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    let text = await showText("text", "Hello World!", {
      xAlign: 0.5,
      yAlign: 0.5,
    });
    text.style.fontSize = 30;
  },
]);`,
                "constants.ts": `export const HEIGHT = 480;
export const WIDTH = 720;
export const BACKGROUND_COLOR = "#b3b3b3b3";`,
            }}
        />
    );
}

export function TextCanvasStyle() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { canvas, newLabel, Text, TextStyle } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => {
    const skewStyle = new TextStyle({
      fontFamily: "Arial",
      dropShadow: {
        alpha: 0.8,
        angle: 2.1,
        blur: 4,
        color: "0x111111",
        distance: 10,
      },
      fill: "#ffffff",
      stroke: { color: "#004620", width: 12, join: "round" },
      fontSize: 60,
      fontWeight: "lighter",
    });

    const skewText = new Text({
      text: "SKEW IS COOL",
      style: skewStyle,
      align: 0.5,
      skew: { x: 0.65, y: -0.3 },
    });

    canvas.add("text", skewText);
  },
]);`,
            }}
        />
    );
}

export function ChoicesAlreadyMade() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { narration, newChoiceOption, newCloseChoiceOption, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    narration.dialogue = "Choose a fruit:";
    narration.choices = [
      newChoiceOption("Orange", startLabel, {}, { type: "jump" }), // by default, the label will be called with "call"
      newChoiceOption("Banana", startLabel, {}, { type: "jump" }),
      newChoiceOption("Apple", startLabel, {}, { type: "jump" }),
      newCloseChoiceOption("Cancel"),
    ];
  },
  () => {
    narration.dialogue = "Restart";
  },
]);`,
                "hooks/useQueryInterface.ts": `import { CharacterBaseModel, narration, stepHistory } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";

export const INTERFACE_DATA_USE_QUEY_KEY = "interface_data_use_quey_key";

const CAN_GO_BACK_USE_QUEY_KEY = "can_go_back_use_quey_key";
export function useQueryCanGoBack() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CAN_GO_BACK_USE_QUEY_KEY],
    queryFn: async () => stepHistory.canGoBack,
  });
}

const CHOICE_MENU_OPTIONS_USE_QUEY_KEY = "choice_menu_options_use_quey_key";
export function useQueryChoiceMenuOptions() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CHOICE_MENU_OPTIONS_USE_QUEY_KEY],
    queryFn: async () =>
      narration.choices?.map((option) => ({
        ...option,
        text: typeof option.text === "string" ? option.text : option.text.join(" "),
        alreadyChosen:
          narration.alreadyCurrentStepMadeChoices?.find((index) => index === option.choiceIndex) !== undefined,
      })) || [],
  });
}

const INPUT_VALUE_USE_QUEY_KEY = "input_value_use_quey_key";
export function useQueryInputValue<T>() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, INPUT_VALUE_USE_QUEY_KEY],
    queryFn: async () => ({
      isRequired: narration.isRequiredInput,
      type: narration.inputType,
      currentValue: narration.inputValue as T | undefined,
    }),
  });
}

const DIALOGUE_USE_QUEY_KEY = "dialogue_use_quey_key";
export function useQueryDialogue() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, DIALOGUE_USE_QUEY_KEY],
    queryFn: async ({ queryKey }) => {
      let dialogue = narration.dialogue;
      let text = dialogue?.text;
      if (Array.isArray(text)) {
        text = text.join(" ");
      }
      let character = dialogue?.character as string | CharacterBaseModel | undefined;
      if (typeof character === "string") {
        character = new CharacterBaseModel(character, {
          name: character,
        });
      }

      return {
        text,
        character,
      };
    },
  });
}

const CAN_GO_NEXT_USE_QUEY_KEY = "can_go_next_use_quey_key";
export function useQueryCanGoNext() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CAN_GO_NEXT_USE_QUEY_KEY],
    queryFn: async () => narration.canContinue && !narration.isRequiredInput,
  });
}

const NARRATIVE_HISTORY_USE_QUEY_KEY = "narrative_history_use_quey_key";
export function useQueryNarrativeHistory() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, NARRATIVE_HISTORY_USE_QUEY_KEY],
    queryFn: async () => {
      const promises = stepHistory.narrativeHistory.map(async (step) => {
        let character = step.dialogue?.character as string | CharacterBaseModel | undefined;
        if (typeof character === "string") {
          character = new CharacterBaseModel(character, { name: character });
        }
        let text = step.dialogue?.text;
        if (Array.isArray(text)) {
          text = text.join(" ");
        }
        return {
          character: character?.name ? character.name + (character.surname ? " " + character.surname : "") : undefined,
          text: text || "",
          icon: character?.icon,
          choices: step.choices,
          inputValue: step.inputValue,
        };
      });
      return await Promise.all(promises);
    },
  });
}`,
                "screens/ChoiceMenu.tsx": `import useNarrationFunctions from "../hooks/useNarrationFunctions";
import { useQueryChoiceMenuOptions } from "../hooks/useQueryInterface";

export default function ChoiceMenu() {
  const { data: menu = [] } = useQueryChoiceMenuOptions();
  const { selectChoice } = useNarrationFunctions();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflow: "auto",
        gap: "8px",
        maxHeight: "100%",
        margin: 0,
        pointerEvents: menu?.length > 0 ? "auto" : "none",
      }}
    >
      {menu?.map((item, index) => (
        <button
          key={"choice-" + index}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => selectChoice(item)}
        >
          {item.alreadyChosen ? "✓ " : ""}
          {item.text}
        </button>
      ))}
    </div>
  );
}`,
            }}
        />
    );
}
