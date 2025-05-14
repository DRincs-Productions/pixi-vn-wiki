---
title: Dialogue
---

**What is dialogue and example?** A written composition in which two or more characters are represented as conversing.

In Pixi’VN, dialogue is an object that contains information about *who* and *what* is currently being said. Its functionality can be broader as it can also be used for other purposes, such as monologues, soliloquies or to display a message to the player. For this reason, it is more appropriate to consider it as a text that can be linked to a [character](/start/character#use-characters-in-the-game).

## Set the current dialogue

To set the current dialogue, you can use the `narration.dialogue`.

```ts title="labels/startLabel.ts"
import { narration, newLabel } from "@drincs/pixi-vn"
import { eggHead } from "../values/characters"

// What is a Label? https://pixi-vn.web.app/start/labels.html
export const startLabel = newLabel("start_label",
    [
        () => {
            // in this example, not exists a character with id 'Alice' // [!code focus]
            // so when you get the current dialogue, the character is a fake character with the name 'Alice' // [!code focus]
            narration.dialogue = { // [!code focus]
                character: "Alice", // [!code focus]
                text: "Hello, world!" // [!code focus]
            } // [!code focus]
        },
        () => {
            // in this example, exists a character with id 'egg-head' // [!code focus]
            // so when you get the current dialogue, the character is the character with id 'egg-head' // [!code focus]
            narration.dialogue = { // [!code focus]
                character: 'egg-head', // [!code focus]
                text: "Hello, world!" // [!code focus]
            } // [!code focus]
            // or better // [!code focus]
            narration.dialogue = { // [!code focus]
                character: eggHead, // [!code focus]
                text: "Hello, world!" // [!code focus]
            } // [!code focus]
        },
        // if don't want to set a character, you can set a string // [!code focus]
        () => narration.dialogue = "Hello, world!", // [!code focus]
    ],
)
```

<sandbox
  template="tts9jh"
  entry="/src/labels/startLabel.ts"
/>

## Get the current dialogue

To get the current dialogue, you can use `narration.dialogue`. The return is a `DialogueInterface`.

```typescript
const currentDialogue: DialogueInterface = narration.dialogue;
```

## Clear the current dialogue

To clear the current dialogue, you can use `narration.dialogue = undefined`.

```typescript
narration.dialogue = undefined;
```

## Custom the dialogue

You can customize the dialog interface by adding additional properties to the `DialogueInterface` interface. For example, you can add a `color` property to change the color of the text.

To do this, you need "override" the `DialogueInterface` interface in the `.d.ts` file.

::: code-group

```typescript title="pixi-vn.d.ts"
declare module '@drincs/pixi-vn' {
    interface DialogueInterface {
        color?: string
    }
}
```

```typescript
narration.dialogue = {
    character: "Alice",
    text: "Hello, world!",
    color: "#ff0000"
}
```

:::

## Dialogue glue

Dialogue glue is a feature originally created for ***ink***, which was also introduced in Pixi’VN.

When "glue" is enabled the next dialogue will be added after the current dialogue.

```typescript
import { narration, newLabel } from "@drincs/pixi-vn";

const startLabel = newLabel("start", [
    () => {
        narration.dialogue = `Hello, my name is Alice and ...`
    },
    () => {
        narration.dialogGlue = true // [!code focus]
        narration.dialogue = ` I am a character in this game.`
    },
])
```

<sandbox
  template="ctn72c"
  entry="/src/labels/startLabel.ts"
/>

## How to create the narrative dialogue UI screen

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

<sandbox
  template="d6mn3d"
  entry="/src/screens/NarrationScreen.tsx"
/>
