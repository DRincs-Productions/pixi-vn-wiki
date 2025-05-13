# Canvas components functions

## Add a canvas component

To add a canvas component to the game window, you can use the `canvas.add`.
The `add` method have the following parameters:

* `alias`: Is the [alias](/start/canvas-alias.md) to identify the component.
* `component`: The canvas component to add.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const sprite = new Sprite();
        const texture = await Assets.load("egg_head");
        sprite.texture = texture;
        canvas.add("sprite", sprite); // [!code focus]
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
  template="pm3n7c"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Get a canvas component

To get a canvas component from the game window, you can use the `canvas.find`, if the component does not exist, it will return `undefined`.
The `find` method have the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to get.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const sprite = new Sprite();
        const texture = await Assets.load("egg_head");
        sprite.texture = texture;
        canvas.add("sprite", sprite);
    },
    () => {
        const sprite = canvas.find("sprite"); // [!code focus]
        if (sprite) {
            sprite.x = 100;
            sprite.y = 100;
        }
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
  template="k6xqwz"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Remove a canvas component

To remove a canvas component from the game window, you can use the `canvas.remove`.
The `remove` method have the following parameters:

* `alias`: The [alias](/start/canvas-alias.md) of the component to remove.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const sprite = new Sprite();
        const texture = await Assets.load("egg_head");
        sprite.texture = texture;
        canvas.add("sprite", sprite);
    },
    () => {
        canvas.remove("sprite"); // [!code focus]
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
  template="3qfr7m"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Remove all canvas components

To remove all canvas components from the game window, you can use the `canvas.removeAll`.

:::tabs
== startLabel.ts

```ts
import { Assets, canvas, newLabel, Sprite } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        const texture = await Assets.load("egg_head");
        for (let i = 0; i < 3; i++) {
            const sprite = new Sprite();
            sprite.texture = texture;
            sprite.x = i * 150;
            canvas.add(`sprite${i}`, sprite);
        }
    },
    () => {
        canvas.removeAll(); // [!code focus]
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
  template="rnktj2"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Add a listener for a given event

It is recommended to add event-based components, such as buttons, to the [UI](/start/interface.md). But sometimes, such as when creating minigames, you need to add event-based components to the canvas and be able to save the current state of the canvas.

In Pixi’VN, compared to PixiJS, doesn't give the possibility to use a [listener with the `on` method](https://pixijs.com/8.x/examples/events/click), because `on` will associate an event with a lambda and lambdas cannot be saved in the current state of the canvas.

You can use `onEvent`, it have a same behavior that `on`, but it will associate an event with a class that extends `CanvasEvent`.

The `onEvent` method have the following parameters:

* `eventTypes`: The event type that will be listened to. You can read the list of events [here](https://pixijs.com/8.x/guides/components/interaction#event-types).
* `eventClass`: The class that extends `CanvasEvent`, that will be executed when the event is triggered. This class must:
  * have the `fn` method that will be executed when the event is triggered.
  * have the decorator `@eventDecorator`. `@eventDecorator` is a decorator that save the event in memory. It have a optional parameter that is the id of the event (must be unique). If you don't pass the id, the event will be saved with the class name. ( [How enable the decorators in TypeScript?](/start/getting-started#how-enable-the-decorators-in-typescript) )

:::tabs
== ButtonEvent.ts

```ts
import { CanvasEvent, CanvasEventNamesType, eventDecorator, Sprite } from "@drincs/pixi-vn";

@eventDecorator()
export default class ButtonEvent extends CanvasEvent<Sprite> {
    override fn(event: CanvasEventNamesType, sprite: Sprite): void {
        switch (event) {
            case "pointerdown":
                sprite.scale.x *= 1.25;
                sprite.scale.y *= 1.25;
                break;
        }
    }
}
```

== startLabel.ts

```ts
import { newLabel, showImage } from "@drincs/pixi-vn";
import ButtonEvent from "../canvas/events/ButtonEvent";

export const startLabel = newLabel("start_label", [
    async () => {
        const bunny = await showImage("bunny", "bunny", {
            align: 0.5,
            anchor: 0.5,
        });
        // Opt-in to interactivity
        bunny.eventMode = "static";
        // Shows hand cursor
        bunny.cursor = "pointer";
        // Pointers normalize touch and mouse (good for mobile and desktop)
        bunny.onEvent("pointerdown", ButtonEvent); // [!code focus]
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "bunny", src: "https://pixijs.com/assets/bunny.png" });
}
```

:::

<sandbox
  template="k5hqyv"
  entry="/src/labels/ButtonEvent.ts,/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

<!-- TODO ### New component and not use PixiJS Components -->
<!-- TODO ### New method to add remove and find components -->
<!-- TODO ### New method to add listener -->
<!-- TODO ### access to PIXI.Application -->
