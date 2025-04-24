# Storage di gioco

\*\*Che cos'è lo storage di gioco? \*\* Lo storage di gioco è un luogo in cui è possibile salvare le variabili che si desidera conservare tra le sessioni di gioco.

È fondamentale capire che se le variabili non vengono salvate nella memoria del gioco, il motore non sarà in grado di gestirle quando si [carica un salvataggio](/start/save#load) o quando si [torna indietro](/start/labels-flow.md#go-back).

Inoltre, nell'archivio del gioco è possibile salvare qualsiasi tipo di variabile, eccetto `class` e `function` (perché non possono essere convertite in JSON), come: `string`, `number`, `boolean`, `object`, `array`... Se si desidera salvare i "flag" (booleani) si consiglia di utilizzare la [funzionalità flag](/start/flags), un sistema di gestione dei flag ad altissime prestazioni.

## Imposta una variabile nello storage di gioco

Per impostare una variabile nell'archivio di gioco, puoi usare `storage.setVariable`, che accetta due parametri: il nome della variabile e il valore.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setVariable("myVariable", 42);
```

## Ottieni una variabile dallo storage di gioco

Per ottenere una variabile dall'archivio del gioco, puoi utilizzare `storage.getVariable`, che accetta un parametro: il nome della variabile.

```typescript
import { storage } from '@drincs/pixi-vn'

const myVariable = storage.getVariable<number>("myVariable");
```

## Rimuovi una variabile dall'archivio del gioco

Per rimuovere una variabile dall'archivio del gioco, puoi utilizzare `storage.removeVariable`, che accetta un parametro: il nome della variabile.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.removeVariable("myVariable");
```

## Storage temporaneo

In many occasions it is useful to use variables only during a certain period of the narrative. Utilizzando un archivio normale dovremmo preoccuparci di eliminare queste variabili quando non sono più necessarie, per assicurarci di occupare meno spazio e avere salvataggi più leggeri.

Per risolvere questo problema, Pixi’VN dispone di un sistema di archiviazione temporanea. Temporary variables initialized in a label will be deleted when the label is closed. So if a another label is called from it, the temporary variable will still be accessible from the child label. Obviously, if a another label is called from it with the "jump" (so the current label will be closed and the new one started) the temporary variable will no longer be accessible.

**Imposta una variabile temporanea**:

Per impostare una variabile temporanea, è possibile utilizzare `storage.setTempVariable`, che accetta due parametri: il nome della variabile e il valore.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setTempVariable("myTempVariable", 42);
```

**Ottieni una variabile temporanea**:

Per ottenere una variabile temporanea, puoi usare la normale funzione [`storage.getVariable`](#get-a-variable-from-the-game-storage).

**Rimuovi una variabile temporanea**:

To remove a temporary variable, you can use the `storage.removeTempVariable`, which takes one parameter: the variable name.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.removeTempVariable("myTempVariable");
```

## System variables

In storage game, there are some system variables that are used by the game engine. All system variables start with the prefix `___`.
So please avoid using this prefix in your variables.

You can get all the system variables keys with the `SYSTEM_RESERVED_STORAGE_KEYS` function.

<!-- TODO Temp storage -->

## ![icon](/keyv.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Keyv

The entire storage system was developed using Map, a native JavaScript object, so you can use Keyv interact with game storage.

**What is Keyv?** Keyv is a simple key-value storage. It is a very easy-to-use system and very popular in the Node.js community. Keyv can be combined with other libraries, such as [Cacheable](https://cacheable.org/) (Caching for Nodejs based on Keyv).

You can learn more about Keyv on the [Keyv website](https://keyv.org/).

**How to use Keyv with Pixi’VN?** You can use Keyv with Pixi’VN by creating a new instance of Keyv and passing the storage object as a parameter.

```typescript
import { storage } from '@drincs/pixi-vn'
import Keyv from 'keyv';

const keyvStorage = new Keyv({ store: storage.storage });

keyvStorage.get<string>("myValue").then((value) => {
    console.log(value);
});
```
