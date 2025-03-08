# Choice Menus

In the visual novel, usually, there are choice menus that allow the player to make decisions that will affect the story.

## Set a choice menu

To set a choice menu, you can use `narration.choiceMenuOptions` and pass an array of [`ChoiceMenuOption`](#choice-menu-option) or/and [`ChoiceMenuOptionClose`](#choice-for-closing-the-menu).

```ts
// /labels/startLabel.ts
import { ChoiceMenuOption, ChoiceMenuOptionClose, narration, newLabel } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        async () => {
            narration.dialogue = "Choose a fruit:"
            narration.choiceMenuOptions = [ // [!code focus]
                new ChoiceMenuOption("Orange", orangeLabel, {}), // by default, the label will be called by call // [!code focus]
                new ChoiceMenuOption("Banana", bananaLabel, {}, { type: "jump" }), // [!code focus]
                new ChoiceMenuOption("Apple", appleLabel, { quantity: 5 }, { type: "call" }), // [!code focus]
                new ChoiceMenuOptionClose("Cancel"), // [!code focus]
            ] // [!code focus]
        },
        () => { narration.dialogue = "Restart" },
        async (props) => await narration.jumpLabel("start_label", props)
    ],
)
```

<sandbox
template="wv63yr"
entry="/src/labels/startLabel.ts"
/>

## Choice menu option

In Pixi’VN, it is possible to create choice menus using the `ChoiceMenuOption` class and a function to handle the choice.

`ChoiceMenuOption` is a class which has as parameters:

- `text`: The text that will be displayed in the choice menus.
- `label`: The [label](/start/labels#label) which will be called when the player chooses the option.
- `props`: The properties that will be passed to the label, if the label not need any parameter you can pass an empty object `{}`.
- `options`:
  - `type`: The way the [label will be called](/start/labels-flow.md#run-a-label). It can be `call` or `jump`. Default is `call`.
  - `oneTime`: If this is `true`, the choice can only be made once.
  - `onlyHaveNoChoice`: If `true`, the choice can see only if there are no other choices.
  - `autoSelect`: If `true` and if is the only choice, it will be selected automatically.

You can use this class to create a item of the `narration.choiceMenuOptions` list. To select a choice, you must use the [`narration.selectChoice` function](#select-a-choice).

### Choice for closing the menu

In addition to `ChoiceMenuOption` there is also another class `ChoiceMenuOptionClose` that allows you to create a closing option. Its operation consists in closing the menu of choices and continuing with the [steps](/start/labels.md), without having to call any [label](/start/labels.md#label).

`ChoiceMenuOptionClose` is a class which has as parameters:

- `text`: The text that will be displayed in the choice menus.
- `options`:
  - `closeCurrentLabel`: If `true`, the current label will be closed. Default is `false`.
  - `oneTime`: If this is `true`, the choice can only be made once.
  - `onlyHaveNoChoice`: If `true`, the choice can see only if there are no other choices.
  - `autoSelect`: If `true` and if is the only choice, it will be selected automatically.

You can use this class to create a item of the `narration.choiceMenuOptions` list. To select a choice, you must use the [`narration.selectChoice` function](#select-a-choice).

## Get the choice menu

To get the choice menu, you can use `narration.choiceMenuOptions`. The return is an array of `ChoiceMenuOption` and/or `ChoiceMenuOptionClose`.

```typescript
const menuOptions: ChoiceMenuOption[] = narration.choiceMenuOptions;
```

## Select a choice

To select a choice, you can use `narration.selectChoice`.

```typescript
narration.selectChoice(item, {
    // add StepLabelProps here
    navigate: navigate, // example
    // and the props that will be passed to the label
    ...item.props
})
    .then(() => {
        // ...
    })
    .catch((e) => {
        // ...
    })
```

## Clear the choice menu

To clear the choice menu, you can use `narration.choiceMenuOptions = undefined`.

```typescript
narration.choiceMenuOptions = undefined;
```

## How to create the choice menu UI screen

Ad esempio:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

<sandbox
template="k8r2xf"
entry="/src/screens/ChoiceMenu.tsx"
/>
