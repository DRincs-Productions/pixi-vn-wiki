# Migration from v0.10.x to v1.0

## Introduction

This document describes the changes that need to be made to your code to migrate from v0.10.x to v1.0.

Being version 1.0.0 it is the first complete release of the library. It is a breaking change and the API has changed significantly. The fundamental change of this release was to split the entire engine into independent modules. This allows for a more modular and flexible design, making it easier to use the engine in different contexts. The size of packages has been reduced significantly (150 MB to 50 MB) and the engine is now more efficient and faster.

The `Game` namespace object has been introduced for the which contains all the functionality that exploits multiple modules. This is the main entry point for the engine and is used to access all the functions of the engine.

The `stepHistory` module has been introduced to manage the history of the game. Previously the entire management of the game's history was handled by `narration`.

```ts
clearAllGameDatas(); // [!code --]
Game.clear(); // [!code ++]
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
