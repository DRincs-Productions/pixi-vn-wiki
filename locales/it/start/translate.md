# Come tradurre la visual novel?

Nelle visual novel o in altri tipi di giochi è comune avere la possibilità di selezionare la lingua del gioco.

Nel progetto Pixi'VN è necessario utilizzare librerie esterne per gestire le traduzioni. Quindi sei libero di scegliere l'implementazione che più ti si addice.

La libreria più utilizzata e compatibile con molti framework è i18next.

## ![icon](/i18next.svg){style="width:30px;height:30px;margin-right:5px;float:left"} Cos'è i18next?

i18next è un framework di internazionalizzazione scritto in e per JavaScript. Per poter utilizzare i18n è necessario installarlo e inizializzarlo.

Puoi saperne di più su i18next sul [sito web di i18next](https://www.i18next.com/).

Le traduzioni verranno inserite in più file json (un file json per ogni lingua) con la corrispondenza chiave-valore. Dove la chiave è una chiave univoca del testo (o il testo da tradurre) e il valore è il testo che verrà visualizzato. Si consiglia di dividere le traduzioni in due parti (guarda il file `strings_es.json`):

- I testi del [interfaccia utente](/start/interface.md), ovvero i testi contenuti nelle schermate, nelle impostazioni, nei pulsanti rapidi, ecc... cioè tutto ciò che non fa parte della narrazione.
- I testi della [narrazione](/start/narration.md), cioè i testi contenuti nei dialoghi, nel menù di scelta, ecc...

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

- [Tradurre l'interfaccia utente](#translate-the-ui)
- [Traduci la narrazione (TypeScript/JavaScript)](#translate-the-narration-typescriptjavascript)
- [Traduci la narrazione (_ink_)](/ink/ink-translate.md)
- Traduci la narrazione (Ren'Py) (In fase di sviluppo)

## Tradurre l'interfaccia utente

Per tradurre l'interfaccia utente, è necessario utilizzare la funzione `t` fornita da i18next. La funzione `t` è una funzione che verrà chiamata passando la chiave come input per ottenere il testo corrispondente nella lingua del giocatore.

Ad esempio:

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

## Tradurre la narrazione (TypeScript/JavaScript)

To translate the UI, you need "override" the `StepLabelProps` interface in the `.d.ts` file to add the `t` function. La funzione `t` è una funzione che verrà chiamata passando la chiave come input per ottenere il testo corrispondente nella lingua del giocatore.

In questo modo puoi usare la funzione `t` nelle [labels](/start/labels.md) per tradurre il testo. Si consiglia di utilizzare `t` all'interno della [label](/start/labels.md) e non quando viene visualizzata l'interfaccia utente, perché in questo modo è possibile utilizzare la [i18n Interpolation](https://i18next.com/translation-function/interpolation).

Si consiglia di utilizzare come chiave di traduzione la stringa nativa da cui viene effettuata la traduzione.

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
