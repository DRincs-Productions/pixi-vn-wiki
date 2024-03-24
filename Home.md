( the wiki is under development )

# Pixi'VN

Pixi'VN is a npm package that provides various features for creating visual novels.

Pixi'VN has functions to manage story steps, saving and loading, variable storage, dialogues, and character creation.

Pixi'VN is based on [Pixi.js](https://pixijs.com/), a modern 2D rendering engine, expanding the features by adding a save and load system, and functions to simplify the addition of images and animations.

## Use Pivi'VN Template

( Coming soon )

## Get Started

### Installation

```bash
npm install pixi-vn
```

### Usage

For the following example we will use TypeScript, but you can use JavaScript as well.

```typescript
// main.ts
import { GameWindowManager } from '@drincs/pixi-vn'
import App from './App'
import './index.css'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

await GameWindowManager.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
})
```

This is the HTML file that will be used to load the application.

## Add JavaScript framework for interface

In addition to managing the Pixi.js "Canvas", Pixi'VN offers the possibility of adding an HTML Element with the same dimensions as the "Canvas" to add interactions with the user.

This allows the use of systems such as React, Vue, Angular, etc. to create much more complex interfaces with excellent performance.

To switch between interface screens (without interrupting the canvas), you can use popups, modals, or even a full screen interface, or navigate between different routes.
For example, you can use [React Router](https://reactrouter.com/en/main) to navigate between different routes.

### Enable Interaction with the Interface

By default, all elements of the interface have the `pointer-events: none` style, because the canvas is above the interface.
So you must set the `pointer-events: auto` style to the elements that you want to interact with.

### Use Angular

( Coming soon )

### Use React

```typescript
// main.tsx
import { GameWindowManager } from '@drincs/pixi-vn'
import { createRoot } from 'react-dom/client'

// GameWindowManager.initialize...

// React setup with ReactDOM
const root = document.getElementById('root')
if (!root) {
    throw new Error('root element not found')
}

GameWindowManager.initializeHTMLLayout(root)
const reactRoot = createRoot(GameWindowManager.htmlLayout)

reactRoot.render(
    <App />
)
```

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/pixiVN.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pixi'VN</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

```css
/* index.css */
:root {
  background-color: #242424;
}

body {
  margin: 0;
  display: flex;
}
```

### Use Vue

( Coming soon )

## Next Steps

After setting up the interface, you can start creating the visual novel using Pixi'VN functions.

* [Characters](Characters)
* [Dialogue and Narration](Dialogue-and-Narration)
* [Menus or Game Choice](Menus-or-Game-Choice)
* [Label and Game Step](Label-and-Game-Step)
* [Game Storage](Game-Storage)
* [Save and Load](Save-and-Load)
