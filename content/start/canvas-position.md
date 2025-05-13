# Position properties

( Most of the texts and images on this page were copied from Position Properties – [Pos and Anchor](https://feniksdev.com/renpy-position-properties-pos-and-anchor/) and [align, xycenter, and offset](https://feniksdev.com/renpy-position-properties-align-xycenter-and-offset/). Feniks in these two pages explained very well the properties of Ren'Py positioning, common to many other canvases including Pixi’VN )

---

Before we get into the different positioning properties, know that Pixi’VN considers the default for all position properties to be `{ x: 0, y: 0 }`, which corresponds to the top-left of the element you’re positioning.

Positive numbers will move the element to the right and down. So, something at a position of `{ x: 200, y: 300 }` in the game will be 200 pixels from the left edge of the screen and 300 pixels from the top edge of the screen. Similarly, negative numbers move the element left and up relative to their starting position.

[Position](#position-pixel) and [anchor](#anchor-and-pivot) will make up the bulk of what you use to move elements around on the screen. It’s very important to understand how they work, because most of the other positioning properties act as some combination of these two properties.

## Position (pixel)

Position is used to position the component with the pixel size unit.

You can modify it with 3 properties:

- `x`, for moving things left-to-right (along the x-axis)
- `y`, for moving things top-to-bottom (along the y-axis).
- `position`, is an object that corresponds to `{ x: number, y: number }`. Then you can also use it to set x and y to the same value, `conponent.position = 200`.

## Anchor and pivot

The pivot is an offset, expressed in pixels, from the top-left corner of the component. If you have a component whose texture is 100px x 50px, and want to set the pivot point to the center of the image, you'd set your pivot to (50, 25) - half the width, and half the height.

Anchors are specified in percentages, from 0.0 to 1.0, in each dimension. It has the same utility as the pivot, but to deduce the point where it is located it calculates the percentage of the height and width of the texture. For example, to rotate around the center point of a texture using anchors, you'd set your component's anchor to (0.5, 0.5) - 50% in width and height.

Anchors compared to Pivot are easier to use. You can learn more about their differences [here](https://pixijs.com/8.x/guides/components/sprites#pivot-vs-anchor).

You can modify it with 2 properties:

- `anchor`, is an object that corresponds to `{ x: number, y: number }`. Then you can also use it to set x and y to the same value, `conponent.anchor = 0.5`.
- `pivot`, is an object that corresponds to `{ x: number, y: number }`.

---

**What, exactly, is anchor/pivot?** Let’s think of it in terms of something you may be more familiar with. Instead of positioning an element on a screen, you are trying to pin a photo onto a cork board. You have three things:

- a cork board
- a push pin
- a photograph

Let’s pretend that 1mm is equal to 1 pixel on a computer screen.

![17351596389764883495402859713640](https://github.com/user-attachments/assets/becfa6ac-1156-49ad-8ceb-17b06627be7c)

- The cork board is the screen, or the container you’re trying to position the element inside.
- The photograph is the element.
- Where you put the pin on the photo is the anchor/pivot of the photograph.
- Where you push the pin into on the cork board is the position of the photograph.

By default in Pixi’VN, the push pin always starts in the top left corner of the photo, so to speak. If you want the top-left corner of the photo 200mm from the left side of the cork board, you will put it at x 200. If you also want the top-left corner 300mm down from the top of the board, you will put it at y 300.

![17351597056618553068745888144175](https://github.com/user-attachments/assets/c6955336-1c30-4518-8f05-edd950a1227e)

What if you want the center of the photo at 200mm x 300mm?

This means you need to move where the pin is relative to the photo. The pin will stay at the point (200, 300) on the cork board – you just need to center the photo around that point as well. This means you need to change the anchor/pivot of the photo.

To set the anchor point of the photo to the center of the photo, you can use anchor (0.5, 0.5) or pivot (100, 150)

## Position with percentage

Pixi’VN introduces the ability to position a component by percentage. Its operation is very similar to that of html.

In practice, the percentage will be multiplied by the height or width of the parent component to calculate the position in pixels.

You can modify it with a property:

- `xPercentagePosition`, for moving things left-to-right (along the x-axis)
- `yPercentagePosition`, for moving things top-to-bottom (along the y-axis).
- `percentagePosition`, is an object that corresponds to `{ x: number, y: number }`. Then you can also use it to set x and y to the same value, `conponent.align = 0.5`.

:::tabs
== startLabel.ts

```ts
import { newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    await showImage("egg_head", "egg_head", {
        percentagePosition: 0.5,
        anchor: 0.5,
    });
    await showImage("flower_top", "flower_top", {
        percentagePosition: 0
    });
    await showImage("panda", "panda", {
        xPercentagePosition: 1,
        yPercentagePosition: 0,
        anchor: { x: 1, y: 0 },
    });
    await showImage("skully", "skully", {
        xPercentagePosition: 0,
        yPercentagePosition: 1,
        anchor: { x: 0, y: 1 },
    });
    await showImage("helmlok", "helmlok", {
        percentagePosition: 1,
        anchor: 1
    });
    await showImage("bunny", "bunny", {
        xPercentagePosition: 0.5,
        yPercentagePosition: 1,
        anchor: { x: 0.5, y: 1 },
    });
  },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "panda", src: "https://pixijs.com/assets/panda.png" });
    Assets.add({ alias: "skully", src: "https://pixijs.com/assets/skully.png" });
    Assets.add({ alias: "helmlok", src: "https://pixijs.com/assets/helmlok.png" });
    Assets.add({ alias: "bunny", src: "https://pixijs.com/assets/bunny.png" });
}
```

:::

<sandbox
  template="8sd94f"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>

## Align

Until now we have seen positioning methods influenced by [anchor/pivot](#anchor-and-pivot). The disadvantage of these methods is that if for example you want to add your component to the center of the screen you will first have to set the anchor to 0.5 and then set the position to half the width and height of the screen. This is where the align property comes in.

Align is a feature originally created for ***Ren'Py***, which was also introduced in Pixi’VN. Align combines [position](#position-pixel) and [anchor/pivot](#anchor-and-pivot) to give you a more intuitive way to position your components at the beginning, in the center or in the end of the screen.

Align are specified in percentages, from 0.0 to 1.0, in each dimension. For example if you use 0.25 as a percentage, your component will be positioned at 25% of the screen with anchor at 0.25.

The calculation that is used to calculate the location is the following:

```ts
myComponent.x = (align * (fatherComponent.width - myComponent.width)) + myComponent.pivot + (myComponent.anchor * myComponent.width)
myComponent.y = (align * (fatherComponent.height - myComponent.height)) + myComponent.pivot + (myComponent.anchor * myComponent.height)
```

You can modify it with a property:

- `xAlign`, for moving things left-to-right (along the x-axis)
- `yAlign`, for moving things top-to-bottom (along the y-axis).
- `align`, is an object that corresponds to `{ x: number, y: number }`. Then you can also use it to set x and y to the same value, `conponent.align = 0.5`.

:::tabs
== startLabel.ts

```ts
import { newLabel, showImage } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    async () => {
        await showImage("egg_head", "egg_head", { align: 0.5 });
        await showImage("flower_top", "flower_top", { align: 0 });
        await showImage("panda", "panda", { xAlign: 1, yAlign: 0 });
        await showImage("skully", "skully", { xAlign: 0, yAlign: 1 });
        await showImage("helmlok", "helmlok", { align: 1 });
        await showImage("bunny", "bunny", { xAlign: 0.5, yAlign: 1 });
    },
]);
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: "egg_head", src: "https://pixijs.com/assets/eggHead.png" });
    Assets.add({ alias: "flower_top", src: "https://pixijs.com/assets/flowerTop.png" });
    Assets.add({ alias: "panda", src: "https://pixijs.com/assets/panda.png" });
    Assets.add({ alias: "skully", src: "https://pixijs.com/assets/skully.png" });
    Assets.add({ alias: "helmlok", src: "https://pixijs.com/assets/helmlok.png" });
    Assets.add({ alias: "bunny", src: "https://pixijs.com/assets/bunny.png" });
}
```

:::

<sandbox
  template="yrwkf5"
  entry="/src/labels/startLabel.ts,/src/utils/assets-utility.ts"
/>
