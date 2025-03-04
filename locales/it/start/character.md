# Personaggi

**Cosa sono i characters?** I personaggi sono gli attori che compaiono nella visual novel.
In Pixi'VN, i personaggi vengono creati utilizzando la classe `CharacterBaseModel` o una [classe personalizzata](#custom-character).

## Definisci i personaggi

Per definire un personaggio, è necessario creare una nuova istanza della classe `CharacterBaseModel` e aggiungerla al dizionario dei personaggi di gioco, quando il gioco viene inizializzato.

Per creare una nuova istanza di `CharacterBaseModel` sono necessari i seguenti parametri:

- `id`: Un identificatore univoco per il personaggio (stringa). Viene utilizzato per fare riferimento al personaggio nel gioco (deve essere univoco).
  Se vuoi creare un [personaggio con un'"emozione", puoi passare un oggetto](#character-emotions).
- `props`: Un oggetto con le proprietà del personaggio.
  Le proprietà sono:
  - `name`: Il nome del personaggio. ( Necessario )
  - `surname`: Il cognome del personaggio. ( Opzionale )
  - `age`: L'età del personaggio. ( Opzionale )
  - `icon`: URL dell'immagine dell'icona del personaggio. ( Opzionale )
  - `color`: Il colore del personaggio. ( Opzionale )

```typescript [characters.ts]
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const liam = new CharacterBaseModel('liam', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

export const emma = new CharacterBaseModel('emma', {
    name: 'Emma',
    surname: 'Johnson',
    age: 23,
    icon: "https://example.com/emma.png",
    color: "#9e2e12"
});

saveCharacter([liam, emma]);
```

`saveCharacter` è **necessario** per salvare i personaggi nel gioco.

È anche possibile creare una funzione per il caricamento dei personaggi. L'importante è che venga avviato almeno una volta prima di utilizzare i personaggi nel gioco, altrimenti non saranno disponibili.

## Ottieni i personaggi tramite id

Per ottenere un personaggio tramite il suo `id`, puoi usare la funzione `getCharacterById`.

```typescript
import { getCharacterById } from "@drincs/pixi-vn";

const liam = getCharacterById('liam');
```

## Ottieni tutti i personaggi

Per ottenere tutti i personaggi, puoi usare la funzione `getAllCharacters`.

```typescript
import { getAllCharacters } from "@drincs/pixi-vn";

const characters = getAllCharacters();
```

## Modifica i personaggi nel gioco

`CharacterBaseModel` è una [classe storicizzata](/start/stored-classes), il che significa che le sue proprietà sono salvate nella [memoria di gioco](/start/storage).

Ciò significa che se il nome del personaggio viene modificato durante il gioco, il nuovo nome del personaggio verrà salvato nella memoria del gioco collegandolo al suo `id`.

Inoltre, è importante considerare che se l'**id del personaggio viene modificato** da una versione all'altra, il sistema **non** sposterà i dati collegati dal precedente `id` al nuovo `id`.

Le proprietà del `CharacterBaseModel` che vengono memorizzate nella memoria del gioco sono:

- `name`: Il nome del personaggio.
- `surname`: Il cognome del personaggio.
- `age`: L'età del personaggio.

Per ottenere le proprietà utilizzate durante l'istanziazione della classe è possibile utilizzare:

- `defaultName`: Il nome del personaggio.
- `defaultSurname`: Il cognome del personaggio.
- `defaultAge`: L'età del personaggio.

Ecco un'implementazione semplificata della classe `CharacterBaseModel` per comprendere meglio le proprietà storicizzate nell'archivio del gioco:

```typescript
export default class CharacterBaseModel extends StoredClassModel implements CharacterBaseModelProps {
    constructor(id: string, props: CharacterBaseModelProps) {
        super(
            // ...
        )
        this.defaultName = props.name
        this.icon = props.icon
        // ...
    }

    // name property is stored in the game storage
    private defaultName: string = ""
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName
    }
    set name(value: string) {
        this.setStorageProperty<string>("name", value)
    }

    // icon property is not stored in the game storage
    icon: string = ""

    // ...
}
```

## Usa i personaggi nel gioco

Ad esempio, puoi usare i personaggi del gioco per [collegarli al dialogo corrente](/start/dialogue#set-the-current-dialogue). Puoi usare l'`id` del personaggio o l'istanza del personaggio, ma è consigliabile usare l'istanza.

```typescript [characters.ts]
export const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});
saveCharacter([liam]);
```

```typescript
narration.dialogue = { character: liam, text: "Hello" }
// or
narration.dialogue = { character: "liam_id", text: "Hello" }
```

## Emozioni del personaggio

Spesso può essere utile avere più tipi dello stesso personaggio.

Un esempio classico nelle visual novel è quello in cui il personaggio "Alice" ha un sottotipo correlato al suo stato emotivo, "Alice arrabbiata". Il personaggio e il sottotipo hanno le stesse caratteristiche, ad eccezione di una o più proprietà, come l'icona.

Per questo motivo con Pixi’VN è possibile creare un “personaggio con un’emozione”. This is possible by passing an object, instead of the id, with the following properties:

- `id`, which corresponds to the id of an existing character.
- `emotion`, which corresponds to the character's emotion.

```typescript [characters.ts]
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const alice = new CharacterBaseModel('alice', {
    name: 'Alice',
    icon: "https://example.com/alice.png",
    color: "#9e2e12"
});

export const angryAlice = new CharacterBaseModel({ id: 'alice', emotion: 'angry' }, {
    icon: "https://example.com/angryAlice.png",
});

saveCharacter([alice, angryAlice]);
```

```typescript
console.log(alice.name); // Alice

alice.name = "Eleonora";
console.log(alice.name); // Eleonora
console.log(angryAlice.name); // Eleonora

angryAlice.name = "Angry Eleonora";
console.log(alice.name); // Eleonora
console.log(angryAlice.name); // Angry Eleonora
```

## Personaggio personalizzato

Si consiglia di creare la propria classe `Character` che estende `CharacterStoredClass` e di "sovrascrivere" l'interfaccia `CharacterInterface` per aggiungere/modificare/rimuovere proprietà o metodi.

Ad esempio, se vuoi creare una classe `Character`, devi "sovrascrivere" l'interfaccia `CharacterInterface` per utilizzare le tue proprietà o metodi. ( See the file `pixi-vn.types.ts` )

Ora puoi creare una classe `Character` che estende `CharacterStoredClass` e implementa `CharacterInterface`.

To save property changes to the game storage, you can use the `setStorageProperty` method. ( See the file `Character.ts` )

::: code-group

```ts [models/Character.ts]
import { CharacterInterface, CharacterStoredClass } from "@drincs/pixi-vn";

export class Character extends CharacterStoredClass implements CharacterInterface {
    constructor(id: string | { id: string, emotion: string }, props: CharacterProps) {
        super(typeof id === "string" ? id : id.id, typeof id === "string" ? "" : id.emotion)
        this._icon = props.icon
        this._color = props.color
        this.defaultName = props.name
        this.defaultSurname = props.surname
        this.defaultAge = props.age
    }

    // Not stored properties
    
    readonly icon?: string;
    readonly color?: string | undefined;

    // Stored properties

    private defaultName?: string
    get name(): string {
        return this.getStorageProperty<string>("name") || this.defaultName || this.id
    }
    set name(value: string | undefined) {
        this.setStorageProperty<string>("name", value)
    }
    private defaultSurname?: string
    get surname(): string | undefined {
        return this.getStorageProperty<string>("surname") || this.defaultSurname
    }
    set surname(value: string | undefined) {
        this.setStorageProperty<string>("surname", value)
    }
    private defaultAge?: number | undefined
    get age(): number | undefined {
        return this.getStorageProperty<number>("age") || this.defaultAge
    }
    set age(value: number | undefined) {
        this.setStorageProperty<number>("age", value)
    }
}

interface CharacterProps {
    /**
     * The name of the character.
     */
    name?: string;
    /**
     * The surname of the character.
     */
    surname?: string;
    /**
     * The age of the character.
     */
    age?: number;
    /**
     * The icon of the character.
     */
    icon?: string;
    /**
     * The color of the character.
     */
    color?: string;
}
```

```ts [pixi-vn.d.ts]
declare module '@drincs/pixi-vn' {
    interface CharacterInterface {
        /**
         * The name of the character.
         * If you set undefined, it will return the default name.
         */
        name: string;
        /**
         * The surname of the character.
         * If you set undefined, it will return the default surname.
         */
        surname?: string;
        /**
         * The age of the character.
         * If you set undefined, it will return the default age.
         */
        age?: number;
        /**
         * The icon of the character.
         */
        readonly icon?: string;
        /**
         * The color of the character.
         */
        readonly color?: string;
    }
}
```

:::
