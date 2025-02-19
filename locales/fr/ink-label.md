# _ink_ knot (or label)

As explained in the [official documentation](https://www.inklestudios.com/ink/web-tutorial/) of the **_ink_ language**:

The story is comprised of multiple linked sections which we call "knots" in **_ink_ terminology**. The start of a knot is indicated in _**ink**_ using at least two equals signs the left hand side knot's name, and optionally on the right too (so for example `=== london ===`).

In the Pixi’VN library, a knot corresponds to a [label](/start/labels.md#label). The **_ink_ + Pixi’VN integration**, in addition to giving the possibility to run **_ink_ nodes**, also allows you to call knots (or labels) written in another [narrative language or Javascript/TypeScript](/start/narration.md).

To run a knot (or label) you can use the following methods:

## Use the `->` symbol

You can start a knot using the `->` symbol. Write the `->` symbol followed by the name of the knot, for example:

```ink
=== start ===
Start
-> after // [!code focus]

=== after ===
After
End
-> DONE
```

:::sandbox {template=ykykkg entry=/src/ink/start.ink}
:::This feature derives from **native _ink_** and is the only native method to start a knot. So, if you test your script using **Inky**, you will be able to use this feature.It corresponds to the [`jump` functionality](/start/labels.md#jump-to-a-label) in the Pixi’VN library.As said before you can use the `->` symbol to call a knot written in another narrative language or Javascript/TypeScript, but if you're using **Inky** to test your script, **Inky** will warn you that the knot does not exist (because **Inky** analyzes only the `.ink` file).It is for this very reason that the need for a new script arises which is ignored by **Inky** but is handled by Pixi’VN. This script is the `# jump`.## Use the `jump` scriptYou can start a knot using the `# jump`. Write `# jump` followed by the name of the knot, for example::::tabs
\== start.ink```ink
=== start ===
Start
# jump javascript_label_id // [!code focus]
Start End
-> DONE
```== javascriptLabel.ts```ts
import { narration, newLabel } from "@drincs/pixi-vn";

const javascriptLabel = newLabel("javascript_label_id", [
    () => {
        narration.dialogue = "After";
    },
    () => {
        narration.dialogue = "After End";
    },
]);
export default javascriptLabel;
```== App.tsx```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the label file at least once into your project. // [!code focus]
import "./labels/javascriptLabel"; // [!code focus]

export default function App() {
    return (
        <>
            <NarrationScreen />
            <TextInput />
            <NextButton />
            <BackButton />
        </>
    );
}
```:::

This feature derives from **native _ink_** and is the only native method to start a knot. So, if you test your script using **Inky**, you will be able to use this feature.

It corresponds to the [`jump` functionality](/start/labels.md#jump-to-a-label) in the Pixi’VN library.

As said before you can use the `->` symbol to call a knot written in another narrative language or Javascript/TypeScript, but if you're using **Inky** to test your script, **Inky** will warn you that the knot does not exist (because **Inky** analyzes only the `.ink` file).

It is for this very reason that the need for a new script arises which is ignored by **Inky** but is handled by Pixi’VN. This script is the `# jump`.

## Use the `jump` script

You can start a knot using the `# jump`. Write `# jump` followed by the name of the knot, for example:

:::tabs
\== start.ink

```ink
=== start ===
Start
# jump javascript_label_id // [!code focus]
Start End
-> DONE
```

\== javascriptLabel.ts

```ts
import { narration, newLabel } from "@drincs/pixi-vn";

const javascriptLabel = newLabel("javascript_label_id", [
    () => {
        narration.dialogue = "After";
    },
    () => {
        narration.dialogue = "After End";
    },
]);
export default javascriptLabel;
```

\== App.tsx

```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the label file at least once into your project. // [!code focus]
import "./labels/javascriptLabel"; // [!code focus]

export default function App() {
    return (
        <>
            <NarrationScreen />
            <TextInput />
            <NextButton />
            <BackButton />
        </>
    );
}
```

:::

:::sandbox {template=wxt2j9 entry=/src/ink/start.ink,/src/labels/javascriptLabel.ts,/src/app.ts}
:::This feature has been added by **_ink_ + Pixi’VN integration**.`# jump` is equivalent to the `->` symbol. The difference is that this script is ignored by **Inky**, so you can use it to call a knot written in another narrative language or Javascript/TypeScript without **Inky** warning you that the knot does not exist.## Use the `call` scriptThe **native _ink_ language** does not have a possibility to ["call" a knot](/start/labels.md#call-a-label) without close the current knot and open the new one. This is why the **_ink_ + Pixi’VN integration** introduces the `# call` script. This script is ignored by **Inky**.Write `# call` followed by the name of the knot, for example::::tabs
\== start.ink```ink
=== start ===
Start
# call javascript_label_id // [!code focus]
Start End
-> DONE
```== javascriptLabel.ts```ts
import { narration, newLabel } from "@drincs/pixi-vn";

const javascriptLabel = newLabel("javascript_label_id", [
    () => {
        narration.dialogue = "After";
    },
    () => {
        narration.dialogue = "After End";
    },
]);
export default javascriptLabel;
```== App.tsx```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the label file at least once into your project. // [!code focus]
import "./labels/javascriptLabel"; // [!code focus]

export default function App() {
    return (
        <>
            <NarrationScreen />
            <TextInput />
            <NextButton />
            <BackButton />
        </>
    );
}
```:::

This feature has been added by **_ink_ + Pixi’VN integration**.

`# jump` is equivalent to the `->` symbol. The difference is that this script is ignored by **Inky**, so you can use it to call a knot written in another narrative language or Javascript/TypeScript without **Inky** warning you that the knot does not exist.

## Use the `call` script

The **native _ink_ language** does not have a possibility to ["call" a knot](/start/labels.md#call-a-label) without close the current knot and open the new one. This is why the **_ink_ + Pixi’VN integration** introduces the `# call` script. This script is ignored by **Inky**.

Write `# call` followed by the name of the knot, for example:

:::tabs
\== start.ink

```ink
=== start ===
Start
# call javascript_label_id // [!code focus]
Start End
-> DONE
```

\== javascriptLabel.ts

```ts
import { narration, newLabel } from "@drincs/pixi-vn";

const javascriptLabel = newLabel("javascript_label_id", [
    () => {
        narration.dialogue = "After";
    },
    () => {
        narration.dialogue = "After End";
    },
]);
export default javascriptLabel;
```

\== App.tsx

```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the label file at least once into your project. // [!code focus]
import "./labels/javascriptLabel"; // [!code focus]

export default function App() {
    return (
        <>
            <NarrationScreen />
            <TextInput />
            <NextButton />
            <BackButton />
        </>
    );
}
```

:::

::: sandbox {template=cdln8v entry=/src/ink/start.ink,/src/labels/javascriptLabel.ts,/src/app.ts}
:::
