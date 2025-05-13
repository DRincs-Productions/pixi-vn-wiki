# ![icon](/tailwindcss.svg){style="width:40px;height:25px;margin-right:10px;float:left"} Tailwind CSS

**What is Tailwind CSS?** Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It is a low-level framework that provides a set of utility classes that can be used to build custom designs without having to leave the HTML. You can get more information on how install it [here](https://tailwindcss.com/docs/installation).

You can learn more on the [Tailwind CSS website](https://tailwindcss.com/).

There are various Tailwind CSS plugins available. Here is a list of some of them:

* [Tailwind CSS Motion](https://docs.rombo.co/tailwind): Adds animations to your Tailwind CSS project.

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
