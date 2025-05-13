# ImageContainer

The `ImageContainer` component extends the [`Container`](/start/canvas-components#base-components) component, so you can use all the methods and properties of `Container`. It is used to display multiple images on the canvas as if it were a single element.

The children of the `ImageContainer` are the [`ImageSprite`](/start/canvas-images.md) components.

To initialize the `ImageContainer` component, you must pass the following parameters:

* `options` (Optional): It corresponds to the `ImageContainerOptions<ImageSprite>` interface.
* `imageUrls` (Optional): The array of URLs or paths of the images. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture.

```ts
import { canvas, ImageContainer } from "@drincs/pixi-vn"

let james = new ImageContainer({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, [
    'https://image.com/body.webp',
    'https://image.com/head.webp',
    'https://image.com/eyes.webp',
])

await james.load()
canvas.add("james", james)
```

Compared to the `Container` component, `ImageContainer` adds the following features:

* `load()`: Load all the image URLs and set the resulting textures to the [`ImageSprite`](/start/canvas-images.md).
* Additional positions: [Align](/start/canvas-position.md) and [Position with percentage](/start/canvas-position.md)

## Show a images container

The simplest and fastest method to show a group of images on the canvas is to use the `showImageContainer` function. This function is a combination of the `load` and [`canvas.add`](/start/canvas-functions.md#add-a-canvas-component) functions.

This function will return a `ImageContainer`, that you can use to manipulate the container, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the image.
* `imageUrls` (Optional): The array of URLs or paths of the images. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. If you don't provide the urls, then the alias is used as the URL.
* `options` (Optional): It corresponds to the `ImageContainerOptions<ImageSprite>` interface.

:::tabs
== startLabel.ts

```ts
import { canvas, MoveTicker, newLabel, showImageContainer } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        let james = await showImageContainer("james", ["m01-body", "m01-eyes", "m01-mouth"], { // [!code focus]
            xAlign: 0.5, // [!code focus]
            yAlign: 1, // [!code focus]
        }); // [!code focus]
    },
    () => {
        canvas.removeAllTickers();
        let tickerId = canvas.addTicker("james", new MoveTicker({ destination: { x: 0, y: 1, type: "align" } }));
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'm01-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" })
    Assets.add({ alias: 'm01-eyes', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" })
    Assets.add({ alias: 'm01-mouth', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" })
}
```

:::

<sandbox
  template="qz66sg"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Add a images container

To add a group of images to the canvas, you can use the `addImageCointainer` function. It is important to take into account that this function only adds the component to the canvas but does **not show it and does not load its texture**. This function use [`canvas.add`](/start/canvas-functions.md#add-a-canvas-component) functions to add the image to the canvas.

This function will return a `ImageContainer`, that you can use to manipulate the image, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the image.
* `imageUrls` (Optional): The array of URLs or paths of the images. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. If you don't provide the urls, then the alias is used as the URL.
* `options` (Optional): It corresponds to the `ImageContainerOptions<ImageSprite>` interface.

:::tabs
== startLabel.ts

```ts
import { addImageCointainer, canvas, ImageContainer, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    () => {
        let james = await addImageCointainer("james", ["m01-body", "m01-eyes", "m01-mouth"], { // [!code focus]
            xAlign: 0.5, // [!code focus]
            yAlign: 1, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        let james = canvas.find<ImageContainer>("james");
        james && (await james.load());
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'm01-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" })
    Assets.add({ alias: 'm01-eyes', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" })
    Assets.add({ alias: 'm01-mouth', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" })
}
```

:::

<sandbox
  template="ptqws3"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Remove a images container

As for the rest of the canvas components, you can remove a group of images from the canvas using the [`canvas.remove`](/start/canvas-functions#remove-a-canvas-component) function.
