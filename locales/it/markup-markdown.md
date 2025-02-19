# Markdown

**Markdown** is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber created Markdown in 2004, in collaboration with Aaron Swartz, as a markup language that is intended to be easy to read in its source code form. Markdown is widely used for blogging and instant messaging, and also used elsewhere in online forums, collaborative software, documentation pages, and readme files.

Pixi’VN is not tied to any Markup, and gives the developer the ability to choose the Markup he prefers. However, it is recommended to use Markdown.

To use it you will need to use a library that converts Markdown to HTML, such as [react-markdown](https://www.npmjs.com/package/react-markdown).

```tsx
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

::: sandbox {template=4h8wst entry=/src/components/MarkdownComponent.tsx}
:::
