# Tickers methods

To play, pause, or stop a ticker, you must use the functions of the `canvas`.

It is important to keep the following behaviors in mind:

* If a ticker does not have any canvas components associated with it, it will be deleted.
* If you [remove a canvas component](/start/canvas-functions.md#remove-a-canvas-component), your alias will be unlinked from the ticker.
* If you add a canvas component with an alias that already exists, the new component will replace the old one. The new component will inherit the tickers of the old component.

## Run a tickerRun a ticker

To add a ticker you must use the `canvas.addTicker` function. This function receives the following parameters:

* `canvasElementAlias`: The alias of the canvas element that will use the ticker. You can pass a string or an array of strings. If you pass an array of strings, the ticker will be associated with all canvas components.
* `ticker`: The [ticker](/start/canvas-tickers.md) instance to be run.

The function returns the id of the ticker that was added.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { yAlign: 0.5, xAlign: 0.25, anchor: 0.5 });
        await showImage("flower_top", "flower_top", { yAlign: 0.5, xAlign: 0.75, anchor: 0.5 });
        let tikerId = canvas.addTicker(["egg_head", "flower_top"], new RotateTicker({})); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
}
```

:::

<sandbox
  template="vfqzch"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Remove a ticker

To remove a ticker, you must use the `canvas.removeTicker` function. This function receives the following parameters:

* `tikerId`: The id or an array of ids of the ticker to be removed.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, RotateTicker, showImage, storage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { yAlign: 0.5, xAlign: 0.25, anchor: 0.5 });
        await showImage("flower_top", "flower_top", { yAlign: 0.5, xAlign: 0.75, anchor: 0.5 });
        let tikerId = canvas.addTicker(["egg_head", "flower_top"], new RotateTicker({}));
        storage.setVariable("tiker_id", tikerId);
    },
    () => {
        let tikerId = storage.getVariable<string>("tiker_id");
        tikerId && canvas.removeTicker(tikerId); // [!code focus]
    },
]);

```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
}
```

:::

<sandbox
  template="zglj8q"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Unlink a canvas component from a ticker

For unlink a canvas component from a ticker class you can use the `canvas.unlinkComponentFromTicker` function. This function receives the following parameters:

* `alias`: The alias of the canvas element that will be unlinked from the ticker. You can pass a string or an array of strings.
* `ticker` (Optional): The ticker class to be unlinked. If you do not pass this parameter, all tickers will be unlinked.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { yAlign: 0.5, xAlign: 0.25, anchor: 0.5 });
        await showImage("flower_top", "flower_top", { yAlign: 0.5, xAlign: 0.75, anchor: 0.5 });
        let tikerId = canvas.addTicker(["egg_head", "flower_top"], new RotateTicker({}));
    },
    () => {
        canvas.unlinkComponentFromTicker("egg_head", RotateTicker); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
}
```

:::

<sandbox
  template="scjm5d"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Force completion of the transition at the end of the step

When the animation has a goal to reach, such as a destination, we sometimes need the animation to reach the goal before the current step ends.

To do this, you can use the `canvas.completeTickerOnStepEnd` function. This function receives the following parameters:

* `step`: The step that the ticker must be completed before the next step. It receives an object with the following properties:
  * `id`: The id of the step.
  * `alias`: If it is a sequence of tickers, the alias of the [sequence of tickers](#sequence-of-tickers).

:::tabs
== startLabel.ts

```ts
import { canvas, MoveTicker, narration, newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { yAlign: 0, xAlign: 0, anchor: 0 });
        let tikerId = canvas.addTicker(["egg_head"],
            new MoveTicker({
                destination: { x: 1, y: 0, type: "align" },
                speed: 1,
            })
        );
        tikerId && canvas.completeTickerOnStepEnd({ id: tikerId }); // [!code focus]
    },
    () => {
        narration.dialogue = "complete";
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

<sandbox
  template="7zgqr6"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Pause and resume a ticker

To pause a ticker, you must use the `canvas.pauseTicker` function. This function receives the following parameters:

* `alias`: The alias of the canvas element that will use the ticker.
* `tickerIdsExcluded`: The tickers that will not be paused.

To resume a paused ticker, you must use the `canvas.resumeTicker` function. This function receives the following parameters:

* `alias`: The alias of the canvas element that will use the ticker.

:::tabs
== startLabel.ts

```ts
import { canvas, narration, newLabel, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { align: 0.5, anchor: 0.5 });
        let tikerId = canvas.addTicker(["egg_head"], new RotateTicker({}));
        narration.dialogue = "start";
    },
    () => {
        canvas.pauseTicker("egg_head"); // [!code focus]
        narration.dialogue = "pause";
    },
    () => {
        canvas.resumeTicker("egg_head"); // [!code focus]
        narration.dialogue = "resume";
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

<sandbox
  template="ns726n"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Sequence of tickers

If you want to run a sequence of tickers, you can use the `canvas.addTickersSequence` function. This function receives the following parameters:

* `canvasElementAlias`: The alias of the canvas element that will use the ticker. Please note that a component alias can only have one sequence sequence of tickers to it. If you add a new sequence of tickers to the same alias, the new sequence will replace the old one.
* `tickers`: An array of tickers to be run in sequence.

:::tabs
== startLabel.ts

```ts
import { canvas, MoveTicker, newLabel, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
async () => {
    await showImage("egg_head", "egg_head", { anchor: 0.5 });
    let tikerId = canvas.addTickersSequence("egg_head", [ // [!code focus]
        new MoveTicker({ // [!code focus]
            destination: { x: 0.5, y: 0.5, type: "align" }, // [!code focus]
        }), // [!code focus]
        new RotateTicker({ speed: 2, clockwise: false }, 2), // [!code focus]
    ]); // [!code focus]
},
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

<sandbox
  template="k3wj6d"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

### Pause

If you want to pause the steps for a while, you can use the `Pause` token. The `Pause` token receives the time in seconds to pause.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, Pause, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { anchor: 0.5, align: 0.5 });
        let tikerId = canvas.addTickersSequence("egg_head", [ // [!code focus]
            new RotateTicker({ speed: 1, clockwise: true }, 2), // [!code focus]
            Pause(1), // [!code focus]
            new RotateTicker({ speed: 1, clockwise: false }, 2), // [!code focus]
        ]); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

<sandbox
  template="y25tgn"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

### Repeat

If you want to repeat the steps, you can use the `Repeat` token.

:::tabs
== startLabel.ts

```ts
import { canvas, newLabel, Repeat, RotateTicker, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", {
            anchor: 0.5,
            align: 0.5,
        });
        let tikerId = canvas.addTickersSequence("egg_head", [ // [!code focus]
            new RotateTicker({ speed: 1, clockwise: true }, 2), // [!code focus]
            new RotateTicker({ speed: 2, clockwise: false }, 2), // [!code focus]
            Repeat, // [!code focus]
        ]); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
}
```

:::

<sandbox
  template="d3f7gv"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>
