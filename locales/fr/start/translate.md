# How translate the visual novel?

In visual novels, or other types of games, it is common to have the ability to select the game language.

In your Pixi’VN project you need to use external libraries to handle translations. So you are free to choose the implementation that suits you best.

The most used library and compatible with many frameworks is i18next.

## ![icon](/i18next.svg){style="width:30px;height:30px;margin-right:5px;float:left"} What is i18next?

i18next is an internationalization-framework written in and for JavaScript. In order to use i18n you need to install and initialize it.

You can learn more about i18next on the [i18next website](https://www.i18next.com/).

The translations will be inserted into multiple json files (one json file for each language) with the key value correspondence. Where the key is a unique key of the text (or the text to be translated) and the value is the text that will be displayed. It is recommended to split the translations into two parts (see `strings_es.json` file):

- The [UI](/start/interface.md) texts, that is, the texts that are contained in screens, settings, quick buttons, etc... that is, everything that is not part of the narration.
- The [narration](/start/narration.md) texts, i.e. the texts contained in the dialogues, in the choice menu, etc...

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
- Translate the narration (Ren'Py) (Under development)

## Translate the UI

To translate the UI, you need to use the `t` function that is provided by i18next. The `t` function is a function that will be called by passing the key as input to get the corresponding text in the player's language.

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
    const { t } = useTranslation("ui");
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
    const { t } = useTranslation("ui");
</script>

<div>
    <button>{t('text_speed')}</button>
</div>
```

:::

## Translate the narration (TypeScript/JavaScript)

To translate the UI, you need "override" the `StepLabelProps` interface in the `.d.ts` file to add the `t` function. The `t` function is a function that will be called by passing the key as input to get the corresponding text in the player's language.

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
