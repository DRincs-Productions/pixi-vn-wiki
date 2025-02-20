# Dialogue

The dialogue/narration is the core of the visual novel.

In Pixi’VN, is possible to set/get the current dialogue.
A dialogue can link to a [character](/start/character#use-characters-in-the-game) or a string and will be used to indicate who is speaking.

## Set the current Dialogue

To set the current dialogue, you can use the `narration.dialogue`.

```ts
// /labels/startLabel.ts
import { Dialogue, narration, newLabel } from "@drincs/pixi-vn"
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
            // or // [!code focus]
            narration.dialogue = new Dialogue("Hello, world!", eggHead) // [!code focus]
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

## Get the current Dialogue

To get the current dialogue, you can use `narration.dialogue`. The return is a `Dialogue`.

```typescript
const currentDialogue: Dialogue = narration.dialogue;
```

## Clear the current Dialogue

To clear the current dialogue, you can use `narration.dialogue = undefined`.

```typescript
narration.dialogue = undefined;
```

## Dialogue glue

Dialogue glue is a feature originally created for _**ink**_, which was also introduced in Pixi’VN.

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
