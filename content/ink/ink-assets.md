# Assets management in *ink*

As explained in more detail [here](/start/assets-management.md), it is recommended to initialize the asset matrix at project start and load the assets and think about when the assets should be loaded.

On ink you have less control than in Javascript/Typescript over how and when to load assets. On ***ink***, pixi-vn provides a single function that [load assets before a label starts](/start/assets-management.md#load-assets-before-a-label-starts).

The syntax is as follows:

`#` + `[operation]` + `[assets or bundle]` + `[list of URL/path of the image]`

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[operation]`: It is the operation that you want to do. The available operations are:
  * `load`: It loads with await the assets or bundle (`Assets.load` or `Assets.loadBundle`).
  * `lazyload`: It loads the assets or bundle in the background (`Assets.backgroundLoad` or `Assets.backgroundLoadBundle`).
* `[assets or bundle]`: It is the type of asset that you want to load. The available types are:
  * `assets`: It loads the assets.
  * `bundle`: It loads the bundle.
* `[list of URL/path of the image]`: It is the list of URL/path of the images that you want to show. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. Keep in mind that to write `https://` in ***ink*** you must use `https:\/\/` because the `//` is considered a comment in ***ink***.

::: code-group

```ink [ink/start.ink]
=== start ===
# lazyload bundle main_menu start
# load assets eggHead flowerTop my_video
# show image eggHead
# show image flowerTop
# show video my_video
# pause
-> start
```

```ts [utils/defineAssets.ts]
import { Assets } from "@drincs/pixi-vn"

export async function defineAssets() {
    // manifest
    Assets.init({ manifest });
    // single asset
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: "my_video", src: "https://pixijs.com/assets/video.mp4" });
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
