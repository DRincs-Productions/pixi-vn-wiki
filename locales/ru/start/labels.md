# Label and Game Step

Visual Novels are usually a succession of screenshots with images and text.

In Pixi’VN, you can manage this succession of screens with the "**steps**". The steps they are functions that are executed every time the [Next Step](/start/labels.md#next-step) function is called. In these steps you can add images, set who and what is saying etc...

The **labels** are containers of steps, they are used to organize the steps in a more readable way.

Basically the idea of the life cycle of the game is:

- The game starts by [calling a label](/start/labels.md#call-a-label). The first step of the label will be executed automatically.
- After that, connecting the function [Next Step](/start/labels.md#next-step) to a event (like a button click), every time the function is called, the next step of the label is executed.
  Some steps could start other labels.
- The game will end only when all the steps are completed. The [onGameEnd](/start/other-narrative-features.md#how-manage-the-end-of-the-game) function will be started.

## Label

The label is a container of steps. It is used to organize the steps in a more readable way.

For create a label you must use the `newLabel()` function and pass:

- The `id` of the label, must be unique
- The `steps` of the label, an array of functions that will be executed in order. Or a function that returns the array of functions.
- The `options` of the label, an object with the following properties:
  - `onStepStart`: A function that will be executed before each step of the label. You can read more about it [here](/start/labels-advanced.md#onstepstart).
  - `onStepEnd`: A function that will be executed after each step of the label. You can read more about it [here](/start/labels-advanced.md#onstepend).
  - `onLoadingLabel`: A function that will be executed in `onStepStart` if the index of the step is 0 and when the user loads a save file. You can read more about it [here](/start/labels-advanced.md#onloadinglabel).

```typescript
import { narration } from '@drincs/pixi-vn'

export const startLabel = newLabel("start_label",
    [
        () => {
            narration.dialogue = { character: liam, text: "Example of dialogue" }
        },
        (props, { labelId }) => narration.jumpLabel(labelId, props),
    ]
)
```

### Override `StepLabelProps`

All the [functionality to control the flow of labels](/start/labels-flow.md) requires an object that corresponds to the `StepLabelProps` interface. The object will be passed as a parameter to the step that will be executed.

By default `StepLabelProps` corresponds to `{ [key: string]: any }`. You can "override" the interface `StepLabelProps` to set required parameters.

:::tabs
\== pixi-vn.types.ts

```typescript
import { narration } from '@drincs/pixi-vn'

declare module '@drincs/pixi-vn' {
    interface StepLabelProps {
        navigate: (route: string) => void,
    }
}
```

\== startLabel.ts

```typescript
export const startLabel = newLabel("start_label",
    [
        () => {
            return narration.callLabel(testLabel, { // [!code focus]
                navigate: (route) => { // [!code focus]
                    // navigate to route // [!code focus]
                } // [!code focus]
            }) // [!code focus]
        },
    ]
)
```

:::

### Parameters of the label steps

You can pass a type to `newLabel` function for add other parameters in addition to [`StepLabelProps`](#override-steplabelprops), for that label.

```typescript
import { narration } from '@drincs/pixi-vn'

export const startLabel = newLabel<{name: string}>("start_label",
    [
        (props) => {
            console.log(props.name)
        },
    ]
)

narration.callLabel(startLabel, {
    // add StepLabelProps here
    navigate: navigate, // example
    // and the props that will be passed to the label
    name: "John"
})
```

### All Steps Result

The steps can return a `StepLabelResult` object, by default the `StepLabelResult` object is a `{ [key: string]: any }`.

You can "override" the interface `StepLabelResult` to set your custom properties in the result of the steps.

:::tabs
\== pixi-vn.types.ts

```typescript
declare module '@drincs/pixi-vn' {
    interface StepLabelResult {
        newRoute?: string,
        [key: string]: any
    }
}
```

\== startLabel.ts

```typescript
export const startLabel = newLabel("start_label",
    [
        () => {
            return { // [!code focus]
                newRoute: '/new-route', // [!code focus]
                customProperty: 12 // [!code focus]
            } // [!code focus]
        },
    ]
)
```

:::

## Step limit saved

At each step all the information of the current state of the game is [saved](/start/save.md).

To avoid the size of the save file growing too much, there is a limit of 100 steps saved, by default is 20 steps. When the limit is reached, only essential information from old steps will be kept.
This basic information allows you to show the entire [history of the narrative](/start/history.md), but without the possibility of [returning](/start/labels-flow.md#go-back) to a specific step.

You can edit the limit of steps saved by changing the `stepLimitSaved` property in the `narration` object.

```typescript
import { narration } from '@drincs/pixi-vn'

narration.stepLimitSaved = 100
```

If you want to disable the limit of steps saved, you can set the `stepLimitSaved` property to `Infinity`.

```typescript
import { narration } from '@drincs/pixi-vn'

narration.stepLimitSaved = Infinity
```
