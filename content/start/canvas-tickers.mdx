# Tickers (primitive animations and effects)

Pixi’VN provides the possibility to animate the canvas components with the tickers (primitive animations and effects).

The tickers, compared to `PixiJS.tickers`, are classes with a `fn` method that is executed at every frame. This method is used to animate the canvas components. Pixi’VN keeps track of all running tickers, detects when they are no longer used and allows you to pause, resume, and delete them with [various methods](/start/canvas-tickers-functions.md).

Pixi’VN provides various primitive tickers, that can be used to perform basic actions. For example, the `MoveTicker` class is primitive animation that can be used to move a canvas component.

## Move

For moving a canvas component in `(x, y)` direction you can use the `MoveTicker` class.
This ticker will edit the `x` and `y` properties to reach the destination.

`MoveTicker` have a constructor that takes following properties:

* `props`: the properties of the shake effect. The properties are:
  * `destination`: is an object that contains the destination of the movement. It has the following properties:
  * `x`: is a number that represents the destination in the x direction.
  * `y`: is a number that represents the destination in the y direction.
  * `type` (Optional): is a string that represents the type of the destination. Possible values are `pixel`, `percentage` and `align`:
    * `pixel`: The destination is in pixel.
    * `percentage`: The destination is in percentage.
    * `align`: The destination is in align.
        default is `pixel`.
  * `speed` (Optional): is a number that represents the speed of the movement.
  * `speedProgression` (Optional): in case the movement needs to increase/decrease in speed over time, this property can be used. You can read more about it [here](#speed-progression-property).
  * `startOnlyIfHaveTexture` (Optional): is a boolean that represents if the animation should start only if the canvas component have a texture not empty. If `true` and the canvas component not have a texture, the animation will not edit the `x` and `y` properties, but will be executed. You can read more about it [here](#start-only-if-have-texture-property).
  * `aliasToRemoveAfter` (Optional): is a string[] that contains the aliases of the [canvas component](/start/canvas-components) that will be removed after the movement. You can read more about it [here](#alias-to-remove-after-property).
  * `tickerAliasToResume` (Optional): in case you want to continue some tickers that were previously paused, you can pass the aliases of the canvas components that have the tickers to be resumed. You can read more about it [here](#ticker-alias-to-resume-property).
* `duration` (Optional): the maximum duration of the ticker in seconds.
* `priority` (Optional): the priority of the ticker.

:::tabs
== startLabel.ts

```ts
import { canvas, MoveTicker, newLabel, Repeat, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("alien");
        canvas.addTickersSequence("alien", [
            new MoveTicker({ // [!code focus]
                destination: { x: 1, y: 0, type: "align" }, // [!code focus]
            }), // [!code focus]
            new MoveTicker({ // [!code focus]
                destination: { x: 1, y: 1, type: "align" }, // [!code focus]
                speed: 50, // [!code focus]
            }), // [!code focus]
            new MoveTicker({ // [!code focus]
                destination: { x: 0, y: 0, type: "align" }, // [!code focus]
                speed: 20, // [!code focus]
            }), // [!code focus]
            Repeat,
        ]);
    }
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
  template="vl986g"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Rotate

For rotating a canvas component you can use the `RotateTicker` class.
This ticker will edit the `rotation` property to rotate the canvas component.

`RotateTicker` have a constructor that takes following properties:

* `props`: the properties of the shake effect. The properties are:
  * `speed` (Optional): is a number that represents the speed of the rotation.
  * `clockwise` (Optional): is a boolean that represents the direction of the rotation. If `true`, the rotation will be clockwise, otherwise it will be counterclockwise.
  * `limit` (Optional): is a number that represents the limit of the rotation. It is in degrees.
  * `speedProgression` (Optional): in case the rotation needs to increase/decrease in speed over time, this property can be used. You can read more about it [here](#speed-progression-property).
  * `startOnlyIfHaveTexture` (Optional): is a boolean that represents if the animation should start only if the canvas component have a texture not empty. If `true` and the canvas component not have a texture, the animation will not edit the `rotation` property, but will be executed. You can read more about it [here](#start-only-if-have-texture-property).
  * `aliasToRemoveAfter` (Optional): is a string[] that contains the aliases of the [canvas component](/start/canvas-components) that will be removed after the movement. You can read more about it [here](#alias-to-remove-after-property).
  * `tickerAliasToResume` (Optional): in case you want to continue some tickers that were previously paused, you can pass the aliases of the canvas components that have the tickers to be resumed. You can read more about it [here](#ticker-alias-to-resume-property).
* `duration` (Optional): the maximum duration of the ticker in seconds.
* `priority` (Optional): the priority of the ticker.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, Repeat, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
        canvas.addTickersSequence("alien", [
            new RotateTicker({}, 2), // [!code focus]
            new RotateTicker({ // [!code focus]
                clockwise: false, // [!code focus]
                speed: 10, // [!code focus]
            }, 3), // [!code focus]
            Repeat,
        ]);
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
  template="6zc9js"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Fade

For fading a canvas component you can use the `FadeAlphaTicker` class.
This ticker will edit the `alpha` property of the canvas component to fade in/out.

`FadeAlphaTicker` have a constructor that takes following properties:

* `props`: the properties of the shake effect. The properties are:
  * `speed` (Optional): is a number that represents the speed of the fade.
  * `type` (Optional): is a string that represents the type of the fade. Possible values are `hide` and `show`:
  * `hide`: The canvas component will fade out.
  * `show`: The canvas component will fade in.
  * `limit` (Optional): is a number that represents the limit of the fade. If `type` is `hide`, the limit will be `0`, otherwise it will be `1`.
  * `speedProgression` (Optional): in case the fade needs to increase/decrease in speed over time, this property can be used. You can read more about it [here](#speed-progression-property).
  * `startOnlyIfHaveTexture` (Optional): is a boolean that represents if the animation should start only if the canvas component have a texture not empty. If `true` and the canvas component not have a texture, the animation will not edit the `alpha` property, but will be executed. You can read more about it [here](#start-only-if-have-texture-property).
  * `aliasToRemoveAfter` (Optional): is a string[] that contains the aliases of the [canvas component](/start/canvas-components) that will be removed after the movement. You can read more about it [here](#alias-to-remove-after-property).
  * `tickerAliasToResume` (Optional): in case you want to continue some tickers that were previously paused, you can pass the aliases of the canvas components that have the tickers to be resumed. You can read more about it [here](#ticker-alias-to-resume-property).
* `duration` (Optional): the maximum duration of the ticker in seconds.
* `priority` (Optional): the priority of the ticker.

:::tabs
== startLabel.ts

```ts
import { canvas, FadeAlphaTicker, newLabel, Repeat, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
        canvas.addTickersSequence("alien", [
            new FadeAlphaTicker({}), // [!code focus]
            new FadeAlphaTicker({ // [!code focus]
                type: "show", // [!code focus]
            }), // [!code focus]
            Repeat,
        ]);
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
  template="gj3pdp"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Zoom

For zooming a canvas component you can use the `ZoomTicker` class.
This ticker will edit the `scale.x` and `scale.y` properties of the canvas component to zoom in/out.

`ZoomTicker`  have a constructor that takes following properties:

* `props`: the properties of the shake effect. The properties are:
  * `speed` (Optional): is a number that represents the speed of the zoom effect.
  * `type` (Optional): is a string that represents the type of the zoom effect. Possible values are `zoom` and `unzoom`:
  * `zoom`: The canvas component will zoom in.
  * `unzoom`: The canvas component will zoom out.
  * `limit` (Optional): is a number that represents the limit of the effect. If `type` is `zoom`, the limit will be `Infinity`, otherwise it will be `0`.
  * `speedProgression` (Optional): in case the zoom effect needs to increase/decrease in speed over time, this property can be used. You can read more about it [here](#speed-progression-property).
  * `startOnlyIfHaveTexture` (Optional): is a boolean that represents if the animation should start only if the canvas component have a texture not empty. If `true` and the canvas component not have a texture, the animation will not edit the `scale.x` and `scale.y` properties, but will be executed. You can read more about it [here](#start-only-if-have-texture-property).
  * `aliasToRemoveAfter` (Optional): is a string[] that contains the aliases of the [canvas component](/start/canvas-components) that will be removed after the movement. You can read more about it [here](#alias-to-remove-after-property).
  * `tickerAliasToResume` (Optional): in case you want to continue some tickers that were previously paused, you can pass the aliases of the canvas components that have the tickers to be resumed. You can read more about it [here](#ticker-alias-to-resume-property).
* `duration` (Optional): the maximum duration of the ticker in seconds.
* `priority` (Optional): the priority of the ticker.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, Repeat, showImage, ZoomTicker } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
        canvas.addTickersSequence("alien", [
            new ZoomTicker({ // [!code focus]
                limit: 3, // [!code focus]
            }), // [!code focus]
            new ZoomTicker({ // [!code focus]
                type: "unzoom", // [!code focus]
                limit: -3, // [!code focus]
            }), // [!code focus]
            Repeat,
        ]);
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
  template="wxn3qm"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

### Mirror

You can use the `ZoomTicker` class to mirror a canvas component.

For example, if you want to mirror a canvas component horizontally, you can use the following code:

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, Repeat, showImage, ZoomTicker } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("alien", "alien", { align: 0.5, anchor: 0.5 });
        canvas.addTickersSequence("alien", [
            new ZoomTicker({
                type: "unzoom",
                limit: { x: -1, y: 0 },
                speed: { x: 1, y: 0 },
            }),
            new ZoomTicker({
                limit: 1,
            }),
            Repeat,
        ]);
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
  template="lyj52j"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Special properties

All the tickers, provided by Pixi’VN, have the following properties:

### Speed progression property

You can use the `speedProgression` property to increase/decrease the speed of the effect over time.

Existent types are `linear` and `exponential`. The `linear` type will increase the speed by a fixed amount every frame, while the `exponential` type will increase the speed by a percentage every frame.

The `speedProgression` property is an object that contains the following properties:

* `type`: is a string that represents the type of the progression. Possible values are `linear` and `exponential`.

If the `type` is `linear`, the object must contain the following properties:

* `amt`: is a number that represents the amount of the speed to increase every frame.
* `limit` (Optional): is a number that represents the limit of the effect.

If the `type` is `exponential`, the object must contain the following properties:

* `percentage`: is a number that represents the percentage of the speed to increase every frame. If the percentage is `0.1`, the speed will increase by `10%` every frame.
* `limit` (Optional): is a number that represents the limit of the effect.

:::tabs
== startLabel.ts

```ts
import { canvas, MoveTicker, newLabel, Repeat, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
async () => {
    await showImage("alien");
    canvas.addTickersSequence("alien", [
        new MoveTicker({
            destination: { x: 1, y: 0, type: "align" },
            speedProgression: { type: "linear", amt: -10, limit: 5 }, // [!code focus]
        }),
        new MoveTicker({
            destination: { x: 0, y: 0, type: "align" },
            speedProgression: { type: "exponential", percentage: 1.5, limit: 1000 }, // [!code focus]
        }),
        Repeat,
    ]);
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
  template="ts4dfc"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

### Start only if have texture property

You can use the `startOnlyIfHaveTexture` property to start the animation only if the canvas component have a texture not empty. This is actually during the [creation of a transition](/start/canvas-transition.md#create-your-own-transition).

### Alias to remove after property

You can use the `aliasToRemoveAfter` property to remove the canvas component after the effect. This is actually during the [creation of a transition](/start/canvas-transition.md#create-your-own-transition).

### Ticker alias to resume property

You can use the `tickerAliasToResume` property to resume some tickers that were previously paused. `tickerAliasToResume` is an array of strings that contains the aliases of the canvas components that have the tickers to be resumed.

## Create your own ticker

Create your own ticker is very simple, you just need to extend the [TickerBase](/start/canvas-tickers-functions) class, override the `fn` method and implement your own logic.

After that, you must decorate the class with the `@tickerDecorator` decorator. The decorator can receive a string that represents the alias of the ticker. If the alias is not provided, the class name will be used as the alias.

To better understand how to create one, a simplified version of the `RotateTicker` class is shown below:

```typescript
import { canvas, Container, TickerBase, tickerDecorator, TickerValue } from "@drincs/pixi-vn";

@tickerDecorator() // or @tickerDecorator('RotateTicker')
export default class RotateTicker extends TickerBase<{ speed?: number, clockwise?: boolean }> {
    override fn(
        t: TickerValue,
        args: {
            speed?: number,
            clockwise?: boolean,
        },
        aliases: string[]
    ): void {
        let speed = args.speed === undefined ? 0.1 : args.speed
        let clockwise = args.clockwise === undefined ? true : args.clockwise
        aliases.forEach((alias) => {
            let component = canvas.find(alias)
            if (component && component instanceof Container) {
                if (clockwise)
                    component.rotation += speed * t.deltaTime
                else
                    component.rotation -= speed * t.deltaTime
            }
        })
    }
}
```
