# Make your game engine

::: info
This guide is designed only for developers with a good experience with JavaScript. If you are not a developer, you can skip this page and use the default engine.
:::

One of the main goals of Pixi’VN is to provide basic utilities for developing video games. The engine is designed to be modular and flexible, allowing developers to use only the parts they need for their specific projects. This modularity also makes it easier to maintain and update the engine over time.

This is exactly what makes the possibility of creating your own game engine using the `pixi-vn` package.

The first step is to create a new project. You can find more information on how to create a new project starting from a template [here](/start/getting-started.md#project-initialization). The "Game Engine" template is a simple project that contains the basic structure of a game engine. By default, it exports the basic functionality of pixi-vn while removing anything unused from the package.

::: info
A special thread was created to share your idea or ask for help during the development of your Game Engine: [Creating a game engine from pixi-vn](https://github.com/DRincs-Productions/pixi-vn/discussions/389)
:::

The second step is to understand that Pixi’VN is divided into the following independent "modules". This means that you can replace one "module" without having to worry about modifying the others. To do this, you just need to modify `GameUnifier` which has the function of connecting the modile headlights to each other, as explained below.

It is also important to understand that by default the engine saves the current state of the game at each step, to give the player the possibility to go back. To do this the following functions are defined:

* `GameUnifier.getCurrentGameStepState`: This function returns the current state of the game step.
* `GameUnifier.restoreGameStepState`: This function restores the state of the game step.
* `Game.exportGameState`: This function returns the current state of the game. (Optional)
* `Game.restoreGameState`: This function restores the state of the game. (Optional)

## Storage

Replacing the base storage of Pixi’VN is a really easy operation.

For example in our case we will replace it with [`cacheable`](https://www.npmjs.com/package/cacheable), here is what we should change:

::: code-group

```ts [index.ts]
import { CacheableMemory } from "cacheable"; // [!code ++]

const storage = new CacheableMemory(); // [!code ++]
const flagStorage = new CacheableMemory(); // [!code ++]

export namespace Game {
    export async function initialize(
        element: HTMLElement,
        options: Partial<ApplicationOptions> & { width: number; height: number },
        devtoolsOptions?: Devtools
    ) {
        GameUnifier.init({
            getCurrentGameStepState: () => {
                return {
                    // ...
                    storage: storage.export(), // [!code --]
                    storage: { // [!code ++]
                        main: createExportableElement([...storage.items]), // [!code ++]
                        flags: createExportableElement([...flagStorage.items]), // [!code ++]
                    }, // [!code ++]
                };
            },
            restoreGameStepState: async (state, navigate) => {
                // ...
                storage.restore(state.storage); // [!code --]
                storage.setMany(state.storage.main); // [!code ++]
                flagStorage.setMany(state.storage.flags); // [!code ++]
            },
            // storage
            getVariable: (key) => storage.getVariable(key), // [!code --]
            setVariable: (key, value) => storage.setVariable(key, value), // [!code --]
            removeVariable: (key) => storage.removeVariable(key), // [!code --]
            getFlag: (key) => storage.getFlag(key), // [!code --]
            setFlag: (name, value) => storage.setFlag(name, value), // [!code --]
            // onLabelClosing is called when the label is closed, it can use for example to clear the temporary variables in the storage // [!code --]
            onLabelClosing: (openedLabelsNumber) => StorageManagerStatic.clearOldTempVariables(openedLabelsNumber),  // [!code --]
            getVariable: (key) => storage.get(key), // [!code ++]
            setVariable: (key, value) => storage.set(key, value), // [!code ++]
            removeVariable: (key) => storage.delete(key), // [!code ++]
            getFlag: (key) => flagStorage.get(key) ?? false, // [!code ++]
            setFlag: (name, value) => flagStorage.set(name, value), // [!code ++]
        });
        // ...
    }

    export function clear() {
        // ...
        storage.clear(); // [!code --]
        storage.clear(); // new class // [!code ++]
        flagStorage.clear(); // [!code ++]
    }

    export function exportGameState(): GameState {
        return {
            // ...
            storageData: storage.export(), // [!code --]
            storageData: { // [!code ++]
                main: createExportableElement([...storage.items]), // [!code ++]
                flags: createExportableElement([...flagStorage.items]), // [!code ++]
            }, // [!code ++]
        };
    }

    export async function restoreGameState(data: GameState, navigate: (path: string) => void) {
        // ...
        storage.restore(data.storageData); // [!code --]
        storage.clear(); // [!code ++]
        storage.setMany(data.storageData.main); // [!code ++]
        flagStorage.clear(); // [!code ++]
        flagStorage.setMany(data.storageData.flags); // [!code ++]
    }
}
```

```ts [interfaces/GameState.ts]
import { CacheableItem } from "cacheable";

export default interface GameState {
    engine_version: string;
    step: NarrationGameState;
    storageData: StorageGameState; // [!code --]
    storageData: { // [!code ++]
        main: CacheableItem[]; // [!code ++]
        flags: CacheableItem[]; // [!code ++]
    }; // [!code ++]
    canvasData: CanvasGameState;
    soundData: SoundGameState;
    historyData: HistoryGameState;
    path: string;
}
```

:::

## Renderer

Even the canvas is a module that can be replaced. The default canvas is a simple canvas that uses the `pixi.js` library. You can replace it with any other canvas library you want.

You are not forced to use a WebGL-based 2D renderer. You can use any other renderer you want. For example, you can use a 3D renderer or a React-based renderer. You can also use a combination of different renderers. The only requirement is that the renderer state must be saved and restored at each step.

Since I have no experience on rendering libraries other than `pixi.js`, my example will be based on a semi-realistic class.

::: code-group

```ts [index.ts]
const canvas = new Canvas(); // [!code ++]

export namespace Game {
    export async function initialize(
        options: CanvasOptions, // [!code ++]
    ) {
        GameUnifier.init({
            getCurrentGameStepState: () => {
                return {
                    // ...
                    canvas: canvas.export(), // [!code ++]
                };
            },
            restoreGameStepState: async (state, navigate) => {
                // ...
                await canvas.restore(state.canvas); // [!code ++]
            },
            // This function is called when the step is completed, it can be used to force the completion of the animations // [!code ++]
            onGoNextEnd: async () => { // [!code ++]
                canvas.forceCompletionOfAnimations(); // [!code ++]
            }, // [!code ++]
        });
        return await canvas.init(options); // [!code ++]
    }

    export function clear() {
        // ...
        canvas.clear(); // [!code ++]
    }

    export function exportGameState(): GameState {
        return {
            // ...
            canvasData: canvas.export(), // [!code ++]
        };
    }

    export async function restoreGameState(data: GameState, navigate: (path: string) => void) {
        // ...
        await canvas.restore(data.canvasData); // [!code ++]
    }
}
```

```ts [interfaces/GameState.ts]
import { CanvasGameState } from "./canvas"; // [!code ++]

export default interface GameState {
    engine_version: string;
    stepData: NarrationGameState;
    storageData: StorageGameState;
    canvasData: CanvasState; // [!code ++]
    soundData: SoundGameState;
    historyData: HistoryGameState;
    path: string;
}
```

:::

## Sound

The sound module is a module that can be replaced. The default sound module is a simple sound module that uses the [`PixiJS Sound`](https://pixijs.io/sound/examples/index.html) library. You can replace it with any other sound library you want.

For example in our case we will replace it with [`howler.js`](https://howlerjs.com/), here is what we should change:

( The implementation of howler was done by AI, so it may not be perfect. )

::: code-group

```ts [index.ts]
import { Howl, Howler } from "howler"; // [!code ++]

export function exportHowlerState() { // [!code ++]
    const state = Howler._howls.map((howl) => ({ // [!code ++]
        src: howl._src, // [!code ++]
        volume: howl.volume(), // [!code ++]
        rate: howl.rate(), // [!code ++]
        loop: howl.loop(), // [!code ++]
        playing: howl.playing(), // [!code ++]
        seek: howl.seek(), // [!code ++]
    })); // [!code ++]
    return state; // [!code ++]
} // [!code ++]

export async function restoreHowlerState(state: Array<any>) { // [!code ++]
    state.forEach((soundData) => { // [!code ++]
        const sound = new Howl({ // [!code ++]
            src: soundData.src, // [!code ++]
            volume: soundData.volume, // [!code ++]
            rate: soundData.rate, // [!code ++]
            loop: soundData.loop, // [!code ++]
        }); // [!code ++]

        if (soundData.playing) { // [!code ++]
            sound.seek(soundData.seek); // [!code ++]
            sound.play(); // [!code ++]
        } // [!code ++]
    }); // [!code ++]
} // [!code ++]

export namespace Game {
    export async function initialize(
        element: HTMLElement,
        options: Partial<ApplicationOptions> & { width: number; height: number },
        devtoolsOptions?: Devtools
    ) {
        GameUnifier.init({
            getCurrentGameStepState: () => {
                return {
                    // ...
                    sound: sound.export(), // [!code --]
                    sound: exportHowlerState(), // [!code ++]
                };
            },
            restoreGameStepState: async (state, navigate) => {
                // ...
                sound.restore(state.sound); // [!code --]
                await restoreHowlerState(state.soundData); // [!code ++]
            },
        });
        // ...
    }

    export function clear() {
        sound.clear(); // [!code --]
        Howler._howls.forEach((howl) => howl.unload()); // [!code ++]
        // ...
    }

    export function exportGameState(): GameState {
        return {
            // ...
            soundData: sound.export(), // [!code --]
            soundData: exportHowlerState(), // [!code ++]
        };
    }

    export async function restoreGameState(data: GameState, navigate: (path: string) => void) {
        // ...
        sound.restore(data.soundData); // [!code --]
        await restoreHowlerState(data.soundData); // [!code ++]
    }
}
```

```ts [interfaces/GameState.ts]
import { CacheableItem } from "cacheable";

export default interface GameState {
    engine_version: string;
    stepData: NarrationGameState;
    storageData: StorageGameState;
    canvasData: CanvasGameState;
    soundData: SoundGameState; // [!code --]
    soundData: Array<any>; // [!code ++]
    historyData: HistoryGameState;
    path: string;
}
```

:::

## Narration

Replacing the entire narration module is possible but not recommended as it is the strong point of Pixi’VN.

Since it has been handled in a generic way, you can implement your own [`Label`](/start/labels.md#label) (the key element of narration) by extending `LabelAbstract`.

The `LabelAbstract` class is a generic class that can be used to create your own labels. It is a simple class that contains the basic functionality of a label. You can extend this class and add your own functionality to it.

Here's an example:

::: code-group

```ts [classes/Label.ts]
import { LabelAbstract, LabelProps, StepLabelType } from "@drincs/pixi-vn";
import sha1 from "crypto-js/sha1";

export default class Label<T extends {} = {}> extends LabelAbstract<Label<T>, T> {
    public get stepCount(): number {
        return this.steps.length;
    }
    public getStepById(stepId: number): StepLabelType<T> | undefined {
        return this.steps[stepId];
    }
    /**
     * @param id is the id of the label
     * @param steps is the list of steps that the label will perform
     * @param props is the properties of the label
     */
    constructor(id: string, steps: StepLabelType<T>[] | (() => StepLabelType<T>[]), props?: LabelProps<Label<T>>) {
        super(id, props);
        this._steps = steps;
    }

    private _steps: StepLabelType<T>[] | (() => StepLabelType<T>[]);
    /**
     * Get the steps of the label.
     */
    public get steps(): StepLabelType<T>[] {
        if (typeof this._steps === "function") {
            return this._steps();
        }
        return this._steps;
    }

    public getStepSha(index: number): string {
        if (index < 0 || index >= this.steps.length) {
            console.warn("stepSha not found, setting to ERROR");
            return "error";
        }
        try {
            let step = this.steps[index];
            let sha1String = sha1(step.toString().toLocaleLowerCase());
            return sha1String.toString();
        } catch (e) {
            console.warn("stepSha not found, setting to ERROR", e);
            return "error";
        }
    }
}
```

```ts [utils/label.ts]
import { LabelProps, RegisteredLabels, StepLabelType } from "@drincs/pixi-vn";
import Label from "../classes/Label";

/**
 * Creates a new label and registers it in the system.
 * **This function must be called at least once at system startup to register the label, otherwise the system cannot be used.**
 * @param id The id of the label, it must be unique
 * @param steps The steps of the label
 * @param props The properties of the label
 * @returns The created label
 */
export function newLabel<T extends {} = {}>(
    id: string,
    steps: StepLabelType<T>[] | (() => StepLabelType<T>[]),
    props?: Omit<LabelProps<Label<T>>, "choiseIndex">
): Label<T> {
    if (RegisteredLabels.get(id)) {
        console.info(`Label ${id} already exists, it will be overwritten`);
    }
    let label = new Label<T>(id, steps, props);
    RegisteredLabels.add(label);
    return label;
}
```

:::

## History

The history module is a module that can be replaced. The default history module is a simple history module that uses the [`deep-diff`](https://www.npmjs.com/package/deep-diff) library. You can replace it with any other history library you want.

Here's an example:

::: code-group

```ts [index.ts]
import HistoryManager, { HistoryManagerStatic } from "./classes/HistoryManager"; // [!code ++]

const stepHistory = new HistoryManager(); // [!code ++]

export namespace Game {
    export async function initialize(
        element: HTMLElement,
        options: Partial<ApplicationOptions> & { width: number; height: number },
        devtoolsOptions?: Devtools
    ) {
        GameUnifier.init({
            restoreGameStepState: async (state, navigate) => {
                HistoryManagerStatic.originalStepData = state; // [!code ++]
                // ...
            },
            addHistoryItem: (historyInfo, opstions) => {
                return stepHistory.add(historyInfo, opstions); // [!code ++]
            },
            // ...
        });
        // ...
    }

    export function clear() {
        // ...
        stepHistory.clear(); // [!code ++]
    }

    export function exportGameState(): GameState {
        return {
            // ...
            historyData: stepHistory.export(), // [!code ++]
        };
    }

    export async function restoreGameState(data: GameState, navigate: (path: string) => void) {
        stepHistory.restore(data.historyData); // [!code ++]
        // ...
    }
}
```

```ts [classes/HistoryManager.ts]
import { GameStepStateData, GameUnifier, HistoryGameState, HistoryStep } from "@drincs/pixi-vn";
import { diff } from "deep-diff";

export class HistoryManagerStatic {
    static _stepsHistory: HistoryStep[] = [];
    static stepLimitSaved: number = 20;
    static get lastHistoryStep(): HistoryStep | null {
        if (HistoryManagerStatic._stepsHistory.length > 0) {
            return HistoryManagerStatic._stepsHistory[HistoryManagerStatic._stepsHistory.length - 1];
        }
        return null;
    }
    static originalStepData: GameStepStateData | undefined = undefined;
}

/**
 * This class is a class that manages the steps and labels of the game.
 */
export default class HistoryManager {
    get stepsHistory() {
        return HistoryManagerStatic._stepsHistory;
    }
    add(
        historyInfo: HistoryInfo = {},
        opstions: {
            ignoreSameStep?: boolean;
        } = {}
    ) {
        const originalStepData = HistoryManagerStatic.originalStepData;
        const { ignoreSameStep } = opstions;
        const currentStepData: GameStepStateData = GameUnifier.currentGameStepState;
        if (!ignoreSameStep && this.isSameStep(originalStepData, currentStepData)) {
            return;
        }
        let data = diff(originalStepData, currentStepData);
        this.stepsHistory.push({
            ...(historyInfo as Omit<HistoryStep, "diff">),
            diff: data,
        });
        HistoryManagerStatic.originalStepData = currentStepData;
    }

    private isSameStep(originalState: GameStepStateData, newState: GameStepStateData) {
        if (originalState.openedLabels.length === newState.openedLabels.length) {
            try {
                let lastStepDataOpenedLabelsString = JSON.stringify(originalState.openedLabels);
                let historyStepOpenedLabelsString = JSON.stringify(newState.openedLabels);
                if (
                    lastStepDataOpenedLabelsString === historyStepOpenedLabelsString &&
                    originalState.path === newState.path &&
                    originalState.labelIndex === newState.labelIndex
                ) {
                    return true;
                }
            } catch (e) {
                console.error("Error comparing opened labels", e);
                return true;
            }
        }
        return false;
    }

    public clear() {
        HistoryManagerStatic._stepsHistory = [];
        HistoryManagerStatic.originalStepData = undefined;
    }

    /* Export and Import Methods */

    public export(): HistoryGameState {
        return {
            stepsHistory: this.stepsHistory,
            originalStepData: HistoryManagerStatic.originalStepData,
        };
    }
    public async restore(data: object) {
        this.clear();
        HistoryManagerStatic._stepsHistory = (data as HistoryGameState)["stepsHistory"];
        HistoryManagerStatic.originalStepData = (data as HistoryGameState)["originalStepData"];
    }

    /* Options Methods */

    async goBack() {
        // TODO To be implemented
    }
    get narrativeHistory() {
        // TODO To be implemented
    }
}
```

:::
