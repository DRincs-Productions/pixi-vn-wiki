# How translate the visual novel?

In visual novels it is common to have the option to translate the game into different languages. Pixi’VN does not have any built-in functionality to handle translations. So you will have to use external libraries to perform translations and you have total freedom of implementation.

The most used library and compatible with many frameworks is [i18next](https://www.i18next.com/). **What is i18next?** i18next is an internationalization-framework written in and for JavaScript.

In order to use i18n you have to initialize it and load the translations.

It is recommended to divide the translations into two parts (See `strings_es.json` tab):

- The [UI](/start/interface.md) texts, that is, the texts that are contained in menus, settings, quick buttons, etc... that is, everything that is not part of the narration.
- The [narration](/start/narration.md) texts, that is, the texts that are contained in dialogues, monologues, etc...

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

Depending on what you want to translate, it is recommended to use the following guides:

- [Translate the UI](#translate-the-ui)
- [Translate the narration (TypeScript/JavaScript)](#translate-the-narration-typescriptjavascript)
- [Translate the narration (_ink_)](/ink/ink-translate.md)
- Translate the dialogue (Ren'Py) (Under development)

## Translate the UI

To translate the UI, you need to use the `t` function that is provided by i18next. The `t` function is a function that will be called with the key of the translation, so you can use it to translate the text.

Is recommended to use as translation key the a lowercase string with underscores.

For example in React:

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
