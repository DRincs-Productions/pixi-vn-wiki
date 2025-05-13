# Flags Management

Pixi’VN provides functions to manage "game flags". By "game flags" I mean boolean values that can be used to control the flow of the game, or olther boolean values that you want to save in the game storage.

This mechanic has much less impact on save size than directly [saving a boolean in Game Sorage](/start/storage#set-a-variable-in-the-game-storage).

## Set a Flag

To set a flag you can use the `storage.setFlag` function. The `storage.setFlag` function have the following parameters:

* `name`: The flag name.
* `value`: The flag value.

```typescript
import { storage } from '@drincs/pixi-vn'

storage.setFlag('flag1', true)
```

## Get a Flag

To get a flag you can use the `storage.getFlag` function. The `storage.getFlag` function have the following parameters:

* `name`: The flag name.

```typescript
import { storage } from '@drincs/pixi-vn'

const flag1 = storage.getFlag('flag1')
```

## Development possibilities

### Connect flag to class boolean property

If you are creating a class with a boolean property, you can connect it to a flag. So this property will be automatically updated when the flag is changed.

This can simplify the code and make it more readable.

```typescript
import { storage, storage.setFlag } from '@drincs/pixi-vn'

class ButtonClass {
    private _disabled: boolean | string
    get disabled() {
        if (typeof this._disabled === 'string') {
            return storage.getFlag(this._disabled)
        }
        return this._disabled
    }
    set disabled(value: boolean | string) {
        this._disabled = value
    }
}
```

```typescript
// Button to go to school
const goToSchoolButton = new ButtonClass()
goToSchoolButton.disabled = 'weekend'

function afterNewDay() {
    storage.setFlag('weekend', 
        // Check if it is Saturday or Sunday
    )
}
```
