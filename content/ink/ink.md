# ![icon](/ink.svg){style="width:40px;height:40px;margin-right:10px;float:left"} *ink* Language Integration

Pixi’VN gives you the ability to write your own narrative using ***ink***, a scripting language for writing interactive narrative.

The ***ink* + Pixi’VN integration**, exploits the [inkjs](https://github.com/inkle/inkjs) and [PixiVNJson](/other-topics/pixi-vn-json.md) libraries, to parse ***ink* code** and generate a Json that can be interpreted by Pixi’VN. So Javascript/Typescript and ***ink*** share the same storage and canvas, and it is also possible to launch ***ink*** labels (or knots) from Javascript/Typescript and vice versa. This allows you to use the best of both languages. You can use ***ink*** to write the narration, while using Javascript/Typescript to create minigames or complex animations.

**What is *ink*?**

***ink*** is a scripting language for writing interactive narrative. It is used in games like 80 Days, Heaven's Vault, and Sorcery! to create branching stories. This language is very simple to learn.

You can learn more about *ink* on the [*ink* website](https://www.inklestudios.com/ink/).

```ink [ink/start.ink]
=== start ===
We arrived into London at 9.45pm exactly.

* "There is not a moment to lose!"[] I declared.
 -> hurry_outside

* "Monsieur, let us savour this moment!"[] I declared.
 My master clouted me firmly around the head and dragged me out of the door.
 -> dragged_outside

* [We hurried home] -> hurry_outside

=== hurry_outside ===
We hurried home to Savile Row -> as_fast_as_we_could

=== dragged_outside ===
He insisted that we hurried home to Savile Row
-> as_fast_as_we_could

=== as_fast_as_we_could ===
<> as fast as we could.
-> start
```

<sandbox
  template="v4rkdl"
  entry="/src/ink/start.ink"
/>

## Why use *ink* integration?

Write a narrative in **Javascript/Typescript** slows you down a lot, because you have to write a lot of code, and is also not suitable for novice developers. So ***ink*** is a good alternative to write the narrative, because it is very simple to learn and write.

The novice developers can use a [*ink* template](/start/getting-started.md#project-initialization) to start developing just with ***ink***, and then gradually learn Javascript/Typescript to create more complex features.

## Start using *ink* in Pixi’VN

If you have not created a project yet then it is recommended to use a [Pixi’VN + *ink* template](/start/getting-started.md#project-initialization) to start developing with ***ink***.

Otherwise to add ***ink*** to your Pixi’VN project you need to install the `@drincs/pixi-vn-ink` package.

::: code-group

```sh [npm]
npm install @drincs/pixi-vn-ink
```

```sh [yarn]
yarn add @drincs/pixi-vn-ink
```

```sh [pnpm]
pnpm add @drincs/pixi-vn-ink
```

```sh [bun]
bun add @drincs/pixi-vn-ink
```

```sh [deno]
deno install npm:@drincs/pixi-vn-ink
```

:::

After installing the package you need to use the `importInkText()` function to import the ***ink* script** into your project.

```typescript [main.ts]
import { importInkText } from '@drincs/pixi-vn-ink'

const inkText = `
=== start ===
Hello
-> END
`

importInkText([inkText, ...])
```

Now you can run the ***ink* knot** (or label) with [Pixi’VN functions](/start/labels.md#run-a-label).

```typescript [main.ts]
import { narration } from '@drincs/pixi-vn'

narration.callLabel(`start`, {})
```

### Import text contained in .ink files

For this guide we will use the [Vite](https://vitejs.dev/) project, but you can use the same logic in other projects.

To import text contained in `.ink` files you need create the file `ink.d.ts` to declare the module `*.ink`.

After that you need to add the `.ink` extension to the `assetsInclude` option in the `vite.config.ts` file.

After that you can import the *ink* file and add `?raw` at the end of the import to get the text content.

::: code-group

```typescript [main.ts]
import { importInkText } from '@drincs/pixi-vn-ink'
import startLabel from './ink/start.ink?raw'

importInkText([startLabel, ...])
```

```typescript [vite.config.ts]
export default defineConfig({
  // ...
  assetsInclude: ['**/*.ink'],
})
```

```typescript [ink.d.ts]
declare module '*.ink' {
    const value: string
    export default value
}
```

:::

## *ink* features in development

The following features are in development and will be added in the future:

( Add a like or comment to the issue to show your interest )

* [Functions and Game Queries](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#9-game-queries-and-functions) (issue [#11](https://github.com/DRincs-Productions/pixi-vn-ink/issues/11)):
  * [User-created functions](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#5-functions) (issue [#32](https://github.com/DRincs-Productions/pixi-vn-ink/issues/32))
  * `CHOICE_COUNT()`
  * `TURNS()`
  * `TURNS_SINCE()`
  * `SEED_RANDOM()`
* [`LIST`](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#1-basic-lists) (issue [#15](https://github.com/DRincs-Productions/pixi-vn-ink/issues/15))
* [`Tunnels`](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#1-tunnels) (issue [#38](https://github.com/DRincs-Productions/pixi-vn-ink/issues/38))
* [`Threads`](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#2-threads) (issue [#39](https://github.com/DRincs-Productions/pixi-vn-ink/issues/39))

## *ink* syntax that will be ignored by Pixi’VN

The following syntax will be ignored by Pixi’VN. You can use them in your ***ink* script** ( For example if you want test your script with **Inky editor** ), but they will be ignored by Pixi’VN.

### INCLUDE

`INCLUDE` is used by ***ink*** to import other ***ink* files**.

In Pixi’VN you can use the `importInkText()` function to import the ***ink* files**. So if you use `INCLUDE` it will not be handled, so it does not import the files.

### Narration outside the knots

The narration outside the knots (or labels) will be ignored, except for variables. So for example:

```ink [ink]
VAR my_var = false // ✅ This will be handled (because it is a variable)
Hello // ❌ This will be ignored [!code warning]
-> start // ❌ This will be ignored [!code warning]
=== start === // ✅ This will be handled
My name is John // ✅ This will be handled
-> DONE // ✅ This will be handled
```

## Differences between native *ink* and Pixi’VN *ink*

* in this case:

    ```ink [ink]
    { shuffle:
      -  2 of Diamonds.
        'You lose this time!' crowed the croupier.
    }
    ```

    **In native *ink***, you will see 2 different dialogues, the first one will be `2 of Diamonds.` and the second one will be `'You lose this time!' crowed the croupier.`.

    **In Pixi’VN *ink***, you will not see 2 different dialogues, but the following dialogue: `2 of Diamonds.\n\n'You lose this time!' crowed the croupier.`. In [Markdown](/ink/ink-markup.md#markdown-on-ink) it will be displayed as:

    ```txt
    2 of Diamonds.
    'You lose this time!' crowed the croupier.
    ```

* if a `weave` (In following example `shove`) is attached to a one time choice, and it is opened with `-> shove` it will not invalidate the one time choice. To invalidate it you will have to select the choice as usual.

    Here is an example:

    ```ink [ink]
    -> start
    === start ===
    * [1] -> shove
    * (shove) [2] 2
    * {shove} [3] -> END
    -  -> start
    -> DONE
    ```

    In case you take choice 1, the second time it will be opened `start`:
  * if you use **native *ink***, you will only be able to choose choice `3`. The choice `2` is hidden because being "one time" **native *ink*** will know that you have already made this decision with `-> shove`.
  * if you use **Pixi’VN *ink***, you will be able to choose choice `2` or `3`. The choice `2` is not hidden because **Pixi’VN *ink*** doesn't know that `shove` is paired with a choice.

  To get the same logic as `start` both in **native *ink*** and **Pixi’VN *ink*** you will have to write the following code:

  ```ink [ink]
  -> start
  === start ===
  * [1] -> shove
  * (shove) {!shove} [2] 2
  * {shove} [3] -> END
  -  -> start
  -> DONE
  ```

## Using Pixi’VN Features from *ink*

* [Use the characters in *ink*](/ink/ink-character.md)
* [*ink* knot (or label)](/ink/ink-label.md)
* [*ink* variables](/ink/ink-variables.md)
* [Markup language in *ink* (to add text style)](/ink/ink-markup.md)
* [Use input prompt in *ink*](/ink/ink-input.md)
* [Use canvas in *ink*](/ink/ink-canvas.md)
* [Using sounds and music in *ink*](/ink/ink-sound.md)
* [Using pause in *ink*](/ink/ink-pause.md)
* [How translate *ink* text](/ink/ink-translate.md)
* [Replace portions of text in *ink*](/ink/ink-replacement.md)
* [Custom Hashtag Script](/ink/ink-hashtag.md)
