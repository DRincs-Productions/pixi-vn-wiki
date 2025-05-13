# Getting Started

You can start using Pixi’VN by [initializing a new project](#project-initialization) or [installing the package](#installation) in an existing project.

## Prerequisites

Before starting, you must have the following tools installed:

* [Node.js](https://nodejs.org/) version 18 or higher.
* Text Editor with TypeScript support.
  * [Visual Studio Code](https://code.visualstudio.com/)
  * [Cursor](https://www.cursor.com/)
  * [VSCodium](https://vscodium.com/)
* (Recommended) [Git](https://git-scm.com/)
  * Have a [GitHub account](https://github.com/)

## Project Initialization

If you want to start a new project, you can use the following command to initialize a new project with the Pixi’VN template:

::: code-group

```sh [npm]
npm create pixi-vn@latest
```

```sh [yarn]
yarn create pixi-vn
```

```sh [pnpm]
pnpm create pixi-vn
```

```sh [bun]
bun create pixi-vn
```

```sh [deno]
deno init --npm pixi-vn
```

:::

The supported template presets are:

::: info More templates will be added in the future
Pixi’VN knows the possibility of proposing templates and helps you in its development. You can follow the development of templates and show your interest from the following thread <https://github.com/DRincs-Productions/pixi-vn/discussions/361>.
:::

**Visual Novel - React**:

<iframe src="https://pixi-vn-react-template.web.app/"
    title="Visual Novel - React"
    style="width:100%; height:400px; border:0; border-radius:4px; overflow:hidden;"
    allowfullscreen
></iframe>

* **[Visual Novel - React - Typescript - Web page](https://github.com/DRincs-Productions/pixi-vn-react-template)**
* **[Visual Novel - React - Typescript - Web page + Desktop + Mobile](https://github.com/DRincs-Productions/pixi-vn-react-template/tree/tauri)**
* **[Visual Novel - React - Ink + Typescript - Web page](https://github.com/DRincs-Productions/pixi-vn-react-template/tree/ink)**
* **[Visual Novel - React - Ink + Typescript - Web page + Desktop + Mobile](https://github.com/DRincs-Productions/pixi-vn-react-template/tree/ink-tauri)**

**Other templates**:

* **[Game engine](https://github.com/DRincs-Productions/pixi-vn-game-engine-template)**

After the project is initialized, you can open the project directory with your text editor (VSCode is recommended) and start developing your visual novel.

Into all templates there is a `README.md` file with more information about the project.

## Installation

For installing the Pixi’VN package in an existing Javascript project, you can use the following command:

::: code-group

```sh [npm]
npm install @drincs/pixi-vn
```

```sh [yarn]
yarn add @drincs/pixi-vn
```

```sh [pnpm]
pnpm add @drincs/pixi-vn
```

```sh [bun]
bun add @drincs/pixi-vn
```

```sh [deno]
deno install npm:@drincs/pixi-vn
```

:::

You can use the CDN version of this plugin:

::: code-group

```html [script tag]
<script src="https://cdn.jsdelivr.net/npm/@drincs/pixi-vn@<version>/+esm"></script>
```

```html [import map]
<script type="importmap">
  { "imports": {
      "@drincs/pixi-vn@<version>":        "https://cdn.jsdelivr.net/npm/@drincs/pixi-vn/+esm"
  } }
</script>
```

```js [js import]
import pixivn from "https://cdn.jsdelivr.net/npm/@drincs/pixi-vn@<version>/+esm";
```

:::

Now you must initialize the Pixi’VN window before using the engine. For example, you can add the following code to the `main.ts` or `index.ts` (It depends on your project configuration):

<iframe height="300" style="width: 100%;" scrolling="no" title="Pixi’VN" src="https://codepen.io/BlackRam-oss/embed/oNrqgNd?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/BlackRam-oss/pen/oNrqgNd">
  Pixi’VN</a> by Black Ram (<a href="https://codepen.io/BlackRam-oss">@BlackRam-oss</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Initialize the Game

Before using the Pixi’VN engine, you must initialize the game. You can do this by calling the `Game.init` method.

The `Game.init` method takes the following arguments:

* `element`: The HTML element to append the canvas to.
* `options`: This is equivalent to the options you can use when initializing a [PixiJS Application](https://pixijs.com/8.x/guides/basics/getting-started#creating-an-application). The following options are mandatory:
  * `width`: The width of the canvas.
  * `height`: The height of the canvas.
* `devtoolsOptions`: This is equivalent to the options you can use when initializing the [PixiJS Devtools](/start/canvas.md#use-pixijs-devtools-with-pixivn).

::: code-group

```ts [src/main.tsx]
import { Game } from "@drincs/pixi-vn";

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

Game.init(body, {
    height: 1080,
    width: 1920,
    backgroundColor: "#303030",
}).then(() => {
    // ...
});

// read more here: https://pixi-vn.web.app/start/other-narrative-features.html#how-manage-the-end-of-the-game
Game.onEnd(async (props) => {
    Game.clear();
    props.navigate("/");
});

Game.onError((type, error, { notify }) => {
    notify("allert_error_occurred");
});
```

```html [index.html]
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

### How enable the decorators in TypeScript?

In Pixi’VN, in some advanced features, it is necessary to use decorators.

By default, TypeScript does not enable the use of decorators. To enable the use of decorators in TypeScript, you must add the following configuration to the `tsconfig.json` file:

```json [tsconfig.json]
{
    "compilerOptions": {
        // ...
        "experimentalDecorators": true
    }
}
```
