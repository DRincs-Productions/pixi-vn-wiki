# User Interface (UI) with JavaScript Framework

Pixi’VN does not offer, intentionally, any components to create a game UI. As conceived, the UI must be created using external JavaScript Frameworks.

By "UI" is meant the elements that are above the canvas, such as buttons, forms, etc.

![Frame_Aufbau](https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2FPixiVN_interface.png?alt=media)

This allows the use of systems such as React, Vue, Angular, etc. to create much more complex **UI screens** with excellent performance.

* [Angular](/start/interface-angular.md)
* [React Interface](/start/interface-react.md)
* [Vue](/start/interface-vue.md)

Pixi’VN offers the possibility of adding an HTML Element with the same dimensions as the [PixiJS Canvas](/start/canvas-components.md) to add an **UI** with a JavaScript frameworks.

## Differences between the UI and the canvas

As Pixi’VN was designed and conceived, the UI and the canvas are two distinct and independent elements. The UI is above the canvas and is used to create buttons, forms, etc. The canvas is used to display images, videos, etc.

All information about the current state of the canvas is included in the save and it is possible to restore the state of a previous step. The current state of the UI will not be included in the saves. So you have to [manage it yourself by saving the information](/start/interface-connect-storage.md) you need to [game storage](/start/storage.md) or browser storage.

In the canvas you can add components during each step. In the UI you can't do that, you can create several ["screens" and navigate between them](/start/interface-connect-storage.md).

In the canvas you can only add PixiJS components, they are usually composed of images and are very simple. In the UI you can add any HTML element or use any UI component library, so you can create much more complex interfaces.

## How to enable UI interaction?

By default, all HTML elements of the UI have the `pointer-events: none` style.
The reason is that because the html UI is above the canvas, all clicks are intercepted by the UI and not by the canvas.

So you must set the `pointer-events: auto` style only for the elements (example a button, a form, etc...) that you want to interact with the user.
