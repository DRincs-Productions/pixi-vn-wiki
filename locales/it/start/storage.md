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

In molte occasioni è utile utilizzare le variabili solo durante un certo periodo della narrazione. Utilizzando un archivio normale dovremmo preoccuparci di eliminare queste variabili quando non sono più necessarie, per assicurarci di occupare meno spazio e avere salvataggi più leggeri.

Per risolvere questo problema, Pixi’VN dispone di un sistema di archiviazione temporanea. Le variabili temporanee inizializzate in un'etichetta verranno eliminate quando l'etichetta viene chiusa. Pertanto, se da essa viene richiamata un'altra label, la variabile temporanea sarà comunque accessibile dalla label figlia. Ovviamente, se da essa viene chiamata un'altra label con il "jump" (quindi la label corrente verrà chiusa e quella nuova verrà avviata) la variabile temporanea non sarà più accessibile.

**Imposta una variabile temporanea**:

Per impostare una variabile temporanea, è possibile utilizzare `storage.setTempVariable`, che accetta due parametri: il nome della variabile e il valore.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setTempVariable("myTempVariable", 42);
```

**Ottieni una variabile temporanea**:

Per ottenere una variabile temporanea, puoi usare la normale funzione [`storage.getVariable`](#get-a-variable-from-the-game-storage).

**Rimuovi una variabile temporanea**:

Per rimuovere una variabile temporanea, è possibile utilizzare `storage.removeTempVariable`, che accetta un parametro: il nome della variabile.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.removeTempVariable("myTempVariable");
```

## Variabili di sistema

Nello storage di gioco sono presenti alcune variabili di sistema utilizzate dal motore di gioco. Tutte le variabili di sistema iniziano con il prefisso `___`.
Si prega quindi di evitare di utilizzare questo prefisso nelle tue variabili.

È possibile ottenere tutte le chiavi delle variabili di sistema dalla costante `SYSTEM_RESERVED_STORAGE_KEYS`.

## ![icon](/keyv.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Keyv

L'intero sistema di storage è stato sviluppato utilizzando Map, un oggetto JavaScript nativo, in modo da poter utilizzare Keyv per interagire con lo storage di gioco.

**Cos'è Keyv?** Keyv è un semplice sistema di archiviazione chiave-valore. È un sistema molto semplice da usare e molto popolare nella comunità Node.js. Keyv può essere combinato con altre librerie, come [Cacheable](https://cacheable.org/) (Caching per Nodejs basata su Keyv). Per saperne di più, visita il [sito web Keyv](https://keyv.org/).

**Come utilizzare Keyv con Pixi'VN?** È possibile utilizzare Keyv con Pixi'VN creando una nuova istanza di Keyv e passando lo storage come parametro.

```typescript
import { storage } from '@drincs/pixi-vn'
import Keyv from 'keyv';

const keyvStorage = new Keyv({ store: storage.storage });

keyvStorage.get<string>("myValue").then((value) => {
    console.log(value);
});
```
