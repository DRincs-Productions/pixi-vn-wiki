# Use canvas in *ink*

The ***ink* + Pixi’VN integration** introduces the a # script that allows you to show, edit, remove and etc. a [canvas component](/start/canvas-components.md).

The syntax is as follows:

`#` + `[operation]` + `[type of the canvas component]` + `[alias]` + `[parameters]`

Where:

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[operation]`: It is the operation that you want to execute with the canvas component. The available operations are:
  * `show`: Show a canvas component. (Read more [here](#show-a-canvas-component-in-ink))
  * `edit`: Edit a canvas component. (Read more [here](#edit-a-canvas-component-in-ink))
  * `remove`: Remove a canvas component. (Read more [here](#remove-a-canvas-component-in-ink))
  * `pause` (Only for video): Pause a video canvas component. (Read more [here](#pause-a-video-in-ink))
  * `resume` (Only for video): Resume a video canvas component. (Read more [here](#resume-a-video-in-ink))
* `[type of the canvas component]` It is the type of the canvas component. The available types are:
  * [`image`](/start/canvas-images.md)
  * [`imagecontainer`](/start/canvas-image-container.md)
  * [`video`](/start/canvas-videos.md)
* `[alias]` It is the [alias of the canvas component](/start/canvas-alias.md). The alias is a string that identifies the canvas component.
  * If the alias includes spaces, you must use double quotes.
* `[parameters]` It is the parameters of the operation. The parameters depend on the operation.
  * If the parameters include spaces, you must use double quotes.
  * If the parameters is a object, you must use the JSON format and the first character must be `\{` and the last character must be `\}`. Example: `\{ "color": "red", isVisble: true, position: { x: 100, y: 100 } \}`

<sandbox
  template="rxzx5z"
  entry="/src/ink/start.ink,/src/utils/assets-utility.ts"
/>

## Show a canvas component in *ink*

You can use the `show` to show a [canvas component](/start/canvas-components.md) in ***ink***.

Is raccomended to [initialize the asset matrix at project start](/start/assets-management.md#initialize-the-asset-matrix-at-project-start) to use the alias of texture in `[URL/path of the image]`.

The syntax is as follows:

`#` + `show` + `[type of the canvas component]` + `[alias]` + `[URL/path of the image]` + `[parameters]`

* `[URL/path of the image]` (Optional): It is the URL/path of the image that you want to show. If you have initialized the asset matrix at project start, you can use the alias of the texture. If you don't provide the URL/path of the image, this parameter is equal to `[alias]`. Keep in mind that to write `https://` in ***ink*** you must use `https:\/\/` because the `//` is considered a comment in ***ink***.
* `[parameters]` (Optional): Afer the URL/path of the image, you can add the `parameters` of the [canvas component](/start/canvas-components.md) that you want to set. The `parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

:::tabs
== start.ink

```ink
# show image eggHead
# show image "eggHead 2" eggHead x 20 y 30
# show image flowerTop x 20 y 30 visible true cursor "pointer" alpha 0.5
# show video my_video
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: "my_video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::

### Show a image container in *ink*

Since the container contains a list of images, the command to show a container accepts a list of strings instead of accepting a string:

* `[list of URL/path of the image]`: It is the list of URL/path of the images that you want to show. If you have initialized the [asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start), you can use the alias of the texture. Keep in mind that to write `https://` in ***ink*** you must use `https:\/\/` because the `//` is considered a comment in ***ink***.

:::tabs
== start.ink

```ink
=== start ===
# show imagecontainer james [m01-body m01-eyes m01-mouth] xAlign 0.5 yAlign 1
# show imagecontainer sly [fm01-body fm01-eyes fm01-mouth] xAlign 0.2 yAlign 1 with movein
# show imagecontainer steph [fm02-body fm02-eyes fm02-mouth] xAlign 0.8 yAlign 1 with dissolve
# pause
-> start
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn"

export async function defineAssets() {
    // female character 01
    Assets.add({ alias: 'fm01-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-body.webp?alt=media" })
    Assets.add({ alias: 'fm01-eyes', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-eyes-smile.webp?alt=media" })
    Assets.add({ alias: 'fm01-mouth', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-mouth-smile00.webp?alt=media" })
    // female character 02
    Assets.add({ alias: 'fm02-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm02%2Ffm02-body.webp?alt=media" })
    Assets.add({ alias: 'fm02-eyes', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm02%2Ffm02-eyes-smile.webp?alt=media" })
    Assets.add({ alias: 'fm02-mouth', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm02%2Ffm02-mouth-smile00.webp?alt=media" })
    // male character 01
    Assets.add({ alias: 'm01-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" })
    Assets.add({ alias: 'm01-eyes', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-smile.webp?alt=media" })
    Assets.add({ alias: 'm01-mouth', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-mouth-smile00.webp?alt=media" })
}
```

:::

<sandbox
  template="sndrvv"
  entry="/src/ink/start.ink,/src/utils/assets-utility.ts"
/>

### Show a canvas component with transition in *ink*

If you want to show the canvas component with a [transition](/start/canvas-transition.md), you can add into the parameters the `with [transitionType]`.

`#` + `show` + `[type of the canvas component]` + `[alias]` + `[URL/path of the image]` + `[parameters]` + `with` + `[transitionType]`

After the `transitionType`, you can add the `transition parameters`. the `transition parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

The syntax is as follows:

`#` + `show` + `[type of the canvas component]` + `[alias]` + `[URL/path of the image]` + `[parameters]` + `with` + `[transitionType]` + `[transition parameters]`

The available transitions are:

* `dissolve`: The canvas component appears with a [dissolve transition](/start/canvas-transition.md#dissolve-transition). You can add all the parameters you would use in JS/TS.
* `fade`: The canvas component appears with a [fade transition](/start/canvas-transition.md#fade-transition). You can add all the parameters you would use in JS/TS.
* `movein`: The canvas component appears with a [movein transition](/start/canvas-transition.md#move-inout-transition). You can add all the parameters you would use in JS/TS.
* `zoomin`: The canvas component appears with a [zoomin transition](/start/canvas-transition.md#zoom-inout-transition). You can add all the parameters you would use in JS/TS.
* `pushin`: The canvas component appears with a [pushin transition](/start/canvas-transition.md#push-inout-transition). You can add all the parameters you would use in JS/TS.

:::tabs
== start.ink

```ink
# show eggHead with dissolve duration 3
temp durationVar = 3
# show eggHead eggHead2 with fade duration {durationVar}
# show flowerTop x 20 y 30 with movein
# show helmlok x 20 y 30 with zoomin
# show skully x 20 y 30 with pushin
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn";

export async function defineAssets() {
    Assets.add({ alias: 'eggHead', src: "https://pixijs.com/assets/eggHead.png" })
    Assets.add({ alias: 'flowerTop', src: "https://pixijs.com/assets/flowerTop.png" })
    Assets.add({ alias: 'helmlok', src: "https://pixijs.com/assets/helmlok.png" })
    Assets.add({ alias: 'skully', src: "https://pixijs.com/assets/skully.png" })
}
```

:::

## Edit a canvas component in *ink*

You can use the `edit` to edit a [canvas component](/start/canvas-components.md) in ***ink***.

The syntax is as follows:

`#` + `edit` + `[type of the canvas component]` + `[alias]` + `[parameters]`

* `[parameters]`: In the `parameters` you must include the properties that you want to edit. The `parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

```ink
# edit image bg position \{ "x": 20, "y": 30 \} visible true  cursor "pointer" alpha 0.5 
```

## Remove a canvas component in *ink*

You can use the `remove` to remove a [canvas component](/start/canvas-components.md) in ***ink***.

The syntax is as follows:

`#` + `remove` + `[type of the canvas component]` + `[alias]`

```ink
# remove image bg
# remove image "bg 2"
```

### Remove a canvas component with transition in *ink*

If you want to remove the canvas component with a [transition](/start/canvas-transition.md), you can add after the alias of the canvas component `with [transitionType]`.

`#` + `remove` + `[type of the canvas component]` + `[alias]` + `with` + `[transitionType]`

After the `transitionType`, you can add the `transition parameters`. the `transition parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

The syntax is as follows:

`#` + `remove` + `[type of the canvas component]` + `[alias]` + `with` + `[transitionType]` + `[transition parameters]`

The available transitions are:

* `dissolve`: The canvas component disappears with a [dissolve transition](/start/canvas-transition.md#dissolve-transition). You can add all the parameters you would use in JS/TS.
* `fade`: The canvas component disappears with a [fade transition](/start/canvas-transition.md#fade-transition). You can add all the parameters you would use in JS/TS.
* `moveout`: The canvas component disappears with a [moveout transition](/start/canvas-transition.md#move-inout-transition). You can add all the parameters you would use in JS/TS.
* `zoomout`: The canvas component disappears with a [zoomout transition](/start/canvas-transition.md#zoom-inout-transition). You can add all the parameters you would use in JS/TS.
* `pushout`: The canvas component disappears with a [pushout transition](/start/canvas-transition.md#push-inout-transition). You can add all the parameters you would use in JS/TS.

```ink
# remove image bg with dissolve duration 3
temp durationVar = 3
# remove image bg with fade duration {durationVar}
# remove image bg with moveout
# remove image bg with zoomout
# remove image bg with pushout
```

## Use the effects in *ink*

You can use the `[effectType]` to use the [effects](/start/canvas-animations-effects.md) in ***ink***.

The syntax is as follows:
  
`#` + `[effectType]` + `[alias]` + `[parameters]`

The available effects are:

* `fade`: Create a fade effect. (Read more [here](/start/canvas-animations-effects.md#fade)). You can add all the parameters you would use in JS/TS.
* `move`: Create a move effect. (Read more [here](/start/canvas-animations-effects.md#move)). You can add all the parameters you would use in JS/TS. To simplify the use:
  * you can use instead of `destination \{ x: 20, y: 30, type: "pixel" \}` the `x 20 y 30`.
  * you can use instead of `destination \{ x: 0.5, y: 0.5, type: "align" \}` the `xAlign 0.5 yAlign 0.5`.
  * you can use instead of `destination \{ x: 0.5, y: 0.5, type: "percentage" \}` the `xPercentage 0.5 yPercentage 0.5`.
* `rotate`: Create a rotate effect. (Read more [here](/start/canvas-animations-effects.md#rotate)). You can add all the parameters you would use in JS/TS.
* `zoom`: Create a zoom effect. (Read more [here](/start/canvas-animations-effects.md#zoom)). You can add all the parameters you would use in JS/TS.
* `shake`: Create a shake effect. (Read more [here](/start/canvas-animations-effects.md#shake)). You can add all the parameters you would use in JS/TS.
  
```ink
# fade bg duration 3
temp durationVar = 3
# fade bg duration {durationVar}
# move bg x 20 y 30 duration 3
# rotate bg clockwise false duration 3
# zoom bg scale 2 duration 3
# shake bg duration 3
```

## Pause and resume a video in *ink*

:::tabs
== start.ink

```ink
=== start ===
# show video my_video
Video started
# pause video my_video
Video paused
# resume video my_video
Video resumed
-> start
```

== assets-utility.ts

```ts
import { Assets } from "@drincs/pixi-vn"

export async function defineAssets() {
    Assets.add({ alias: "my_video", src: "https://pixijs.com/assets/video.mp4" });
}
```

:::

<sandbox
  template="p3qgjq"
  entry="/src/ink/start.ink,/src/utils/assets-utility.ts"
/>

### Pause a video in *ink*

To pause a video in ***ink***, you can use `pause`.

The syntax is as follows:

`#` + `pause` + `video` + `[alias]`

```ink
# pause video bg
# pause video "bg 2"
```

### Resume a video in *ink*

To resume a video in ***ink***, you can use `resume`.

The syntax is as follows:

`#` + `resume` + `video` + `[alias]`

```ink
# resume video bg
# resume video "bg 2"
```
