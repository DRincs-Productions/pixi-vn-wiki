# Replace portions of text in *ink*

In **native *ink*** it is possible to inject variables in the text as in the following example `Hello, {name}`. But in case you need to use a property of an object that is in the storage or if you want to use the value of a JS/TS function, you cannot use the following syntax `{ key }`.

In **Pixi’VN *ink*** you can use the following syntax to replace the text:

```ink
What do you want, [alice]?
* Talk to \[bob\]
```

In this case Pixi’VN checks if there is a value linked to the keys `alice` and `bob`. If there is a value linked to the key `alice`, the text `[alice]` will be replaced by the value, same for the key `bob`.

To assign a value to a key you can use the following 2 methods:

## Use onReplaceTextAfterTranslation

You can override the function `onReplaceTextAfterTranslation` to assign a value to a key. This function is called after the [translation](/ink/ink-translate.md) of the text and have how parameter the key to replace and return the value to replace or `undefined` if the key does not need to be replaced (so the key will be displayed with the brackets `[key]`).

```ts
import { onReplaceTextAfterTranslation } from '@drincs/pixi-vn-ink'
import { getCharacterById } from "@drincs/pixi-vn";

onReplaceTextAfterTranslation((key) => {
    if (key === 'bob') {
        return 'Bob'
    }

    let character = getCharacterById(key)
    if (character) {
        return character.name
    }

    // if return undefined, the system will not replace the character id
    return undefined
})
```

## Use onReplaceTextBeforeTranslation

You can override the function `onReplaceTextBeforeTranslation` to add a script that can be interpreted by the [translation library](/ink/ink-translate.md) used (for example [i18next](https://www.i18next.com/)).

```ts
import { onReplaceTextBeforeTranslation, onInkTranslate } from '@drincs/pixi-vn-ink'
import { useTranslation } from "react-i18next";
import { bob } from "../values/characters"

const { t } = useTranslation(["narration"]);

onInkTranslate((text) => {
    return t(text)
})

onReplaceTextBeforeTranslation((key) => {
    return `{{${key}}}`
})

i18n.init({
    debug: false,
    fallbackLng: 'en',
    // ...
    missingInterpolationHandler(_text, value, _options) {
        let key = value[1]
        if (key === 'bob') {
            return 'Bob'
        }

        let character = getCharacterById(key)
        if (character) {
            return character.name
        }

        return `[${key}]`
    },
});
```
