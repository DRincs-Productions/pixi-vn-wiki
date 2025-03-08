# ![icon](/react.svg){style="width:40px;height:40px;margin-right:10px;float:left"} React UI

**What is React?** React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.

You can learn more about React on the [React website](https://react.dev/).

## How add Pixi’VN to a React application

:::info React template
There are some Pixi’VN templates available that use React. You can read more about them in the [templates](/start/getting-started.md#project-initialization) section.

Instead if you want to add Pixi’VN to an existing React application, you can follow the steps below.
:::

First of all you need to have a React application and [install pixi-vn](/start/getting-started.md#installation). Is recommended to use [Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) to create a new React application.

Now you can replace the content of following files with the code below:

::: code-group

```tsx [src/main.tsx]
import { canvas, Container, RotateTicker, showImage } from '@drincs/pixi-vn' // [!code ++]
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render( // [!code --]
const body = document.body; // [!code ++]
if (!body) { // [!code ++]
  throw new Error("body element not found"); // [!code ++]
} // [!code ++]
 // [!code ++]
canvas // [!code ++]
  .initialize(body, { // [!code ++]
    height: 1080, // [!code ++]
    width: 1920, // [!code ++]
    backgroundColor: "#303030", // [!code ++]
  }) // [!code ++]
  .then(() => { // [!code ++]
 // [!code ++]
    // Pixi.JS UI Layer [!code ++]
    canvas.addLayer("ui", new Container()); // [!code ++]
    showImage( // [!code ++]
      "juliette", // [!code ++]
      "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fcharacters%2Fjuliette-icon.webp?alt=media&token=cbcdd613-12e4-48b5-b7b3-16443b4e125e", // [!code ++]
      { xAlign: 0.9, yAlign: 0.1, anchor: 0.5 } // [!code ++]
    ); // [!code ++]
    canvas.addTicker("juliette", new RotateTicker({ speed: 1 })); // [!code ++]
 // [!code ++]
    // React setup with ReactDOM [!code ++]
    const root = document.getElementById("root"); // [!code ++]
    if (!root) { // [!code ++]
      throw new Error("root element not found"); // [!code ++]
    } // [!code ++]
 // [!code ++]
    canvas.initializeHTMLLayout(root); // [!code ++]
    if (!canvas.htmlLayout) { // [!code ++]
      throw new Error("htmlLayout not found"); // [!code ++]
    } // [!code ++]
    const reactRoot = createRoot(canvas.htmlLayout); // [!code ++]
 // [!code ++]
    reactRoot.render( // [!code ++]
      <StrictMode>
        <App />
      </StrictMode>,
    ); // [!code ++]
  } // [!code ++]
) // [!code ++]
```

```css [src/index.css]
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center; /* [!code --] */
  min-width: 320px; /* [!code --] */
  min-height: 100vh; /* [!code --] */
  overflow: hidden; /* [!code ++] */
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

```tsx [src/App.tsx]
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
// [!code ++]
          // Read here: https://pixi-vn.web.app/start/interface#how-to-enable-ui-interaction [!code ++]
          style={{ pointerEvents: "auto" }} // [!code ++]
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

```css [src/App.css]
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem; /* [!code --] */
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title> <!-- [!code --] -->
    <title>Vite + React + Pixi’VN</title> <!-- [!code ++] -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

:::

## Best React component libraries

To create a beautiful user interface you can use some of the best React UI component libraries:

- [MUI](https://mui.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Fluent UI](https://react.fluentui.dev/?path=/docs/concepts-introduction--docs)
- [Primer Design System](https://primer.style/)
- [ReactPixi](https://pixijs.io/pixi-react/) + [PixiUI](https://pixijs.io/ui/)
- [Chakra UI](https://chakra-ui.com/)
- [Ant Design](https://ant.design/)
- [Grommet](https://v2.grommet.io/)
- [Evergreen](https://evergreen.segment.com/)
