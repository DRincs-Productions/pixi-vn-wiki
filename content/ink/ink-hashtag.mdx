# Custom hashtag script

***ink*** gives the ability to use the `#` character to define custom hashtag scripts. Pixi’VN uses this feature to add custom functionality to the ink script, for example, to interact with the canvas.

Pixi’VN gives the developer the ability to intercept the event that parses the scripts # to add custom functionality. This is done through the `onInkHashtagScript` function.

The `onInkHashtagScript` function receives a callback function that will be called whenever a hashtag script is found in the ink script. The callback function returns a boolean or a string. The return value will be used to determine if the script was processed.

* If it is not returned or returns `false`, the script will be processed by the default functionality of Pixi’VN.
* If it returns `true`, the script will not be processed by the default functionality of Pixi’VN.
* If it returns a string, the string will be used as the new hashtag script. For example, if you want to add a feature that shows the image linked to a character `# show character alice xAlign 0.8 yAlign 1 with dissolve`, you can return `# show imagecontainer alice [alice-body alice-eyes alice-mouth] xAlign 0.8 yAlign 1 with dissolve` for leverage the [existing functionality to add a container](/ink/ink-canvas.md#show-a-image-container-in-ink).

The callback function receives two parameters:

* `script`: an array with the hashtag script split by spaces. For add a space in a string, you need to use `""`. For example, the Hashtag-Script `# command "Hello World"` will be split into `["command", "Hello World"]`.
* `convertListStringToObj`: a function that receives an array of strings and returns an object. This function is used to convert a list of strings into an object. For example, the array `["prop1", "value 1", "prop2", "value 2"]` will be converted to `{prop1: "value 1", prop2: "value 2"}`.

:::tabs
== main.ts

```ts
import { onInkHashtagScript } from '@drincs/pixi-vn-ink'

onInkHashtagScript((script, convertListStringToObj) => {
    // script: ["navigate", "scene_name", "relative", "path"]
    if (script[0] === "navigate" && script.length > 1) {
        let prop = undefined
        if (script.length > 2) {
            // prop: {relative: "path"}
            prop = convertListStringToObj(script.slice(2))
        }
        navigateTo(script[1], prop)
        return true
    }
    return false
})
```

== start.ink

```ink
=== start ===
# navigate /game relative path
-> DONE
```

:::
