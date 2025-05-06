# Interfaccia utente (UI) con JavaScript Framework

Pixi’VN does not offer any components to create the game UI. As it is designed, the UI must be created using external JavaScript Frameworks.

Con "UI" si intendono gli elementi che si trovano sopra l'area di disegno, come pulsanti, moduli, ecc.

![Frame_Aufbau](https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2FPixiVN_interface.png?alt=media)

Ciò consente l'utilizzo di sistemi come React, Vue, Angular, ecc. per creare **schermate UI** molto più complesse con prestazioni eccellenti.

- [Angular](/start/interface-angular.md)
- [React Interface](/start/interface-react.md)
- [Vue](/start/interface-vue.md)

Pixi’VN offers the possibility of adding an HTML Element with the same dimensions as the [PixiJS Canvas](/start/canvas-components.md) to add an **UI** with a JavaScript frameworks.

## Differenze tra l'interfaccia utente e il canvas

As Pixi’VN was designed and conceived, the UI and the canvas are two distinct and independent elements. L'interfaccia utente si trova sopra la tela e viene utilizzata per creare pulsanti, moduli, ecc. La tela viene utilizzata per visualizzare immagini, video, ecc.

All information about the current state of the canvas is included in the save and it is possible to restore the state of a previous step. The current state of the UI will not be included in the saves. So you have to [manage it yourself by saving the information](/start/interface-connect-storage.md) you need to [game storage](/start/storage.md) or browser storage.

In the canvas you can add components during each step. In the UI you can't do that, you can create several ["screens" and navigate between them](/start/interface-connect-storage.md).

In the canvas you can only add PixiJS components, they are usually composed of images and are very simple. In the UI you can add any HTML element or use any UI component library, so you can create much more complex interfaces.

## How to enable UI interaction?

By default, all HTML elements of the UI have the `pointer-events: none` style.
The reason is that because the html UI is above the canvas, all clicks are intercepted by the UI and not by the canvas.

So you must set the `pointer-events: auto` style only for the elements (example a button, a form, etc...) that you want to interact with the user.
