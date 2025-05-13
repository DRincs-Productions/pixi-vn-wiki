# Other narrative features

## How manage the end of the game

When all the steps of all labels are executed, the game will block. The developer must manage the end of the game. The reason is that ending management in visual novels can be handled in different ways:

* The game ends when all the steps are executed
* The game has no end, so if the steps are finished, there has been an error, and it needs to be handled
* The game ends when the player reaches a certain point. For example, when the player reaches a certain point in the story you can navigate to a game over screen

The method for managing the end of the game is to set `Game.onEnd`. This function is executed when the game ends and have same characteristics of a `step`.

For example, if you want to end the game when the steps are finished:

```typescript
// main.ts
import { Game } from '@drincs/pixi-vn'

Game.onEnd(async (props) => {
    props.navigate("/end")
})
```

For example, if the game has no end:

```typescript
// startLabel.ts
export const startLabel = newLabel("start_label_id",
    () => {
        return [
            // ...
        ]
    }
)
```

```typescript
// main.ts
import { Game } from '@drincs/pixi-vn'

Game.onEnd(async (props) => {
    narration.callLabel(startLabel, props)
})
```

## How manage the step errors

When an error occurs in a step, the game gives a console error and stops the execution of the steps. The developer must manage the error. The method for managing the error is to set `Game.onError`.

For example, if you want to send a notification when an error occurs:

```typescript
// main.ts
import { Game } from '@drincs/pixi-vn'

Game.onError((type, error, { notify }) => {
    notify("An error occurred")
    // send a notification to GlitchTip, Sentry, etc...
})
```

## Randomize number

Pixi’VN has a built-in function to generate a random number. To generate a random number, use the `narration.getRandomNumber()`. This function takes the following parameters:

* `min`: The minimum value of the random number.
* `max`: The maximum value of the random number.
* `options`:
  * `onceonly`: If true, the number will be generated only once on the current step of the label (default: false). Attention: `min` and `max`affect the storage of already generated numbers.
