# Canvas alias

The canvas alias is a way to reference a component in the canvas by a name. This name is used to reference the component in the script.

The alias is unique, if a component is added using an existing alias the new component will replace the old one.

The alias corresponds to `PixiJSComponent.label`, so do not modify `label`, use the [methods provided by Pixi’VN](/start/canvas-functions.md).

## Heredity factor

If a component is added using an existing alias the new component, in addition to replacing the old one, will inherit the properties, the zIndex and the [tickers](/start/canvas-tickers.md) of the old component.

<sandbox
  template="6yql5k"
  entry="/src/ink/start.ink,/src/utils/assets-utility.ts"
/>

## Edit canvas component alias

To edit the alias of a canvas component, you can use the `canvas.editAlias`. If the alias has a or more [tickers](/start/canvas-tickers.md) associated, it will be automatically edited in the ticker.

The `editAlias` method have the following parameters:

* `oldAlias`: The old alias of the component to edit.
* `newAlias`: The new alias of the component.

```typescript
import { canvas } from '@drincs/pixi-vn'

canvas.editAlias('sprite1', 'sprite2')
```

## Game layer alias

In PixiJS the game layer is the layer that contains all the canvas components of the game. This layer is the first layer added to the canvas.

This component has been assigned a special alias, `CANVAS_APP_GAME_LAYER_ALIAS`, which is used to reference the game layer in the script.

This is very useful if you want to run some [animations or effects](/start/canvas-animations-effects.md) at the entire window. Not all features are allowed with this alias, such as deleting.

```typescript
import { CANVAS_APP_GAME_LAYER_ALIAS, shakeEffect } from '@drincs/pixi-vn'

shakeEffect(CANVAS_APP_GAME_LAYER_ALIAS)
```
