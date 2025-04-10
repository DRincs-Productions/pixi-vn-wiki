# Make your game engine

:::warning This page is under construction
The documentation is in development. You can ask for help in the this [thread](https://github.com/DRincs-Productions/pixi-vn/discussions/389)
:::

One of the main goals of Pixi’VN is to provide basic utilities for developing video games. The engine is designed to be modular and flexible, allowing developers to use only the parts they need for their specific projects. This modularity also makes it easier to maintain and update the engine over time. Additionally, a developer may want to add or change the handling of a new feature, making sure that all the features of the game engine fit together perfectly.

It is for this very reason that we wanted to make it possible to create your own game engine using the pixi-vn package. This is a very simple process.

The first step is to create a new project. You can find more information on how to create a new project starting from a template [here](/start/getting-started.md#project-initialization). We will use the template "Game Engine". The template is a simple project that contains the basic structure of a game engine. By default, it exports the basic functionality of pixi-vn while removing anything unused from the package.

The second step is to understand that Pixi’VN is divided into the following independent "modules". This means that you can replace one "module" without having to worry about modifying the others. To do this, you just need to modify `GameUnifier` which has the function of connecting the modile headlights to each other, as explained below.

It is also important to understand that by default the engine saves the current state of the game at each step, to give the player the possibility to go back. To do this the following functions are defined:

- `GameUnifier.getCurrentGameStepState`: This function returns the current state of the game step.
- `GameUnifier.restoreGameStepState`: This function restores the state of the game step.

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

    /**
     * Load the save data
     * @param data The save data
     * @param navigate The function to navigate to a path
     */
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
