# Characters

**What are characters?** The characters are the actors that appear in the visual novel.
In Pixi’VN, characters are created using the `CharacterBaseModel` class or a [custom class](#custom-character).

## Initialize characters

To initialize a character, you need to create a new instance of the `CharacterBaseModel` class and add it into a game character dictionary, when the game is initialized.

For create a new instance of `CharacterBaseModel` you need the following parameters:

- `id`: A unique identifier for the character (string). It is used to reference the character in the game (must be unique).
  If you want to create a [character with an "emotion", you can pass an object](#character-emotions).
- `props`: An object with the character's properties.
  The properties are:
  - `name`: The character's name. ( Required )
  - `surname`: The character's surname. ( Optional )
  - `age`: The character's age. ( Optional )
  - `icon`: The character's icon image URL. ( Optional )
  - `color`: The character's color. ( Optional )

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

`saveCharacter` is required to save the characters in the game.

It is also possible to create a function for loading characters. The important thing is that it is started at least once before the characters are used in the game, otherwise they will not be available.

```typescript [characters.ts]
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export function loadCharacters() {
    const liam = new CharacterBaseModel('liam', {
        name: 'Liam',
        surname: 'Smith',
        age: 25,
        icon: "https://example.com/liam.png",
        color: "#9e2e12"
    });

    const emma = new CharacterBaseModel('emma', {
        name: 'Emma',
        surname: 'Johnson',
        age: 23,
        icon: "https://example.com/emma.png",
        color: "#9e2e12"
    });

    saveCharacter([liam, emma]);
}

loadCharacters();
```

## Get characters by id

To get a character by its `id`, you can use the `getCharacterById` function.

```typescript
import { getCharacterById } from "@drincs/pixi-vn";

const liam = getCharacterById('liam');
```

## Get all characters

To get all characters, you can use the `getAllCharacters` function.

```typescript
import { getAllCharacters } from "@drincs/pixi-vn";

const characters = getAllCharacters();
```

## Edit characters in the game

`CharacterBaseModel` is a [stored class](/start/stored-classes), which means that it is possible to save and load the character's properties from the [game storage](/start/storage).

It means that if the character's name is changed during the game, the new character name will be saved in the game storage by linking it to his `id`.

Furthermore, it is important to consider that if the **character's  id is changed**, from one version to another, the system will **not** move the data linked to the previous `id` to the new `id`.

The properties of the `CharacterBaseModel` that are stored in the game storage are:

- `name`: The character's name.
- `surname`: The character's surname.
- `age`: The character's age.

To get the properties used when instantiating the class you can use:

- `defaultName`: The character's name.
- `defaultSurname`: The character's surname.
- `defaultAge`: The character's age.

Here's a simplified implementation of the `CharacterBaseModel` class for better understanding of the properties that are stored in the game storage:

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

## Use characters in the game

You can use the characters in the game for example to [set a dialogue](/start/dialogue#set-the-current-dialogue). You can use the character's `id` or the character's instance, but it is recommended to use the instance.

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

## Character emotions

It can often be useful to have multiple types of the same character.

A classic example of visual novels is to have a character "Alice" a subtype related to his/her emotional state "Angry Alice". The character and the subtype have the same characteristics apart from one or more properties, such as the icon.

For this reason, in Pixi’VN it is possible to create a "character with an emotion". This is possible by passing the id as an object with two properties: the `id`, that corresponds to the id of an already existing character, and the `emotion`, that corresponds to the emotion of the character.

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

## Custom character

It recommend creating your own class `Character` that extends `CharacterStoredClass` and "override" the interface `CharacterInterface`
to add/edit/remove properties or methods.

For example, you want to create a class `Character`, you must "override" the interface `CharacterInterface` to use your properties or methods. ( See the following file `pixi-vn.types.ts` )

Now you can create a class `Character` that extends `CharacterStoredClass` and implements the `CharacterInterface`.

For set the properties and store them in the game storage, you must use the `setStorageProperty` method. ( See the following file `Character.ts` )

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
