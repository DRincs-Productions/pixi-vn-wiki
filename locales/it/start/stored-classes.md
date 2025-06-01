# Storage Classes

Pixi'VN fornisce una classe astratta `StoredClassModel` che puoi utilizzare per creare classi con proprietà salvate nello storage del gioco.

## Storage key

Il costruttore della classe `StoredClassModel` ha 2 parametri:

- `categoryId`: L'id della categoria. Ad esempio, se si memorizza una classe di personaggi, è possibile utilizzare "characters" come `categoryId`. Quindi tutte le istanze della classe di personaggi verranno memorizzate nella categoria "characters".
- `id`: L'id dell'istanza della classe. Questo id deve essere univoco per la categoria di appartenenza.

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
