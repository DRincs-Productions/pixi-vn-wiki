# VideoSprite

The `VideoSprite` component extends the [`ImageSprite`](/start/canvas-images.md) component, so you can use all the methods and properties of `ImageSprite`. It is used to display a single video on the canvas.

To initialize the `VideoSprite` component, you must pass the following parameters:

* `options` (Optional): It corresponds to the `VideoSpriteOptions` interface.
* `videoUrl` (Optional): The URL or path of the video. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture.

```ts
import { canvas, VideoSprite } from "@drincs/pixi-vn"

let video = new VideoSprite({
    anchor: { x: 0.5, y: 0.5 },
    x: 100,
    y: 100,
}, 'https://pixijs.com/assets/video.mp4')

await video.load()
canvas.add("my_video", video)
```

Compared to the `ImageSprite` component, `VideoSprite` adds the following features:

* `loop`: Indicates if the video should loop after it finishes.
* `paused`: Indicates if the video is paused.
* `pause()`: Pause the video.
* `play()`: Play the video.
* `currentTime`: The current time of the video.
* `restart()`: Restart the video.

## Show a video

The simplest and fastest method to show an video on the canvas is to use the `showVideo` function. This function is a combination of the `load` and [`canvas.add`](/start/canvas-functions.md#add-a-canvas-component) functions.

This function will return a `VideoSprite`, that you can use to manipulate the video, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the video.
* `videoUrl` (Optional): The URL or path of the video. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. If you don't provide the URL, then the alias is used as the URL.
* `options` (Optional): It corresponds to the `VideoSpriteOptions` interface.

:::tabs
== startLabel.ts

```ts
import { newLabel, showVideo } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        let video1 = await showVideo("video"); // [!code focus]
        let video2 = await showVideo("video2", "video", { // [!code focus]
            xAlign: 0.5, // [!code focus]
        }); // [!code focus]
        let video3 = await showVideo("video3", "https://pixijs.com/assets/video.mp4", { // [!code focus]
            xAlign: 1, // [!code focus]
        }); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::

<sandbox
  template="v44hk9"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Add a video

To add an video to the canvas, you can use the `addVideo` function. It is important to take into account that this function only adds the component to the canvas but does **not show it and does not load its texture**. This function use [`canvas.add`](/start/canvas-functions.md#add-a-canvas-component) to add the video to the canvas.

This function will return a `VideoSprite`, that you can use to manipulate the video, and it has the following parameters:

* `alias`: Is a [alias](/start/canvas-alias.md) for the video.
* `videoUrl` (Optional): The URL or path of the video. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. If you don't provide the URL, then the alias is used as the URL.
* `options` (Optional): It corresponds to the `VideoSpriteOptions` interface.

:::tabs
== startLabel.ts

```ts
import { addVideo, canvas, VideoSprite, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    () => {
        let video1 = addVideo("video"); // [!code focus]
        let video2 = addVideo("video2", "video", { // [!code focus]
            xAlign: 0.5, // [!code focus]
        }); // [!code focus]
        let video3 = addVideo("video3", "https://pixijs.com/assets/video.mp4", { // [!code focus]
            xAlign: 1, // [!code focus]
        }); // [!code focus]
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
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::

<sandbox
  template="xlsrnj"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Remove a video

As for the rest of the canvas components, you can remove an video from the canvas using the [`canvas.remove`](/start/canvas-functions#remove-a-canvas-component) function.

## Play and pause a video

You can use the `play()` and `pause()` methods to play and pause the video, or set the `paused` property to `true` or `false`.

:::tabs
== startLabel.ts

```ts
import { canvas, narration, newLabel, showVideo, VideoSprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        narration.dialogue = "add video";
        await showVideo("video");
    },
    async () => {
        narration.dialogue = "pause video";
        let video = canvas.find<VideoSprite>("video");
        if (video) {
            video.pause(); // [!code focus]
            // or video.paused = true // [!code focus]
        }
    },
    async () => {
        narration.dialogue = "resume video";
        let video = canvas.find<VideoSprite>("video");
        if (video) {
            video.play(); // [!code focus]
            // or video.paused = false // [!code focus]
        }
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::

<sandbox
  template="29hjtk"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Looping video

You can use the `loop` property to set the video to loop.

:::tabs
== startLabel.ts

```ts
import { newLabel, showVideo } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        let video = await showVideo("video");
        video.loop = true; // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::

<sandbox
  template="fdzncz"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Restart a video

You can use the `restart` method to restart the video.

:::tabs
== startLabel.ts

```ts
import { canvas, narration, newLabel, showVideo, VideoSprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        narration.dialogue = "add video";
        await showVideo("video");
    },
    async () => {
        narration.dialogue = "restart video";
        let video = canvas.find<VideoSprite>("video");
        if (video) {
            video.restart(); // [!code focus]
        }
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::

<sandbox
  template="7pngqy"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>
