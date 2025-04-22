# Gestione assets

Per caricare e manipolare risorse (immagini, gif, video...) sarà necessario utilizzare `Assets`. `Assets` è una classe con molte funzionalità e proviene dalla libreria PixiJS, se vuoi maggiori informazioni leggi [qui](https://pixijs.com/8.x/guides/components/assets).

In all Pixi’VN functions you can directly use the image URL, even if not yet defined in `Assets`.

```ts
let alien1 = await showImage("alien", "https://pixijs.com/assets/eggHead.png");
```

This method has some cons:

- refer to an asset directly with a URL, where that asset must be renamed/moved to another folder or replaced with another asset (which has another URL), the old saves will not work anymore and in several places in the code you will have to write a URL which is usually very long.
- Each [step](/start/labels.md) where one or more assets are loaded will require some time (even if small) to execute.

Per questi motivi si consiglia di gestire le risorse nei seguenti modi.

## Inizializza la matrice degli assets all'avvio del progetto

Initializing the asset matrix at the beginning of the project allows you to reference assets by a unique alias without having to use the URL/path. This way you can change the URL of a resource (while keeping the old alias) so you don't have to worry about version compatibility.

Per fare ciò, si consiglia di creare una funzione asincrona `defineAssets` che verrà chiamata all'aavvio del progetto.
In this feature we will use the `Assets` functions (For example `Assets.add`, `Assets.addBundle` and `Assets.init`. You can find more information about them [here](https://pixijs.com/8.x/guides/components/assets)) to assign an alias to each asset.

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

Tuttavia **nel caso in cui le risorse non siano salvate localmente**, ma in un ["assets hosting"](/start/assets.md#assets-hosting) il loro caricamento potrebbe richiedere del tempo. Ciò significa che l'avvio di uno step potrebbe non essere tempestivo. Pertanto, dopo aver avviato l'esecuzione del [passaggio successivo](/start/labels-flow.md#next-step) (ad esempio con il pulsante "Avanti"), il giocatore potrebbe dover attendere un po' di tempo per poter "visualizzare" le modifiche ed eseguire un altro passaggio.

Eseguire questi caricamenti a ogni passaggio può risultare fastidioso per il giocatore, anche se sono molto brevi.

Per risolvere questo problema, lo sviluppatore può avviare un "gruppo di caricamento" in una determinata fase del gioco. Ciò significa che il lettore avrà meno caricamenti, ma più lunghi.

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

If you are using _**ink**_ you can read the following to get the same result in the [following way](/ink/ink-assets.md).

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
