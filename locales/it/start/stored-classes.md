# Storage Classes

Pixi'VN provides an abstract class `StoredClassModel` that you can use to create classes with properties saved in the game storage.

## Storage key

The custructor of the `StoredClassModel` class have 2 parameters `categoryId` and `id` (must be unique).

- `categoryId`: L'id della categoria. For example if you are storing a character class, you can use "characters" as `categoryId`. So all instances of the character class will be stored in the "characters" category.
- `id`: L'id dell'istanza della classe. This id must be unique for its category.

```typescript
const MY_CLASS_CATEGORY = "__MyClass__"

export default class MyClass extends StoredClassModel {
    constructor(id: string, props: IMyClass) {
        super(MY_CLASS_CATEGORY, id)
        // ...
    }
}
```

## Storate properties

Per salvare le proprietà della classe nell'archivio di gioco è necessario utilizzare i metodi `getStorageProperty` e `setStorageProperty`.

Ad esempio, se hai una proprietà `test` che vuoi salvare nell'archivio del gioco, puoi aggiungere un getter e un setter in questo modo:

```typescript
export default class MyClass extends StoredClassModel {
    constructor(id: string, props: IMyClass) {
        // ...
    }

    get test(): string {
        return this.getStorageProperty<string>("test") || ""
    }
    set test(value: string) {
        this.setStorageProperty<string>("test", value)
    }
}
```
