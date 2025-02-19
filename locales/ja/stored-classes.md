# Storage Classes

Pixi’VN provides a abstract class `StoredClassModel` that you can use to create classes that can be saved and loaded from the game storage. I suggest you extend this class to create your own stored class.

## Storage key

The custructor of the `StoredClassModel` class have 2 parameters `categoryId` and `id` ( must be unique ).

- `categoryId`: The id of the category. For example if you are storing a character class, you can use "characters" as categoryId. so all instances of the character class will be stored in the "characters" category.
- `id`: The id of instance of the class. This id must be unique for the category.

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

To save the properties of the class in the game storage you must use the `getStorageProperty` and `setStorageProperty` methods.

For example, if you have a property `test` that you want to save in the game storage, you can add a getter and setter like this:

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
