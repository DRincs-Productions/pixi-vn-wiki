# Game storage

The game storage is a place where you can save variables that you want to keep between game sessions.

It is essential to understand that if the variables are not saved in the game memory, when [loading a save](/start/save#load) or when [going back](/start/labels-flow.md#go-back), they will not be handled.

Furthermore, only primary type variables can be saved in the game storage. The primary types are `string`, `number`, `boolean`, `object`, `array`...  and not `function`, `class`...

( For boolean values, you can use the [flags management](/start/flags) )

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
