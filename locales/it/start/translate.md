# Come tradurre la visual novel?

Nelle visual novel o in altri tipi di giochi è comune avere la possibilità di selezionare la lingua del gioco.

Nel progetto Pixi'VN è necessario utilizzare librerie esterne per gestire le traduzioni. Quindi sei libero di scegliere l'implementazione che più ti si addice.

La libreria più utilizzata e compatibile con molti framework è [i18next](https://www.i18next.com/). **Cos'è i18next?** i18next è un framework di internazionalizzazione scritto in e per JavaScript.

In order to use i18n you need to install and initialize it.

The translations will be inserted into multiple json files (one json file for each language) with the key value correspondence. Where the key is a unique key of the text (or the text to be translated) and the value is the text that will be displayed. It is recommended to split the translations into two parts (see `strings_es.json` file):

- I testi [UI](/start/interface.md), ovvero i testi contenuti nei menu, nelle impostazioni, nei pulsanti rapidi, ecc... cioè tutto ciò che non fa parte della narrazione.
- The [narration](/start/narration.md) texts, i.e. the texts contained in the dialogues, the texts in the choice menu, etc...

::: code-group

```typescript [i18n.ts]
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import strings_en from '../src/values/translations/strings_en.json';
import strings_es from '../src/values/translations/strings_es.json';

const getUserLang = (): string => {
    let userLang: string = navigator.language || "en";
    return userLang?.toLocaleLowerCase()?.split("-")[0];
}

export const useI18n = () => {
    if (!i18n.isInitialized) {
        i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                debug: false,
                fallbackLng: 'en',
                lng: getUserLang(),
                interpolation: {
                    escapeValue: false,
                },
                resources: {
                    en: strings_en,
                    es: strings_es,
                    // Add more languages here
                }
            });
    }
}
```

```ts [main.ts]
import { useI18n } from './i18n';

useI18n()
```

```json [locales/strings_es.json]
{
    "ui": {
        "text_speed": "Velocidad del texto",
        // ...
    },
    "narration": {
        "Hello, my name is {{name}}": "Hola, mi nombre es {{name}}"
        // ...
    }
}
```

:::

A seconda di cosa si desidera tradurre, si consiglia di utilizzare le seguenti guide:

- [Tradurre l'UI](#translate-the-ui)
- [Traduci la narrazione (TypeScript/JavaScript)](#translate-the-narration-typescriptjavascript)
- [Traduci la narrazione (_ink_)](/ink/ink-translate.md)
- Traduci il dialogo (Ren'Py) (In fase di sviluppo)

## Tradurre l'UI

Per tradurre l'UI, è necessario utilizzare la funzione `t` fornita da i18next. The `t` function is a function that will be called with the key of the translation, so you can use it to translate the text.

Is recommended to use as translation key the a lowercase string with underscores.

For example:

::: code-group

```tsx [React]
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
    const { t } = useTranslation("ui");

    return (
        <div>
            <Button>{t("text_speed")}</Button>
        </div>
    );
}
```

```vue [Vue]
<script setup>
    import { useTranslation } from "i18next-vue";
    const { t } = useTranslation();
</script>

<template>
    <div>
        <button>{{ t('text_speed') }}</button>
    </div>
</template>
```

```svelte [Svelte]
<script>
    import { useTranslation } from 'svelte-i18n';
    const { t } = useTranslation();
</script>

<div>
    <button>{t('text_speed')}</button>
</div>
```

:::

## Translate the narration (TypeScript/JavaScript)

To translate the UI, you need overwrite the `StepLabelProps` interface to add the `t` function. The `t` function is a function that will be called with the key of the translation, so you can use it to translate the text.

This way you can use the `t` function in [labels](/start/labels.md) to translate the text. It is recommended to use `t` inside the [label](/start/labels.md) and not when the UI is displayed, because this way you can use the [i18n Interpolation](https://i18next.com/translation-function/interpolation).

Is recommended to use as translation key the native string from which the translation is made.

::: code-group

```typescript [pixi-vn.d.ts]
declare module '@drincs/pixi-vn' {
    interface StepLabelProps {
        /**
         * Translate a key to a string.
         * @param key The key to translate.
         * @returns The translated string.
         */
        t: TFunction<[string], undefined>
        // ...
    }
}
```

```typescript [labels/startLabel.ts]
export const startLabel = newLabel("start_label",
    [
        ({ t }) => { // [!code focus]
            narration.dialogue = {
                character: liam,
                text: t("Hello, my name is {{name}}", { name: "Liam" }) // [!code focus]
            }
        },
    ]
)
```

:::
