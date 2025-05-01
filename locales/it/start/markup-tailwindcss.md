# ![icon](/tailwindcss.svg){style="width:40px;height:25px;margin-right:10px;float:left"} Tailwind CSS

**Cos'è Tailwind CSS?** Tailwind CSS è un framework CSS incentrato sull'utilità per la creazione rapida di design personalizzati. Si tratta di un framework di basso livello che fornisce un set di classi di utilità che possono essere utilizzate per creare progetti personalizzati senza dover uscire dall'HTML. Puoi trovare maggiori informazioni su come installarlo [qui](https://tailwindcss.com/docs/installation).

Per saperne di più, visita il [sito web Tailwind CSS](https://tailwindcss.com/).

Sono disponibili vari plugin Tailwind CSS. Ecco un elenco di alcuni di essi:

- [Tailwind CSS Motion](https://docs.rombo.co/tailwind): Adds animations to your Tailwind CSS project.

Si consiglia di utilizzare Tailwind CSS nel progetto Pixi'VN per aggiungere stili o animazioni al testo del dialogo. Ecco un esempio che utilizza il plugin `tailwindcss-motion`:

```ts [labels/startLabel.ts]
import { narration, newLabel } from "@drincs/pixi-vn";

const startLabel = newLabel("start", [
    async () => {
        narration.dialogue = `<span className='motion-translate-y-loop-25'>Hello</span>, welcome to the game!`;
    },
]);
export default startLabel;
```
