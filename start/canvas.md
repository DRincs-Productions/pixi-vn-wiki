# PixiJS canvas

<img src="https://pixijs.com/images/logo.svg" alt="drawing" width="200" style="margin-top: 10px;" />

Pixi’VN uses [PixiJS](https://pixijs.com/8.x/guides/basics/what-pixijs-is) to render the visual novel. You can use the Pixi’VN API to add images, text, and animations to the canvas PixiJS.

In addition to being able to interact with the canvas from JavaScript/TypeScript, you can also use other narrative languages:

- [***ink***](/ink/ink-canvas.md)
- Ren'Py (Under development)

## What is PixiJS?

PixiJS is the fastest, most lightweight 2D library available for the web, working across all devices and allowing you to create rich, interactive graphics and cross-platform applications using WebGL and WebGPU. It is fast, flexible, and easy to use. It is used in games like [Good Pizza, Great Pizza](https://www.goodpizzagreatpizza.com/) and [The Enchanted Cave 2](https://store.steampowered.com/app/368610/The_Enchanted_Cave_2/).

You can learn more about PixiJS on the [PixiJS website](https://www.pixijs.com/).

## Differences between Pixi’VN and PixiJS

Pixi’VN provides a API object called `canvas` used to interface with Pixi’VN's PixiJS application. So you don't need to install pixi.js and the features of Pixi'VN is not equivalent to that of PixiJS. Although not recommended, you can still install pixi.js and use canvas.app to access the PixiJS application.

The use of Pixi’VN, in rendering, is very similar to that of PixiJS. The only differences are as follows:

- All the components added in the canvas will be linked to an [alias](/start/canvas-alias.md) of your choice. This alias will be used to identify the component and to manipulate it.
- Compared to PixiJS, Pixi’VN saves the current canvas state at each [step](/start/labels.md).
**Attention**: when saving the canvas state, only components linked to an alias will be saved (if you added components by directly accessing `PixiJS.Application`, they will not be considered).
- Pixi’VN provides [various functionalities](/start/canvas-functions.md) to add, remove, find... components in the canvas.
- Pixi’VN provides [their components](/start/canvas-components.md) of which some correspond to PixiJS while others are added to add some features.
- Just like for the components, the [tickers](/start/canvas-tickers-functions.md) are managed by Pixi’VN. If you use a PixiJS ticker, the ticker state will not be saved.
- You can't set a listener with the `on` method, but must use the [onEvent](/start/canvas-functions.md#add-a-listener-for-a-given-event) to add a listener.

## Use PixiJS DevTools with Pixi’VN

[**PixiJS DevTools**](https://pixijs.io/devtools/) is a [Chrome extension](https://chromewebstore.google.com/detail/pixijs-devtools/dlkffcaaoccbofklocbjcmppahjjboce) that allows you to inspect and debug PixiJS applications. You can use it to view the display list, inspect textures, and debug your PixiJS application. You can use it with Pixi’VN to inspect the canvas and debug your visual novel.

![devtools](https://pixijs.io/devtools/gif/devtool-properties.gif)

For access to the PixiJS DevTools after installing it, you need to open the Chrome DevTools (F12) and go to the `PixiJS` tab.

![image](https://github.com/user-attachments/assets/579a181f-b865-44ff-9b55-2fbe609632bc)
