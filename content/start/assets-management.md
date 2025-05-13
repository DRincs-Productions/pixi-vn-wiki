# Assets management

To load and manipulate assets (images, gifs, videos...) you will need to use `Assets`. `Assets` is a class with many features and comes from the PixiJS library, if you want more information read [here](https://pixijs.com/8.x/guides/components/assets).

In all Pixi’VN functions you can directly use the image URL, even if not defined in `Assets`.

```ts
let alien1 = await showImage("alien", "https://pixijs.com/assets/eggHead.png");
```

This method has some cons:

- changing the URL of a asset from one version to another may cause incompatibilities
- the player will have to wait for a short loading time, every time pressing "go next" a [step](/start/labels.md) will be started which uses assets
- writing the entire URL in code will increase its length and make it less understandable

For these reasons it is recommended to handle assets in the following ways.

## Initialize the asset matrix at project start

Initializing the asset matrix at the beginning of the project allows you to reference assets by a unique alias without having to use the URL/path. This way you can change the URL of a asset (while keeping the old alias) so you don't have to worry about version compatibility.

To do this, it is recommended to create an asynchronous function `defineAssets` that will be called at the start of the project.
In this feature we will use the `Assets` functions (e.g. `Assets.add`, `Assets.addBundle` and `Assets.init`. You can find more information about them [here](https://pixijs.com/8.x/guides/components/assets)) to assign an alias to each asset.

::: code-group

```ts [utils/defineAssets.ts]
import { Assets, sound } from "@drincs/pixi-vn";
import manifest from "../assets/manifest";

export async function defineAssets() {
    // manifest
    Assets.init({ manifest });
    // single asset
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: 'video', src: "https://pixijs.com/assets/video.mp4" })
    sound.add('bird', 'https://pixijs.io/sound/examples/resources/bird.mp3');
    sound.add('musical', 'https://pixijs.io/sound/examples/resources/musical.mp3');
    // bundle
    Assets.addBundle('liam', {
        "liam-head": 'liam_head.png',
        "liam-body": 'liam_body.png',
        "liam-arms": 'liam_arms.png',
    });
}
```

```ts [assets/manifest.ts]
import { AssetsManifest } from "@drincs/pixi-vn";

/**
 * Manifest for the assets used in the game.
 * You can read more about the manifest here: https://pixijs.com/8.x/guides/components/assets#loading-multiple-assets
 */
const manifest: AssetsManifest = {
    bundles: [
        // screens
        {
            name: "main_menu",
            assets: [
                {
                    alias: "background_main_menu",
                    src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fmain-menu.webp?alt=media",
                },
            ],
        },
        // labels
        {
            name: "start",
            assets: [
                {
                    alias: "bg01-hallway",
                    src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fbg01-hallway.webp?alt=media",
                },
            ],
        },
    ],
};
export default manifest;
```

:::

## Load assets

By default, assets are loaded only when needed.

But **in case the assets are not saved locally**, but in an ["assets hosting"](/start/assets.md#assets-hosting) their loading may take some time. This means that starting a step may not be timely. So the player after starting the execution of the [next step](/start/labels-flow.md#next-step) (for example with the "next" button) may have to wait some time to be able to "view" the changes and be able to run another step.

Performing these loadings at each step may be annoying to the player, even if they are very short.

The developer to deal with this problem can start a "loading group" at a certain step of the game. This means that the player will have fewer loadings, but longer ones.

Here are various ways to load the assets:

### Load assets before the project starts

Load the assets before the project starts, this will allow you to start the project only when all the assets are loaded. It is suggested to use this procedure only for assets used in the main page or for assets used frequently. It is recommended not to exceed 100MB.

To do this, you will use the `Assets.load` function with wait before starting the project. The `Assets.load` function is asynchronous and returns a promise that will be resolved when all the assets are loaded. The `Assets.load` function requires a string that is the alias of the asset to be loaded.

```ts
import { Assets, sound } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: 'helmlok', src: "https://pixijs.com/assets/helmlok.png" })
    Assets.add({ alias: 'skully', src: "https://pixijs.com/assets/skully.png" })
    Assets.add({ alias: 'video', src: "https://pixijs.com/assets/video.mp4" })
    sound.add('bird', 'https://pixijs.io/sound/examples/resources/bird.mp3');
    sound.add('musical', 'https://pixijs.io/sound/examples/resources/musical.mp3');

    // The game will not start until these assets are loaded. // [!code focus]
    await Assets.load('eggHead') // [!code focus]
}
```

### Load assets in the background before the project starts

Load assets in the background, which means that the project will start without waiting for those assets to load. Keep in mind that if you upload a large amount of files, a large part of the connection will be used to load those assets. It is recommended not to exceed 500MB.

To do this, you will use the `Assets.load` function without waiting before starting the project. The `Assets.load` function requires a string that is the alias of the asset to be loaded. The `Assets.load` function is asynchronous and returns a promise that will be resolved when all the assets are loaded. The `Assets.load` function requires a string that is the alias of the asset to be loaded.

```ts
import { Assets, sound } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: 'helmlok', src: "https://pixijs.com/assets/helmlok.png" })
    Assets.add({ alias: 'skully', src: "https://pixijs.com/assets/skully.png" })
    Assets.add({ alias: 'video', src: "https://pixijs.com/assets/video.mp4" })
    sound.add('bird', 'https://pixijs.io/sound/examples/resources/bird.mp3');
    sound.add('musical', 'https://pixijs.io/sound/examples/resources/musical.mp3');

    // The game will not start until these assets are loaded.
    await Assets.load('eggHead')

    // The game will start immediately, but these assets will be loaded in the background. // [!code focus]
    Assets.load('flowerTop') // [!code focus]
}
```

### Load assets before a label starts

To make the game smoother by trying to remove asset loading times from one step to another, it is possible to load all used assets into a label before it starts.

To do this, you will use the [`onLoadingLabel`](/start/labels-advanced.md#onloadinglabel) function of the label options. This function will be executed in `onStepStart` if the index of the step is 0 and when the user loads a save file. When you load a save file, all `onLoadingLabel` functions of the `narration.openedLabels` (current label and all labels that are in the stack).

If you are using ***ink*** you can read the following to get the same result in the [following way](/ink/ink-assets.md).

```ts
import { newLabel, showImage, Assets } from "@drincs/pixi-vn";

newLabel("start", [
    () => {
        await showImage("eggHead")
    },
    () => {
        await showImage("flowerTop")
    },
], {
    onLoadingLabel: async (stepIndex, label) => { // [!code focus]
        // The label will not start until these assets are loaded. // [!code focus]
        await Assets.load("eggHead") // [!code focus]
        await Assets.load("flowerTop") // [!code focus]
    } // [!code focus]
})
```

### Load assets in the background before a label starts

To make the game smoother by trying to remove asset loading times from a step, instead of loading all assets before the label starts, it is possible to load the assets used in the last steps in the background.

To do this, you will use the [`onLoadingLabel`](/start/labels-advanced.md#onloadinglabel) function of the label options. This function will be executed in `onStepStart` if the index of the step is 0 and when the user loads a save file. When you load a save file, all `onLoadingLabel` functions of the `narration.openedLabels` (current label and all labels that are in the stack).

```ts
import { newLabel, showImage, Assets } from "@drincs/pixi-vn";

newLabel("start", [
    () => {
        await showImage("eggHead")
    },
    () => {
        await showImage("flowerTop")
    },
    () => {
        await showImage("helmlok")
    },
    () => {
        await showImage("skully")
    },
], {
    onLoadingLabel: async (stepIndex, label) => { // [!code focus]
        // The label will not start until these assets are loaded.
        await Assets.load("eggHead")
        await Assets.load("flowerTop")
        // The label will start immediately, but these assets will be loaded in the background. // [!code focus]
        Assets.load("helmlok") // [!code focus]
        Assets.load("skully") // [!code focus]
    } // [!code focus]
})
```
