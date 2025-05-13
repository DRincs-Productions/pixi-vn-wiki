# Input prompt

In Visual Novels it may be necessary to ask the user to enter text, number, date, etc.

Pixi’VN provides functions to manage this possibility. In short, the developer can require you to enter a value (the game will not allow you to proceed until the value is entered), while the [UI](/start/interface.md) must prompt the player to enter the value.

## Requesting input prompt

To request input prompt from the player, you must use the `narration.requestInput()` function. This function receives 2 parameters:

- an object with the following properties:
  - `type` (optional): The type of input prompt to be requested (It is a string).
- a default value (optional): The default value to be displayed in the input field.

:::tabs
== startLabel.ts

```ts
import { narration, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
    () => {
        narration.dialogue = "Hello";
    },
    () => {
        narration.dialogue = "What is your name?";
        narration.requestInput({ type: "string" });
    },
    () => {
        narration.dialogue = `My name is ${narration.inputValue}`;
    },
    () => {
        narration.dialogue = "How old are you?";
        narration.requestInput({ type: "number" }, 18);
    },
    () => {
        narration.dialogue = `I am ${narration.inputValue} years old`;
    },
    () => {
        narration.dialogue = "Describe who you are:";
        narration.requestInput({ type: "html textarea" });
    },
    () => {
        narration.dialogue = `${narration.inputValue}`;
    },
    () => {
        narration.dialogue = "Restart";
    },
]);
```

:::

<sandbox
  template="6968x8"
  entry="/src/labels/startLabel.ts,/src/screens/modals/TextInput.tsx"
/>

## Getting input prompt information

To get the input prompt information, you must use:

- `narration.isRequiredInput`: Returns a boolean indicating whether the player must enter a value.
- `narration.inputType`: Returns a string indicating the type of input prompt requested.

```typescript
if (narration.isRequiredInput) {
    openInputModal(narration.inputType)
}
```

## Removing input prompt request

To remove the input prompt request, you must use the `narration.removeInputRequest()` function.

```typescript
narration.removeInputRequest()
```

## How to create the input prompt dialog UI

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

<sandbox
  template="mjn5c8"
  entry="/src/screens/modals/TextInput.tsx"
/>
