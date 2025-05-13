# How translate *ink* text?

As explained in more detail [here](/start/translate.md), Pixi’VN gives the possibility to translate the game text using a library, such as [i18next](https://www.i18next.com/). Also in ***ink* + Pixi’VN integration** you can use a library to translate the text of the ***ink***.

Pixi'VN gives the developer the ability to intercept the translation event with the `onInkTranslate` function.

The `onInkTranslate` function has as a parameter a callback function takes as parameter the text to translate and returns the translated text.

:::tabs
== index.tsx

```ts
import { onInkTranslate } from '@drincs/pixi-vn-ink'
import { useTranslation } from "react-i18next";

const { t } = useTranslation(["narration"]);
onInkTranslate((text) => {
   return t(text)
})
```

== start.ink

```ink
=== start ===
Hello, my name is [joe]
-> DONE
```

== App.tsx

```tsx
import { useI18n } from './i18n'; // [!code focus]

export default function App() {
    useI18n() // [!code focus]

    return (
        // ...
    );
}
```

== strings_es.json

```json
{
    "narration": {
        "Hello, my name is [joe]": "Hola, mi nombre es [joe]"
        // ...
    }
}
```

:::

<sandbox
  template="7pg6dy"
  entry="/src/ink/start.ink"
/>

## Auto-generation of translation files

( Under development )
