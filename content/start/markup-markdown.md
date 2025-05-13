# ![icon](/markdown.svg){style="width:40px;height:25px;margin-right:10px;float:left;background-color:white;border-radius:10px"} Markdown

**Markdown** is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber created Markdown in 2004, in collaboration with Aaron Swartz, as a markup language that is intended to be easy to read in its source code form. Markdown is widely used for blogging and instant messaging, and also used elsewhere in online forums, collaborative software, documentation pages, and readme files.

Pixi’VN is not tied to any Markup, and gives the developer the ability to choose the Markup he prefers. However, it is recommended to use Markdown.

Here are some examples of implementations of Markdown in the JavaScript ecosystem:

::: code-group

```tsx [React]
// I use the react-markdown library to convert the Markdown to HTML
// read more about it here: https://www.npmjs.com/package/react-markdown
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function MarkdownComponent({ text }: {
    text: string;
}) {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        >
            {text}
        </Markdown>
    )
};

```

```vue [Vue]
<!-- I use the vue-markdown-render library to convert the Markdown to HTML -->
<!-- read more about it here: https://www.npmjs.com/package/vue-markdown-render -->
<template>
  <div>
    <vue-markdown :source="src" />
  </div>
</template>

<script lang="ts">
import VueMarkdown from 'vue-markdown-render'

export default defineComponent({
  name: 'MyComponent',
  components: {
    VueMarkdown
  },
  setup(props, ctx) {
    const src = ref('# header')

    return {
      src
    }
  }
})
</script>
```

```svelte [Svelte]
<!-- I use the svelte-markdown library to convert the Markdown to HTML -->
<!-- read more about it here: https://www.npmjs.com/package/svelte-markdown -->
<script>
  import SvelteMarkdown from 'svelte-markdown'
  const source = `
  # This is a header

This is a paragraph.

* This is a list
* With two items
  1. And a sublist
  2. That is ordered
    * With another
    * Sublist inside

| And this is | A table |
|-------------|---------|
| With two    | columns |`
</script>

<SvelteMarkdown {source} />
```

```tsx [Angular]
// I use the ngx-markdown library to convert the Markdown to HTML
// read more about it here: https://www.npmjs.com/package/ngx-markdown
import { Component, Input } from "@angular/core";
import { MarkdownModule } from "ngx-markdown";

@Component({
  selector: "app-markdown",
  template: `
    <markdown [data]="text"></markdown>
  `,
})
export class MarkdownComponent {
  @Input() text: string;
}
```

:::

<sandbox
  template="4h8wst"
  entry="/src/components/MarkdownComponent.tsx"
  previewHeight=300
/>

## React Markdown Typewriter

[React Markdown Typewriter](https://www.npmjs.com/package/react-markdown-typewriter) is a library that combines Markdown and Typewriter. This library was created by me for my need to add a Typewriter effect to the Markdown component in my React templates.

If you are using react I recommend you to use it:

```tsx [React]
import { MarkdownTypewriter } from "react-markdown-typewriter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function MarkdownComponent({ text }: {
    text: string;
}) {
    return (
        <MarkdownTypewriter
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        >
            {text}
        </MarkdownTypewriter>
    )
};

```

<sandbox
  template="rgjf6t"
  entry="/src/components/MarkdownComponent.tsx"
  previewHeight=320
/>
