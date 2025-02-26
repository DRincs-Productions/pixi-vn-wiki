# Initialize the canvas

To use the canvas you must first initialize it. This is done by calling the `initialize` method on the canvas object.

The `initialize` method takes the following arguments:

- `element`: The HTML element to append the canvas to.
- `options`: This is equivalent to the options you can use when initializing a [PixiJS Application](https://pixijs.com/8.x/guides/basics/getting-started#creating-an-application). The following options are mandatory:
  - `width`: The width of the canvas.
  - `height`: The height of the canvas.
- `devtoolsOptions`: This is equivalent to the options you can use when initializing the [PixiJS Devtools](/start/canvas.md#use-pixijs-devtools-with-pixivn).

:::tabs
\== main.ts

```ts
import { canvas } from '@drincs/pixi-vn'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

canvas.initialize(body, {
    width: 1920,
    height: 1080,
    backgroundColor: "#303030"
}).then(() => {
    // ...
})
```

\== index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Game</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

:::
