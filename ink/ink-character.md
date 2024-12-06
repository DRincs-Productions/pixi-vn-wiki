# Use the characters in *ink*

You can associate a [Pixi’VN character](/start/character.md) with a dialogue in ***ink***. To do this, you need to create a or more characters in **Typescript** and, after that, in the ***ink* script**, you can use following syntax:

`[character_id]` + `:` + `SPACE` + `[text]`

:::tabs
== start.ink

```ink
=== start ===
egg-head: Hello, I'm Egg.
-> DONE
```

== characters.ts

```ts
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const eggHead = new CharacterBaseModel("egg-head", {
  name: "Egg",
  surname: "Head",
  age: 25,
  icon: "https://pixijs.com/assets/eggHead.png",
  color: "#9e2e12",
});

saveCharacter(eggHead);
```

== App.tsx

```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the character file at least once into your project. // [!code focus]
import "./values/characters"; // [!code focus]

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

::: sandbox {template=gxxp47 entry=/src/ink/start.ink,/src/values/characters.ts}
:::

## Use Character Emotions in *ink*

You can use the [Pixi’VN Character Emotions](/start/character.md#character-emotions) in ***ink***. To use the character emotions in ***ink***, you need to create a or more characters with an emotion in **Typescript** and, after that, in the ***ink* script**, you can use following syntax:

`character_id` + `@` + `emotion`

For example, you can associate this character with a dialogue using the following syntax:

`character_id` + `@` + `emotion` + `:` + `SPACE` + `text`

:::tabs
== start.ink

```ink
=== start ===
liam@happy: Hi, I'm Liam. I'm very happy today.
-> DONE
```

== characters.ts

```ts
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const liam = new CharacterBaseModel("liam", {
  name: "Liam",
});

export const liamHappy = new CharacterBaseModel(
  { id: "liam", emotion: "happy" },
  {
    name: "Liam Happy",
  }
);

saveCharacter([liam, liamHappy]);
```

== App.tsx

```ts
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

// Remember to import the character file at least once into your project. // [!code focus]
import "./values/characters"; // [!code focus]

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

::: sandbox {template=fdj2lt entry=/src/ink/start.ink,/src/values/characters.ts}
:::

## Use Character how variable in *ink*

Having the ability to rename a character and use their name in dialogues greatly simplifies the development of a Visual Novel. Since the [character](/start/character.md) is an object based on a [customizable model](/start/character.md#custom-character), it is not possible to use the character as a [variable](/ink/ink-variables.md) simply with the `{}` syntax.

But you can take advantage of the [possibility of replacing portions of text](/ink/ink-replacement.md) and [customizing hashtag scripts](/ink/ink-hashtag.md) to implement this feature.

::: sandbox {template=mhs2pd entry=/src/ink/start.ink,/src/values/characters.ts}
:::

### Use character name in dialogues

To use the character name in dialogues, you can take advantage of the [possibility of replacing portions of text](/ink/ink-replacement.md). For example, you can use the following method:

:::tabs
== main.ts

```ts
import { onReplaceTextAfterTranslation } from '@drincs/pixi-vn-ink'
import { getCharacterById } from "@drincs/pixi-vn";

onReplaceTextAfterTranslation((key) => {
    let character = getCharacterById(key)
    if (character) {
        return character.name
    }

    // if return undefined, the system will not replace the character id
    return undefined
})
```

== start.ink

```ink
=== start ===
Hello, [liam_id].
-> DONE
```

== characters.ts

```ts
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

saveCharacter([liam]);
```

:::

### Edit character name in dialogues

To edit the character name in dialogues, you can take advantage of the possibility of [customizing hashtag scripts](/ink/ink-hashtag.md). For example, you can use the following method:

:::tabs
== main.ts

```ts
import { onInkHashtagScript } from '@drincs/pixi-vn-ink'

onInkHashtagScript((script, convertListStringToObj) => {
    if (script[0] === "rename" && script.length === 3) {
        let character = getCharacterById(script[1])
        if (character) {
            character.name = script[2]
        }
        return true
    }
    return false
})
```

== start.ink

```ink
=== start ===
# rename liam_id Liam
-> DONE
```

== characters.ts

```ts
import { CharacterBaseModel, saveCharacter } from "@drincs/pixi-vn";

export const liam = new CharacterBaseModel('liam_id', {
    name: 'Liam',
    surname: 'Smith',
    age: 25,
    icon: "https://example.com/liam.png",
    color: "#9e2e12"
});

saveCharacter([liam]);
```

:::
