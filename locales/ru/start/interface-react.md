# React UI

<img src="https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Freact-logo.png?alt=media" alt="drawing" width="200" style="margin-top: 10px;" />

[React](https://react.dev/) is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.

## How add React UI to Pixi’VN?

To add a React UI to Pixi’VN, you need to create a new React application and add it to the HTML layout of the Pixi’VN application.

```tsx
// main.tsx
import { canvas } from '@drincs/pixi-vn'
import { createRoot } from 'react-dom/client'

// canvas.initialize...
canvas.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
}).then(() => {
    // React setup with ReactDOM
    const root = document.getElementById('root')
    if (!root) {
        throw new Error('root element not found')
    }

    canvas.initializeHTMLLayout(root)
    if (!canvas.htmlLayout) {
        throw new Error('htmlLayout not found')
    }
    const reactRoot = createRoot(canvas.htmlLayout)

    reactRoot.render(
        <App />
    )
})
```

This is the HTML file that will be used to load the application.

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/pixiVN.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pixi’VN</title>
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

## Best React UI Component

The Best React component library:

- [MUI](https://mui.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Fluent UI](https://react.fluentui.dev/?path=/docs/concepts-introduction--docs)
- [Primer Design System](https://primer.style/)
- [ReactPixi](https://pixijs.io/pixi-react/) + [PixiUI](https://pixijs.io/ui/)
- [Chakra UI](https://chakra-ui.com/)
- [Ant Design](https://ant.design/)
- [Grommet](https://v2.grommet.io/)
- [Evergreen](https://evergreen.segment.com/)
