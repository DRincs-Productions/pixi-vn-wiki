# ImageSprite

The `ImageSprite` component extends the [`Sprite`](/start/canvas-components#base-components) component, so you can use all the methods and properties of `Sprite`. It is used to display a single image on the canvas.

To initialize the `ImageSprite` component, you must pass the following parameters:

* `options` (Optional): It corresponds to the `ImageSpriteOptions` interface.
* `imageUrl` (Optional): The URL or path of the image. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture.

```ts
import { canvas, ImageSprite } from "@drincs/pixi-vn"

let alien = new ImageSprite({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, 'https://pixijs.com/assets/eggHead.png')

await alien.load()
canvas.add("alien", alien)
```

Compared to the `Sprite` component, `ImageSprite` adds the following features:

* `load()`: Load the image URL and set the resulting texture to the sprite.
* Additional positions: [Align](/start/canvas-position.md) and [Position with percentage](/start/canvas-position.md)

## Show a image

The simplest and fastest method to show an image on the canvas is to use the `showImage` function. This function is a combination of the `load` and [`canvas.add`](/start/canvas-functions.md#add-a-canvas-component) functions.

This function will return a `ImageSprite`, that you can use to manipulate the image, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the image.
* `imageUrl` (Optional): The URL or path of the image. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. If you don't provide the URL, then the alias is used as the URL.
* `options` (Optional): It corresponds to the `ImageSpriteOptions` interface.

:::tabs
== startLabel.ts

```ts
import { newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        let alien1 = await showImage("alien"); // [!code focus]
        let alien2 = await showImage("alien2", "alien", { // [!code focus]
            xAlign: 0.5, // [!code focus]
        }); // [!code focus]
        let alien3 = await showImage("alien3", "https://pixijs.com/assets/eggHead.png", { // [!code focus]
            xAlign: 1, // [!code focus]
        }); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "alien", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

<sandbox
  template="m9q8zk"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Add a image

To add an image to the canvas, you can use the `addImage` function. It is important to take into account that this function only adds the component to the canvas but does **not show it and does not load its texture**. This function use [`canvas.add`](/start/canvas-functions.md#add-a-canvas-component) to add the image to the canvas.

This function will return a `ImageSprite`, that you can use to manipulate the image, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the image.
* `imageUrl` (Optional): The URL or path of the image. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. If you don't provide the URL, then the alias is used as the URL.
* `options` (Optional): It corresponds to the `ImageSpriteOptions` interface.

:::tabs
== startLabel.ts

```ts
import { addImage, canvas, ImageSprite, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    () => {
        let alien1 = addImage("alien"); // [!code focus]
        let alien2 = addImage("alien2", "alien", { // [!code focus]
            xAlign: 0.5, // [!code focus]
        }); // [!code focus]
        let alien3 = addImage("alien3", "https://pixijs.com/assets/eggHead.png", { // [!code focus]
            xAlign: 1, // [!code focus]
        }); // [!code focus]
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
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "alien", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

<sandbox
  template="5f3jcr"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Remove a image

As for the rest of the canvas components, you can remove an image from the canvas using the [`canvas.remove`](/start/canvas-functions#remove-a-canvas-component) function.
