# Migration

## Migration from v0.10.x to v1.0

### Introduction

This document describes the changes that need to be made to your code to migrate from v0.10.x to v1.0.

Being version 1.0.0 it is the first complete release of the library. It is a breaking change and the API has changed significantly. The fundamental change of this release was to split the entire engine into independent modules. This allows for a more modular and flexible design, making it easier to use the engine in different contexts. The size of packages has been reduced significantly (150 MB to 50 MB) and the engine is now more efficient and faster.

The `Game` namespace object has been introduced for the which contains all the functionality that exploits multiple modules. This is the main entry point for the engine and is used to access all the functions of the engine.

The `stepHistory` module has been introduced to manage the history of the game. Previously the entire management of the game's history was handled by `narration`.

```ts
clearAllGameDatas(); // [!code --]
Game.clear(); // [!code ++]
```

```ts
canvas // [!code --]
    .initialize(body, { // [!code --]
        height: 1080, // [!code --]
        width: 1920, // [!code --]
        backgroundColor: "#303030", // [!code --]
    }) // [!code --]
    .then(() => { // [!code --]
        // Pixi.JS UI Layer // [!code --]
        canvas.addLayer(CANVAS_UI_LAYER_NAME, new Container()); // [!code --]
Game.init(body, { // [!code ++]
    height: 1080, // [!code ++]
    width: 1920, // [!code ++]
    backgroundColor: "#303030", // [!code ++]
}).then(() => { // [!code ++]
    // Pixi.JS UI Layer // [!code ++]
    canvas.addLayer(CANVAS_UI_LAYER_NAME, new Container()); // [!code ++]
```

```ts
getSaveData(); // [!code --]
Game.exportGameState(); // [!code ++]
```

```ts
getSaveJson(); // [!code --]
JSON.stringify(Game.exportGameState()); // [!code ++]
```

```ts
loadSaveData(data, navigate); // [!code --]
Game.restoreGameState(data, navigate); // [!code ++]
```

```ts
loadSaveJson(data, navigate); // [!code --]
Game.restoreGameState(JSON.parse(dataString) as GameState, navigate); // [!code ++]
```

```ts
loadSaveJson(data, navigate); // [!code --]
Game.restoreGameState(JSON.parse(dataString) as GameState, navigate); // [!code ++]
```

```ts
jsonToSaveData(json); // [!code --]
JSON.parse(json); // [!code ++]
```

```ts
narration.canGoBack; // [!code --]
stepHistory.canGoBack; // [!code ++]
```

```ts
narration.goBack(); // [!code --]
stepHistory.goBack(); // [!code ++]
```

```ts
narration.narrativeHistory; // [!code --]
stepHistory.narrativeHistory; // [!code ++]
```
