# Intecept Events

Intercepting events can be very useful to allow hotkeys or to block/prevent browser actions that can create errors.

## Refresh page

Using the browser's refresh button without managing it causes you to lose all temporary game data.

The solution is to create a save, in local storage, before refreshing the page. Then, when the page is refreshed, check if the save exists, load it, and then delete it.

Example ( This solution also prevents the loss of data when the page is closed ):

```ts
// ActionsUtility.ts
import { narration, Game } from "@drincs/pixi-vn";

export function addRefreshSave() {
    const jsonString = JSON.stringify(Game.exportGameState())
    if (jsonString) {
        localStorage.setItem("refreshSave", jsonString)
    }
}

export async function loadRefreshSave(navigate: (path: string) => void) {
    const jsonString = localStorage.getItem("refreshSave")
    if (jsonString) {
        await Game.restoreGameState(jsonString, navigate);
        localStorage.removeItem("refreshSave")
    }
}
```

```ts
// EventInterceptor.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { addRefreshSave, loadRefreshSave } from './utility/ActionsUtility';

export default function EventInterceptor() {
    const navigate = useNavigate();

    useEffect(() => {
        loadRefreshSave(navigate)
        window.addEventListener("beforeunload", addRefreshSave);
        return () => {
            window.removeEventListener("beforeunload", addRefreshSave);
        };
    }, []);

    return null
}
```

## Back and Forward buttons

Using the back and forward buttons can cause the game to be in an inconsistent state.

The best solution would be to be able to use the navigation keys to navigate the game as well.

The first thing to do is to prevent the path change, when the back button is pressed. There are many ways to do this, but what I suggest is the following:

Intercept the event `popstate`, which is started after that the back button is pressed, and go forward one. This means that when the back button is pressed it returns to the previous path for a short time and immediately afterwards returns to the current path. To ensure that the path is not changed, even for a short time, you can add 2 nodes to the history every time you navigate to a new path, instead of 1 node (the default).

Example:

```ts
// EventInterceptor.ts
import { useEffect } from 'react';

export default function EventInterceptor() {
    useEffect(() => {
        window.addEventListener("popstate", onpopstate);
        return () => {
            window.removeEventListener("popstate", onpopstate);
        };
    }, []);

    function onpopstate() {
        window.history.forward();
    }

    return null
}
```

```ts
// If you use react-router-dom
import { NavigateFunction, NavigateOptions, To, useNavigate } from "react-router-dom";

// you must use this hook to navigate, and not useNavigate directly
export function useMyNavigate(): NavigateFunction {
    const navigate = useNavigate();

    return (to: To | number, options?: NavigateOptions) => {
        // navigate to the new path
        if (typeof to === "number") {
            navigate(to);
        }
        else {
            navigate(to, options);
        }
        // add additional node to history
        window.history.pushState(null, window.location.href, window.location.href);
    }
}
```

While the feature to go back in the game with the browser button is [under development](https://github.com/DRincs-Productions/pixi-vn/issues/114).

## Attaching events to keymaps to allow hotkeys

To attach events to keymaps is useful to allow hotkeys.

Example:

```ts
// EventInterceptor.ts
import { useEffect } from 'react';

export default function EventInterceptor() {
    useEffect(() => {
        window.addEventListener('keydown', onkeydown);

        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'Enter' || event.code == 'Space') {
            nextStep((prev) => prev + 1)
        }
        else if (event.code == 'Escape') {
            setOpenSettings((prev) => !prev)
        }
        else if (event.code == 'KeyH') {
            setOpenHistory((prev) => !prev)
        }
    }

    return null
}
```

## Keyboard shortcuts (hotkeys)

I suggest the following hotkeys:

* `Space` or `Enter`: Continue the dialogue.
* `Keep Space` or `Keep Enter`: Skip the dialogue.
* `Alt` + `S`: Quick save the game.
* `Alt` + `L`: Quick load the game.
* `Alt` + `H`: Open the history modal.
* `Esc`: Open the settings modal.
* `Alt` + `V`: Hide the UI (Show only the canvas).

Why not use the `Ctrl` key? Because it is used by the browser for many shortcuts, and it is better to avoid conflicts.
