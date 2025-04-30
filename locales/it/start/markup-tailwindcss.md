# ![icon](/tailwindcss.svg){style="width:40px;height:25px;margin-right:10px;float:left"} Tailwind CSS

**Cos'è Tailwind CSS?** Tailwind CSS è un framework CSS incentrato sull'utilità per la creazione rapida di design personalizzati. Si tratta di un framework di basso livello che fornisce un set di classi di utilità che possono essere utilizzate per creare progetti personalizzati senza dover uscire dall'HTML. Puoi trovare maggiori informazioni su come installarlo [qui](https://tailwindcss.com/docs/installation).

You can learn more on the [Tailwind CSS website](https://tailwindcss.com/).

There are various Tailwind CSS plugins available. Here is a list of some of them:

- [Tailwind CSS Motion](https://docs.rombo.co/tailwind): Add animations to your Tailwind CSS project.

It is recommended to use Tailwind CSS in your Pixi’VN project to add styling or animations to your dialogue text. Here is an example using the `tailwindcss-motion` plugin:

```ts [labels/startLabel.ts]
import { narration, newLabel } from "@drincs/pixi-vn";

const startLabel = newLabel("start", [
    async () => {
        narration.dialogue = `<span className='motion-translate-y-loop-25'>Hello</span>, welcome to the game!`;
    },
]);
export default startLabel;
```
