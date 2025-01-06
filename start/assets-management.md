# Assets management

To load and manipulate assets (images, gifs, videos...) you will need to use `Assets`. `Assets` is a class with many features and comes from the PixiJS library, if you want more information read [here](https://pixijs.com/8.x/guides/components/assets).

In the examples so far we have loaded the "Textures"  of our canvas components and our sounds just before using them without connecting these asserts to a unique alias.

This method works and keeps only the strictly necessary asserts in memory, but it has some disadvantages:

- refer to an asset directly with a url, where that asset must be renamed/moved to another folder or replaced with another asset (which has another url), the old saves will not work anymore and in several places in the code you will have to write a url which is usually very long.
- Each [step](/start/labels.md) where one or more assets are loaded will require some time (even if small) to execute.

For these reasons it is recommended to handle asserts in the following ways.

## Initialize the asset matrix at project start

Initialize the asset matrix at the start of the project, this will allow you to refer to the assets by a unique alias and not by a url. This will save you code and you will be able to change the url of an asset without having to worry about saving the old saves.

To do this, it is recommended to create an asynchronous function `defineAssets` that will be called at the start of the project.
In this function you will use the function `Assets.add` which will allow you to add an asset to the matrix. The function `Assets.add` requires an object with the following properties:

- `alias`: a unique string that will be used to refer to the asset.
- `src`: the url of the asset.

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
}
```

## Load assets before the project starts

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

    // The game will not start until these asserts are loaded. // [!code focus]
    await Assets.load('eggHead') // [!code focus]
}
```

## Load assets in the background before the project starts

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

    // The game will not start until these asserts are loaded.
    await Assets.load('eggHead')

    // The game will start immediately, but these asserts will be loaded in the background. // [!code focus]
    Assets.load('flowerTop') // [!code focus]
}
```

## Load assets before a label starts

To make the game smoother by trying to remove asset loading times from one step to another, it is possible to load all used assets into a label before it starts.

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
], {
    onLoadingLabel: async (stepIndex, label) => { // [!code focus]
        // The label will not start until these asserts are loaded. // [!code focus]
        await Assets.load("eggHead") // [!code focus]
        await Assets.load("flowerTop") // [!code focus]
    } // [!code focus]
})
```

## Load assets in the background before a label starts

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
        // The label will not start until these asserts are loaded.
        await Assets.load("eggHead")
        await Assets.load("flowerTop")
        // The label will start immediately, but these asserts will be loaded in the background. // [!code focus]
        Assets.load("helmlok") // [!code focus]
        Assets.load("skully") // [!code focus]
    } // [!code focus]
})
```
