---
title: Manage game flow with labels
---

The game flow is managed by functions that `call labels`, `jump labels`, `go back`, `close labels`... These functions are in the `narration` object.

* [Run a label](#run-a-label)
* [Next Step and Go back](#next-step-and-go-back)
* [Close labels](#close-labels)

## Run a label

There are two ways to run a label:

* [Call a label](#call-a-label)
* [Jump to a label](#jump-to-a-label)

### Call a label

To call a label you must use the `narration.callLabel` function. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label. Its interface corresponds to [`StepLabelProps`](/start/labels.md#override-steplabelprops).

When you call a label, the first step of that label will be started. If before the call was running another label, the remaining steps of the another label will be executed after the steps of the called label.

For example if currently the game is running the step 5 of the label A and you **call** the label B, when all the steps of the label B are executed, the game will continue with the step 6 of the label A.

`narration.callLabel` returns a [result of first step of the called label](/start/labels.md#all-steps-result).

```typescript
import { narration } from '@drincs/pixi-vn'

narration.callLabel(startLabel, {})
```

Remember that if you execute the `narration.callLabel` inside a step, you should return the [result of first step of the called label](/start/labels.md#all-steps-result) and use `await`. The reason is that it might generate a wrong history.

```typescript
import { narration, newLabel } from '@drincs/pixi-vn'

export const startLabel = newLabel("start_label",
    [
        async (props) => {
            return await narration.callLabel(TestLabel, props)
        },
        async (props) => await narration.callLabel(TestLabel, props),
    ]
)
```

### Jump to a label

To jump to a label you must use the `narration.jumpLabel` function and pass the label. This function have 2 parameters:

* `label`: the label that will be called
* `props`: the properties that will be passed to the label. Its interface corresponds to [`StepLabelProps`](/start/labels.md#override-steplabelprops).

When you jump to a label, the steps of the current label will be stopped and the steps of the label passed as parameter will be started.

For example if currently the game is running the step 5 of the label A, and **call** the label B, and you **jump** to the label C, when all the steps of the label C are executed, the game will continue with the step 6 of the label A. Because when you jump to the label C, the label B is closed.

`narration.jumpLabel` returns a [result of first step of the called label](/start/labels.md#all-steps-result).

```typescript
import { narration } from '@drincs/pixi-vn'

narration.jumpLabel(startLabel, {})
```

Remember that if you execute the `narration.jumpLabel` inside a step, you should return the [result of first step of the called label](/start/labels.md#all-steps-result) and use `await`. The reason is that it might not await the first step of the new label.

```typescript
import { narration } from '@drincs/pixi-vn'

export const startLabel = newLabel("start_label",
    [
        async (props) => {
            return await narration.jumpLabel(TestLabel, props)
        },
        async (props) => await narration.jumpLabel(TestLabel, props),
    ]
)
```

## Next step and go back

### Next step

To execute the next step you must execute the `narration.goNext()` function. This function have a parameter:

* `props`: the properties that will be passed to the label. Its interface corresponds to [`StepLabelProps`](/start/labels.md#override-steplabelprops).

```typescript
import { narration } from '@drincs/pixi-vn'

await narration.goNext({})
```

`narration.goNext()` is asynchronous, so, for example, you can use `then` for disabled a next button until the next step is executed.

```typescript
import { narration } from '@drincs/pixi-vn'

// disable next button
narration.goNext({})
    .then((result) => {
        // enable next button
    })
```

If you execute the `narration.goNext()` inside a step, the "go next request" will be queued and executed when steps queue is empty.

```typescript
import { narration, newLabel } from '@drincs/pixi-vn'

export const startLabel = newLabel("start_label", [
    async (props) => {
        narration.goNext(props)
    },
])
```

This is a example to understand how the queue works:

```typescript
import { narration, newLabel } from '@drincs/pixi-vn'

export const startLabel = newLabel("start_label", [
    async (props) => {
        await narration.callLabel(label2, props);
        console.log(1);
    },
    () => {
        console.log(3);
    },
])

const label2 = newLabel("label_02", [
    async (props) => {
        await narration.goNext(props);
        console.log(2);
    },
])
```

In this example, the output will be `2`, `1`, `3`. Because:

1. `await narration.callLabel(label2, props)` will call the label `label2` and await the first step of the label. (There are 1 item in the step queue)
2. The first step of the label `label2` will execute the `await narration.goNext(props)`, but the `goNext` request will be queued because the step queue is not empty. (There are 2 items in the step queue)
3. `console.log(2)` will be executed and the first step of the label `label2` will be finished. (There are 1 item in the step queue)
4. The `console.log(1)` will be executed and the first step of the label `startLabel` will be finished. (There are 0 items in the step queue)
5. Since the step queue is empty, the `goNext` request will be executed and the second step of the label `startLabel` will be executed. (There are 1 items in the step queue)
6. The `console.log(3)` will be executed and the second step of the label `startLabel` will be finished. (There are 0 items in the step queue)

#### Check if the player can go to the next step

You can use the `narration.canGoNext` property to check if you can go to the next step.

The `narration.canGoNext` is false when:

* A step is running
* The player must [make a choice](/start/choices.md)
* The player must [enter a value](/start/input.md)

```tsx
import { narration } from '@drincs/pixi-vn'

function NextButton() {
    return (
        <button disabled={!narration.canGoNext} onClick={() => {
            narration.goNext({})
        }}>
            Next
        </button>
    )
}
```

### Go back

Every step the system saves the current state of the game. To go back to the previous step you must execute the `stepHistory.goBack()` function.

In parameters you must pass a function `navigate: (path: string) => void` that will be called with the [URL Path or Route](/start/interface.md#what-is-the-url-path-and-routes) of the previous step, so you can to [navigate to the previous UI screen](/start/interface-navigate.md).

For exemple if you use a [React Router Dom](https://reactrouter.com):

```typescript
import { stepHistory } from '@drincs/pixi-vn'
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

if (stepHistory.canGoBack) {
    stepHistory.goBack(navigate).then(() => {
        // ...
    })
}
```

#### Check if the player can go back

You can use the `stepHistory.canGoBack` property to check if you can go back.

The `stepHistory.canGoBack` is false when there are no steps in the history to restore.

```tsx
import { stepHistory } from '@drincs/pixi-vn'

function BackButton() {
    return (
        <button disabled={!stepHistory.canGoBack} onClick={() => {
            stepHistory.goBack({})
        }}>
            Back
        </button>
    )
}
```

#### Block the possibility of going back

You can block the possibility of going back by setting the `stepHistory.canGoBack` property to `false`.

```typescript
import { stepHistory } from '@drincs/pixi-vn'

stepHistory.blockGoBack()
```

## Close labels

### Close current label

To close the current label you must execute the `narration.closeCurrentLabel()` function.

```typescript
import { narration } from '@drincs/pixi-vn'

narration.closeCurrentLabel()
```

### Close all labels

To close all labels you must execute the `narration.closeAllLabels()` function.
**If you call this function and after that you don't call any label, the [game will end](/start/other-narrative-features#how-manage-the-end-of-the-game).**

```typescript
import { narration } from '@drincs/pixi-vn'

narration.closeAllLabels()
```

## How to create the go back and go next buttons

For example:

( **It's in basic html**, you will need to replace the basic html elements with UI components from your favorite library to improve the graphics. )

<Sandbox
  template="5r7m9z"
  entry="/src/components/NextButton.tsx,/src/components/BackButton.tsx"
/>
