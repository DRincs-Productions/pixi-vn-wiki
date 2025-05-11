# Menù a scelta

Nelle visual novel, solitamente, sono presenti dei menu di scelta che consentono al giocatore di prendere decisioni che influenzeranno la storia.

In Pixi'VN c'è la possibilità di chiedere al giocatore di fare una scelta. Each choice can either start a label or close the choice menu.

## Richiedi al giocatore di fare una scelta

Per richiedere al giocatore di effettuare una scelta, è possibile impostare `narration.choiceMenuOptions` con un array di `StoredChoiceInterface`. Per creare un oggetto `StoredChoiceInterface`, puoi usare:

- [`newChoiceOption`](#choice-menu-option)
- [`newCloseChoiceOption`](#choice-for-closing-the-menu)

```ts [labels/startLabel.ts]
import { newChoiceOption, newCloseChoiceOption, narration, newLabel } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        async () => {
            narration.dialogue = "Choose a fruit:"
            narration.choiceMenuOptions = [ // [!code focus]
                newChoiceOption("Orange", orangeLabel, {}), // by default, the label will be called by call // [!code focus]
                newChoiceOption("Banana", bananaLabel, {}, { type: "jump" }), // [!code focus]
                newChoiceOption("Apple", appleLabel, { quantity: 5 }, { type: "call" }), // [!code focus]
                newCloseChoiceOption("Cancel"), // [!code focus]
            ] // [!code focus]
        },
        () => { narration.dialogue = "Restart" },
        async (props) => await narration.jumpLabel("start_label", props)
    ],
)
```

<sandbox
template="wv63yr"
entry="/src/labels/startLabel.ts"
/>

### Creare un'opzione di menu di scelta

In Pixi'VN puoi creare opzioni di menu di scelta utilizzando la funzione `newChoiceOption`.

`newChoiceOption` è una funzione che ha come parametri:

- `text`: Il testo che verrà visualizzato nel menu di scelta.
- `label`: L'[label](/start/labels#label) che verrà chiamata quando il giocatore sceglie l'opzione.
- `props`: Le proprietà che verranno passate al label, se la label non necessita di alcun parametro, è possibile passare un oggetto vuoto `{}`.
- `options`:
  - `type`: Il modo in cui verrà [chiamata la label](/start/labels-flow.md#run-a-label). Può essere `call` o `jump`. Il valore predefinito è `call`.
  - `oneTime`: Se `true`, la scelta può essere effettuata solo una volta.
  - `onlyHaveNoChoice`: Se `true`, la scelta è visibile solo se non ci sono altre scelte.
  - `autoSelect`: Se `true` e se è l'unica scelta, verrà selezionato automaticamente.

### Create a close choice menu option

Oltre a `newChoiceOption` esiste anche un'altra funzione `newCloseChoiceOption` che consente di creare un'opzione di chiusura. Il suo funzionamento consiste nel chiudere il menu di scelta e proseguire con gli [step](/start/labels.md), senza dover chiamare alcuna [label](/start/labels.md#label).

`newCloseChoiceOption` è una funzione che ha come parametri:

- `text`: Il testo che verrà visualizzato nel menu di scelta.
- `options`:
  - `closeCurrentLabel`: Se `true`, la label corrente verrà chiusa. Il valore predefinito è `false`.
  - `oneTime`: Se `true`, la scelta può essere effettuata solo una volta.
  - `onlyHaveNoChoice`: Se `true`, la scelta è visibile solo se non ci sono altre scelte.
  - `autoSelect`: Se `true` e se è l'unica scelta, verrà selezionato automaticamente.

## Get the user requested choice options

To get the choice menu, you can use `narration.choiceMenuOptions`. Il risultato è un array di `newChoiceOption` e/o `newCloseChoiceOption`.

```typescript
const menuOptions: StoredChoiceInterface[] = narration.choiceMenuOptions;
```

## Seleziona una scelta

Per selezionare un'opzione, puoi usare `narration.selectChoice`.

```typescript
const item = narration.choiceMenuOptions![0]; // get the first item of the menu

narration.selectChoice(item, {
    // add StepLabelProps here
    navigate: navigate, // example
    // and the props that will be passed to the label
    ...item.props
})
    .then(() => {
        // ...
    })
    .catch((e) => {
        // ...
    })
```

## Cancella il menu di scelta

Per cancellare le opzioni di scelta, puoi usare `narration.choiceMenuOptions = undefined`.

```typescript
narration.choiceMenuOptions = undefined;
```

## Personalizza l'opzione del menu di scelta

È possibile personalizzare l'opzione del menu di scelta aggiungendo ulteriori proprietà all'interfaccia `ChoiceInterface`. Ad esempio, è possibile aggiungere una proprietà `icon` per aggiungere un'icona all'opzione del menu di scelta.

Per fare ciò, è necessario "sovrascrivere" l'interfaccia `ChoiceInterface` nel file `.d.ts`.

::: code-group

```typescript [pixi-vn.d.ts]
declare module '@drincs/pixi-vn' {
    interface ChoiceInterface {
        icon?: string
    }
}
```

```typescript
narration.choiceMenuOptions = [
    newChoiceOption("Orange", orangeLabel, {}, { icon: "orange.png" }),
    newChoiceOption("Banana", bananaLabel, {}, { icon: "banana.png" }),
    newChoiceOption("Apple", appleLabel, {}, { icon: "apple.png" }),
]
```

```tsx [screens/ChoiceMenu.tsx]
function ChoiceMenu({ choices }: { choices: StoredIndexedChoiceInterface[] }) {
    return (
        <div>
            {choices.map((choice, index) => (
                <div key={index}>
                    {choice.icon && <img src={choice.icon} alt={choice.text} />}
                    <button onClick={() => narration.selectChoice(choice)}>{choice.text}</button>
                </div>
            ))}
        </div>
    )
}
```

:::

## Come creare la schermata dell'interfaccia utente del menu di scelta

Ad esempio:

(**È in HTML di base**, dovrai sostituire gli elementi HTML di base con componenti UI dalla tua libreria preferita per migliorare la grafica. )

<sandbox
template="k8r2xf"
entry="/src/screens/ChoiceMenu.tsx"
/>
