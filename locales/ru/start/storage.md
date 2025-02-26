# Game storage

**What is the game storage?** The game storage is a place where you can save variables that you want to keep between game sessions.

It is essential to understand that if variables are not saved in the game memory, the engine will not be able to handle them, when you [load a save](/start/save#load) or when you [go back](/start/labels-flow.md#go-back).

Additionally, in the game archive you can save any type of variable, except `class` and `function` (because they cannot be converted to JSON), such as: `string`, `number`, `boolean`, `object`, `array`... If you want to save "flags" (boolean) it is recommended to use the [flags functionality](/start/flags), a very high-performance flag management system.

<img src="https://cacheable.org/logo.svg" alt="drawing" width="200" style="margin-top: 10px;" />

The entire storage system was developed using [Cacheable](https://cacheable.org/docs/cacheable/#cacheablememory---in-memory-cache), a very efficient library based on [Keyv](https://keyv.org/) that allows you to save variables in memory, in a file, or in a database. If you want to access the Cacheable object you can do so using `storage.storage`.

## Set a variable in the game storage

To set a variable in the game storage, you can use the `storage.setVariable`, which takes two parameters: the variable name and the value.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setVariable("myVariable", 42);
```

## Get a variable from the game storage

To get a variable from the game storage, you can use the `storage.getVariable`, which takes one parameter: the variable name.

```typescript
import { storage } from '@drincs/pixi-vn'

const myVariable = storage.getVariable<number>("myVariable");
```

## Remove a variable from the game storage

To remove a variable from the game storage, you can use the `storage.removeVariable`, which takes one parameter: the variable name.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.removeVariable("myVariable");
```

## Temporary storage

In many occasions it is useful to use variables only for a certain time. Using normal storage we should worry about eliminating these variables once they are no longer needed, to ensure that we take up less space and have lighter saves.

To solve this problem, Pixi’VN has a temporary storage system. Temporary variables initialized in a label will be deleted when it is closed. So if a label is called from it, the temporary variable will still be accessible from the child label. Obviously, if a label is called from it with the jump (so the current label will be closed and the new one started) the temporary variable will no longer be accessible.

**Set a temporary variable**:

To set a temporary variable, you can use the `storage.setTempVariable`, which takes two parameters: the variable name and the value.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setTempVariable("myTempVariable", 42);
```

**Get a temporary variable**:

To get a temporary variable, you can use the normal [`storage.getVariable` function](#get-a-variable-from-the-game-storage).

**Remove a temporary variable**:

To remove a temporary variable, you can use the `storage.removeTempVariable`, which takes one parameter: the variable name.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.removeTempVariable("myTempVariable");
```

## System variables

In storage game, there are some system variables that are used by the game engine. All system variables start with the prefix `___`.
So please avoid using this prefix in your variables.

You can get all the system variables keys with the `storage.keysSystem` function.

<!-- TODO Temp storage -->
