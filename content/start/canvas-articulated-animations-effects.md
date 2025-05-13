# Articulated animations and effects

The articulated animations and effects are functions that can be used to perform complex animations and effects. They combine more [primitive animations and effects (Tickers)](/start/canvas-tickers.md) to create a more complex animation or effect. For example, the `Shake` function is an articulated animation that uses more `MoveTicker` to create a shake effect.

## Shake

The `shakeEffect` function is an articulated animation that shakes the canvas element. The function uses more `MoveTicker` to create the shake effect.

This function have the following parameters:

* `alias`: the alias of the canvas element
* `props`: the properties of the shake effect. The properties are:
  * `speed` (Optional): is a number that represents the speed of the shake effect.
  * `shocksNumber` (Optional): the number of shocks.
  * `type` (Optional): the type of the shake effect.
  * `maximumShockSize` (Optional): the maximum size of the shock.
  * `speedProgression` (Optional): in case the shake needs to increase/decrease in speed over time, this property can be used. You can read more about it [here](/start/canvas-tickers.md#speed-progression-property).
  * `startOnlyIfHaveTexture` (Optional): is a boolean that represents if the animation should start only if the canvas component have a texture not empty. If `true` and the canvas component not have a texture, the animation will not edit the `x` and `y` properties, but will be executed. You can read more about it [here](/start/canvas-tickers.md#start-only-if-have-texture-property).
* `priority` (Optional): the priority of the ticker

:::tabs
== startLabel.ts

```ts
import { CANVAS_APP_GAME_LAYER_ALIAS, newLabel, shakeEffect, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("bg", "bg", { scale: 1.3 });
        await showImage("alien", "alien", { align: 0.5 });
        shakeEffect("alien"); // [!code focus]
    },
    async () => {
        shakeEffect(CANVAS_APP_GAME_LAYER_ALIAS); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({alias: "alien", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "bg", src: "https://pixijs.com/assets/bg_grass.jpg" });
}
```

:::

<sandbox
  template="q2nhhq"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>
