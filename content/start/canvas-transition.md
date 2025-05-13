# Transitions

In Pixi’VN provides various transition effect to show or remove an [canvas component](/start/canvas-components.md) and the possibility to [create your own transitions](#create-your-own-transition).

[( More are on the way )](https://github.com/DRincs-Productions/pixi-vn/issues/20)

## Dissolve transition

The dissolve transition when:

* shows a component, gradually increases `alpha`. If a component with the same alias exists, the component will be removed when the new component transition is complete.
* removes a component, gradually decreases `alpha`.

This transition has been created with the [`FadeAlphaTicker`](/start/canvas-animations-effects.md#fade).

The `showWithDissolve` function show a canvas element with dissolve transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image` (Optional): The image to show. If you don't provide the URL, then the alias is used as the URL. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/canvas-animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

The `removeWithDissolve` function remove a canvas element with dissolve transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/canvas-animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, newLabel, removeWithDissolve, showWithDissolve } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showWithDissolve("alien", "egg_head", { duration: 5 }); // [!code focus]
        await showWithDissolve("human", { // [!code focus]
            value: ["m01-body", "m01-eyes", "m01-mouth"], // [!code focus]
            options: { scale: 0.5, xAlign: 0.7 }, // [!code focus]
        }); // [!code focus]
    },
    async () => {
        await showWithDissolve("alien", "flower_top"); // [!code focus]
        removeWithDissolve("human"); // [!code focus]
    },
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

<sandbox
  template="yzslsf"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Fade transition

The fade transition when:

* shows a component, gradually increases `alpha`. If a component with the same alias exists, the existing component will be removed with a fade-out effect before the new component is shown.
* removes a component, gradually decreases `alpha`.

This transition has been created with the [`FadeAlphaTicker`](/start/canvas-animations-effects.md#fade).

The `showWithFade` function show a canvas element with fade transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image` (Optional): The image to show. If you don't provide the URL, then the alias is used as the URL. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/canvas-animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

The `removeWithFade` function remove a canvas element with fade transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It corresponds to the props of the [Fade effect](/start/canvas-animations-effects.md#fade).
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, newLabel, removeWithFade, showWithFade } from "@drincs/pixi-vn";

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
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

<sandbox
  template="3r2f3h"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Move in/out transition

The move in/out transition when:

* shows a component, moves the component from outside of the right or left ot top or bottom end of the canvas to the canvas component position. If a component with the same alias exists, the existing component will be removed with a move-out effect before the new component is shown.
* removes a component, moves the component from a position to outside of the right or left ot top or bottom end of the canvas.

This transition has been created with the [`MoveTicker`](/start/canvas-animations-effects.md#move).

The `moveIn` function show a canvas element with move in transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image` (Optional): The image to show. If you don't provide the URL, then the alias is used as the URL. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It combines the properties of the [Move effect](/start/canvas-animations-effects.md#move) with following properties:
  * `direction`: The direction of the move. It can be `right`, `left`, `top`, `bottom`. default is `right`.
  * `removeOldComponentWithMoveOut` (Optional): If a component with the same alias exists, the existing component will be removed with a `moveOut` effect when the new component transition is complete. default is `false`.
* `priority` (Optional): The priority of the effect.

The `moveOut` function remove a canvas element with move out transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It combines the properties of the [Move effect](/start/canvas-animations-effects.md#move) with following properties:
  * `direction`: The direction of the move. It can be `right`, `left`, `top`, `bottom`. default is `right`.
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, moveIn, moveOut, newLabel } from "@drincs/pixi-vn";

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
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

<sandbox
  template="z8gsyy"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Push in/out transition

The push in/out transition when:

* shows a component, moves the component from outside of the right or left ot top or bottom end of the canvas to the canvas component position. If a component with the same alias exists, the existing component will be removed with a push-out effect while the transition of the new component is in progress.
* removes a component, moves the component from a position to outside of the right or left ot top or bottom end of the canvas.

This transition has been created with the [`MoveTicker`](/start/canvas-animations-effects.md#move).

The `pushIn` function show a canvas element with push in transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image` (Optional): The image to show. If you don't provide the URL, then the alias is used as the URL. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It combines the properties of the [Move effect](/start/canvas-animations-effects.md#move) with following properties:
  * `direction`: The direction of the move. It can be `right`, `left`, `top`, `bottom`. default is `right`.
* `priority` (Optional): The priority of the effect.

The `pushOut` function remove a canvas element with push out transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It combines the properties of the [Move effect](/start/canvas-animations-effects.md#move) with following properties:
  * `direction`: The direction of the move. It can be `right`, `left`, `top`, `bottom`. default is `right`.
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, newLabel, pushIn, pushOut } from "@drincs/pixi-vn";

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
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

<sandbox
  template="vgf4fp"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Zoom in/out transition

The zoom in/out transition when:

* shows a component, scales the component from 0, from outside of the right or left ot top or bottom end of the canvas, to the original scale and to the component position. If a component with the same alias exists, the existing component will be removed when the new component transition is complete.
* removes a component, scales the component from the original scale to 0, to outside of the right or left ot top or bottom end of the canvas.

This transition has been created with the [`ZoomTicker`](/start/canvas-animations-effects.md#zoom).

The `zoomIn` function show a canvas element with zoom in transition. This function has the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `image` (Optional): The image to show. If you don't provide the URL, then the alias is used as the URL. It can be:
  * a URL/path. In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a array of URL/paths. In this case, will be added a [ImageContainer](/start/canvas-images.md).
  * a `{ value: string, options: ImageSpriteOptions }`, where `value` is the URL/path and `options` is the the options of the [ImageSprite](/start/canvas-images.md). In this case, if URL/path is a video will be added a [VideoSprite](/start/canvas-videos.md), else a [ImageSprite](/start/canvas-images.md).
  * a `{ value: string[], options: ImageContainerOptions }`, where `value` is the array of URL/paths and `options` is the the options of the [ImageContainer](/start/canvas-images.md).
  * a [canvas component](/start/canvas-components.md).
* `props` (Optional): The properties of the effect. It combines the properties of the [Zoom effect](/start/canvas-animations-effects.md#zoom) with following properties:
  * `direction`: The direction of the zoom. It can be `right`, `left`, `top`, `bottom`. default is `right`.
  * `removeOldComponentWithZoomOut` (Optional): If a component with the same alias exists, the existing component will be removed with a `zoomOut` effect when the new component transition is complete. default is `false`.
* `priority` (Optional): The priority of the effect.

The `zoomOut` function remove a canvas element with zoom out transition. This function has the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.
* `props` (Optional): The properties of the effect. It combines the properties of the [Zoom effect](/start/canvas-animations-effects.md#zoom) with following properties:
  * `direction`: The direction of the zoom. It can be `right`, `left`, `top`, `bottom`. default is `right`.
* `priority` (Optional): The priority of the effect.

:::tabs
== startLabel.ts

```ts
import { Assets, newLabel, zoomIn, zoomOut } from "@drincs/pixi-vn";

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
], {
    onLoadingLabel: async () => {
        await Assets.load(["egg_head", "m01-mouth", "m01-body", "m01-eyes"]);
    },
});
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "m01-body", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" });
    Assets.add({ alias: "m01-eyes", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" });
    Assets.add({ alias: "m01-mouth", src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" });
}
```

:::

<sandbox
  template="pkfqvr"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Create your own transition

Create your own transition is very simple, you can combine more [Animations and Effects](/start/canvas-animations-effects) to create your own transition.

( The Pixi’VN Team welcomes new proposals/sharing to make this library more and more complete. So you can create a [discussion](https://github.com/DRincs-Productions/pixi-vn/discussions/categories/show-and-tell) to share/propose it. )

To better understand how to create one, a simplified version of [`showWithDissolve`](#dissolve-transition) will be left as an example below.

```typescript
import { canvas, FadeAlphaTicker, FadeAlphaTickerProps, ImageSprite, UPDATE_PRIORITY } from "@drincs/pixi-vn"

export async function showWithDissolve(
    alias: string,
    canvasElement: ImageSprite,
    props: FadeAlphaTickerProps = {},
    priority?: UPDATE_PRIORITY,
): Promise<string[] | undefined> {
    canvas.add(alias, canvasElement)
    canvasElement.alpha = 0

    let effect = new FadeAlphaTicker({
        ...props,
        type: "show",
        startOnlyIfHaveTexture: true,
    }, undefined, priority)
    let id = canvas.addTicker(alias, effect)
    if (canvasElement.haveEmptyTexture) {
        await canvasElement.load()
    }
    if (id) {
        return [id]
    }
}
```

### Force completion of the transition at the end of the step

It is recommended to create a transition that forces the completion of the transition at the end of the step.

To do this, you can use the [`canvas.completeTickerOnStepEnd` function](/start/canvas-tickers-functions.md#force-completion-of-the-transition-at-the-end-of-the-step).

This example shows how to create a transition that forces the completion of the transition at the end of the step.

```typescript
import { canvas, FadeAlphaTicker, FadeAlphaTickerProps, ImageSprite, UPDATE_PRIORITY } from "@drincs/pixi-vn"

export async function showWithDissolve(
    alias: string,
    canvasElement: ImageSprite,
    props: FadeAlphaTickerProps && {
        mustBeCompletedBeforeNextStep?: boolean // [!code ++]
    } = {},
    priority?: UPDATE_PRIORITY,
): Promise<string[] | undefined> {
    let mustBeCompletedBeforeNextStep = props.mustBeCompletedBeforeNextStep ?? true // [!code ++]
    canvas.add(alias, canvasElement)
    canvasElement.alpha = 0

    let effect = new FadeAlphaTicker({
        ...props,
        type: "show",
        startOnlyIfHaveTexture: true,
    }, undefined, priority)
    let id = canvas.addTicker(alias, effect)
    if (id) { // [!code ++]
        mustBeCompletedBeforeNextStep && canvas.completeTickerOnStepEnd({ id: id }) // [!code ++]
    } // [!code ++]
    if (canvasElement.haveEmptyTexture) {
        await canvasElement.load()
    }
    if (id) {
        return [id]
    }
}
```

### If a component with the same alias already exists

If a component with the same alias already exists, you can

* Let it be replaced
* Remove the previous component with a transition
* Remove the previous component when the new component transition is complete

#### Remove the previous component when the new component transition is complete

To remove the previous component when the new component transition is complete, you can use the `aliasToRemoveAfter` property. The `aliasToRemoveAfter` property is the alias of the component to remove when the new component transition is complete, it is available in all [Animations and Effects](/start/canvas-animations-effects) provided by Pixi’VN.

```typescript
import { canvas, FadeAlphaTicker, FadeAlphaTickerProps, ImageSprite, UPDATE_PRIORITY } from "@drincs/pixi-vn"

export async function showWithDissolve(
    alias: string,
    canvasElement: ImageSprite,
    props: FadeAlphaTickerProps = {},
    priority?: UPDATE_PRIORITY,
): Promise<string[] | undefined> {
    let oldCanvasAlias: string | undefined = undefined // [!code ++]
    if (canvas.find(alias)) { // [!code ++]
        oldCanvasAlias = alias + "_temp_disolve" // [!code ++]
        canvas.editAlias(alias, oldCanvasAlias) // [!code ++]
    } // [!code ++]

    canvas.add(alias, canvasElement)
    oldCanvasAlias && canvas.copyCanvasElementProperty(oldCanvasAlias, alias) // [!code ++]
    oldCanvasAlias && canvas.transferTickers(oldCanvasAlias, alias, "duplicate") // [!code ++]
    canvasElement.alpha = 0

    let effect = new FadeAlphaTicker({
        ...props,
        type: "show",
        aliasToRemoveAfter: oldCanvasAlias, // [!code ++]
        startOnlyIfHaveTexture: true,
    }, undefined, priority)
    let id = canvas.addTicker(alias, effect)
    if (canvasElement.haveEmptyTexture) {
        await canvasElement.load()
    }
    if (id) {
        return [id]
    }
}
```

#### Remove the previous component with a transition

To remove the previous component with a transition, you can run a  [Animations or Effects](/start/canvas-animations-effects) to remove the previous component before the new component transition is complete.

To do this you will also need to use many other functions depending on the transition you are creating.

```typescript
import { canvas, FadeAlphaTicker, FadeAlphaTickerProps, ImageSprite, UPDATE_PRIORITY, Pause } from "@drincs/pixi-vn"

export async function showWithFade(
    alias: string,
    canvasElement: ImageSprite,
    props: FadeAlphaTickerProps = {},
    priority?: UPDATE_PRIORITY,
): Promise<string[] | undefined> {
    let oldCanvasAlias: string | undefined = undefined // [!code ++]
    if (canvas.find(alias)) { // [!code ++]
        oldCanvasAlias = alias + "_temp_fade" // [!code ++]
        canvas.editAlias(alias, oldCanvasAlias) // [!code ++]
    } // [!code ++]

    canvas.add(alias, canvasElement)
    oldCanvasAlias && canvas.copyCanvasElementProperty(oldCanvasAlias, alias) // [!code ++]
    oldCanvasAlias && canvas.transferTickers(oldCanvasAlias, alias, "duplicate") // [!code ++]
    canvasElement.alpha = 0

    let res: undefined | string[] = undefined // [!code ++]

    if (oldCanvasAlias) { // [!code ++]
        let id1 = canvas.addTicker(oldCanvasAlias, // [!code ++]
            new FadeAlphaTicker({ // [!code ++]
                ...props, // [!code ++]
                type: "hide", // [!code ++]
                startOnlyIfHaveTexture: true, // [!code ++]
                tickerAliasToResume: alias // [!code ++]
            }, undefined, priority), // [!code ++]
        ) // [!code ++]
        if (id1) { // [!code ++]
            res = [id1] // [!code ++]
        } // [!code ++]
        let id2 = canvas.addTicker(alias, // [!code ++]
            new FadeAlphaTicker({ // [!code ++]
                ...props, // [!code ++]
                type: "show", // [!code ++]
                startOnlyIfHaveTexture: true, // [!code ++]
                aliasToRemoveAfter: oldCanvasAlias, // [!code ++]
            }, undefined, priority) // [!code ++]
        ) // [!code ++]
        canvas.pauseTicker(alias) // [!code ++]
        if (id2) { // [!code ++]
            res ? res.push(id2) : res = [id2] // [!code ++]
        } // [!code ++]
    } // [!code ++]
    else { // [!code ++]
        let effect = new FadeAlphaTicker({
            ...props,
            type: "show",
            startOnlyIfHaveTexture: true,
        }, undefined, priority)
        let id = canvas.addTicker(alias, effect)
        if (id) { // [!code ++]
            res = [id] // [!code ++]
        } // [!code ++]
    } // [!code ++]
    if (canvasElement.haveEmptyTexture) {
        await canvasElement.load()
    }
    return res // [!code ++]
}
```
