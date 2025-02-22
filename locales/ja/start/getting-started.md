# Getting Started

You can start using Pixi’VN by [initializing a new project](#project-initialization) or [installing the package](#installation) in an existing project.

## Prerequisites

Before starting, you must have the following tools installed:

- [Node.js](https://nodejs.org/) version 18 or higher.
- Text Editor with TypeScript support.
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Cursor](https://www.cursor.com/)
  - [VSCodium](https://vscodium.com/)
- (Recommended) [Git](https://git-scm.com/)
  - Have a [GitHub account](https://github.com/)

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

**Visual Novel - React**:

<iframe src="https://pixi-vn-react-template.web.app/"
    title="Visual Novel - React"
    style="width:100%; height:400px; border:0; border-radius:4px; overflow:hidden;"
></iframe>

- **[Visual Novel - React - Typescript - Web page](https://github.com/DRincs-Productions/pixi-vn-react-template)**
- **[Visual Novel - React - Typescript - Web page + Desktop + Mobile](https://github.com/DRincs-Productions/pixi-vn-react-template/tree/tauri)**
- **[Visual Novel - React - Ink + Typescript - Web page](https://github.com/DRincs-Productions/pixi-vn-react-template/tree/ink)**
- **[Visual Novel - React - Ink + Typescript - Web page + Desktop + Mobile](https://github.com/DRincs-Productions/pixi-vn-react-template/tree/ink-tauri)**

:::info More templates will be added in the future
Pixi’VN knows the possibility of proposing templates and helps you in its development. You can follow the development of templates and show your interest from the following thread <https://github.com/DRincs-Productions/pixi-vn/discussions/361>.
:::

After the project is initialized, you can open the project directory with your text editor (VSCode is recommended) and start developing your visual novel.

Into all templates there is a `README.md` file with more information about the project.

## Installation

For installing the Pixi’VN package in an existing (node.js) project, you can use the following command:

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

For using the Pixi’VN package in a browser, you can use the following script tag:

::: code-group

```html [script tag]
<script src="https://cdn.jsdelivr.net/npm/@drincs/pixi-vn/+esm"></script>
```

```html [import map]
<script type="importmap">
  { "imports": {
      "@drincs/pixi-vn":        "https://cdn.jsdelivr.net/npm/@drincs/pixi-vn/+esm"
  } }
</script>
```

```js [js import]
import pixivn from "https://cdn.jsdelivr.net/npm/@drincs/pixi-vn/+esm";
```

:::

Now you must initialize the Pixi’VN window before using the engine. For example, you can add the following code to the `main.ts` or `index.ts` (It depends on your project configuration):

<iframe height="300" style="width: 100%;" scrolling="no" title="Pixi’VN" src="https://codepen.io/BlackRam-oss/embed/oNrqgNd?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/BlackRam-oss/pen/oNrqgNd">
  Pixi’VN</a> by Black Ram (<a href="https://codepen.io/BlackRam-oss">@BlackRam-oss</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

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
