# History

Pixi’VN save all dialogues, choices and responses that have been displayed in the game and all label and step opened.

## Check if the label has already been completed

To check if a label has already been completed, you can use the `narration.isLabelAlreadyCompleted` function.

The function takes the following parameters:

- `label`: The [label](/start/labels) to check if it is already completed.

```typescript
const isLabelCompleted = narration.isLabelAlreadyCompleted(startLabel)
const isLabelCompleted = narration.isLabelAlreadyCompleted("labelid")
```

## Get already been made choices of current step

To get the already been made choices of the current step, you can use the `narration.alreadyCurrentStepMadeChoices`.

```typescript
const choices = narration.alreadyCurrentStepMadeChoices
```

## Check if current step is already been opened

To check if the current step is already been opened, you can use the `narration.isCurrentStepAlreadyOpened`.

```typescript
const isCurrentStepOpened = narration.isCurrentStepAlreadyOpened;
```

## Counter of execution times of the current step

To get the counter of execution times of the current step, you can use the `narration.currentStepTimesCounter`. **Important**: The counter will be incremented only if `narration.currentStepTimesCounter` is called at least once in a step.

```typescript
export const label = newLabel("id",
    () => {
        if (narration.currentStepTimesCounter === 0) { // ✅ will be incremented
            // ...
        } else {
            // ...
        }
    }
)
```

```typescript
export const label = newLabel("id",
    () => {
        if (narration.currentStepTimesCounter === 0) { // ✅ will be incremented
            // ...
        } else if (narration.currentStepTimesCounter === 1) { // ✅ It will not be incremented, because it has already been incremented in this step
            // ...
        }
    }
)
```

```typescript
export const label = newLabel("id",
    () => {
        if (flag) {
            if (narration.currentStepTimesCounter === 1) { // ❌ It will be incremented only if "flag" is true
                // ...
            }
        }
    }
)
```

To restart the counter of execution times of the current step, you can use the `narration.currentStepTimesCounter = 0`.

```typescript
narration.currentStepTimesCounter = 0;
```

## Get Narrative History

The Narration timeline of the game is a list of all dialogues that have been displayed. It is useful to show the history of dialogues and choices to the player.

To get the narrative history of the game, you can use the `stepHistory.narrativeHistory`. It returns a list of `NarrativeHistory<T>[]`.

```typescript
const dialogues: NarrativeHistory[] = stepHistory.narrativeHistory;
```

## Delete Narrative History

To delete all the narrative history, use the `stepHistory.removeNarrativeHistory`.

```typescript
stepHistory.removeNarrativeHistory();
```

To delete a part of the narrative history, use the `stepHistory.removeNarrativeHistory`.

```typescript
// delete the first 2 elements
stepHistory.removeNarrativeHistory(2);
```

## How to create the history UI screen

Ad esempio:

(**È in HTML di base**, dovrai sostituire gli elementi HTML di base con componenti UI dalla tua libreria preferita per migliorare la grafica. )

<sandbox
template="ryzljv"
entry="/src/screens/HistoryScreen.tsx"
/>

<!-- TODO: add addCurrentStepToHistory

 ## Add current state into step history

Every -->
