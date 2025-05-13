# Markup language in *ink*

The ***ink* + Pixi’VN integration** provides some additional features to facilitate the use of components that introduce a [Markup](/start/markup-markdown.md) in the text.

## New Lines

To create a new line, you can use the escape character `\\n`.

```ink
=== start ===
Hello, this is a test. \\n\\n<>
This is a new line.
```

<sandbox
  template="tqr6v5"
  entry="/src/ink/start.ink,/src/components/MarkdownComponent.tsx"
/>

## Markdown syntax in *ink*

On Pixi’VN it is recommended to use Markdown to add style to your text. If you have [implemented Markdown in your project](/start/markup-markdown.md) then you will be able to use Markdown syntax to style your text in ***ink***.

To do this you need to keep in mind that many symbols of Markdown syntax are also used by ***ink* syntax**, such as: `#`, `*`, `/`, `~`, `-`, `|` etc. To avoid conflicts you can use the escape character `\` before the Markdown symbol.

Here's an example:

<sandbox
  template="nprnlk"
  entry="/src/ink/start.ink,/src/components/MarkdownComponent.tsx"
/>

:::tabs
== On ink

```ink
\# Markdown Test \\n<>
Hello, this is a test of the markdown parser. Pixi’VN does not manage markdown, but you can implement a markdown parser to display text with markdown syntax. \\n<>
For example in React, you can use the library [react-markdown](https:\/\/www.npmjs.com/package/react-markdown). \\n<>
\#\# Colored Text \\n<>
<span style="color:blue">some *blue* text</span>. \\n<>
<span style="color:red">some *red* text</span>. \\n<>
<span style="color:green">some *green* text</span>. \\n<>
\#\# Bold Text \\n<>
\**This is bold text.** \\n<>
\#\# Italic Text \\n<>
\*This is italic text.* \\n<>
\#\# Delete Text \\n<>
\~~This is deleted text.~~ \\n<>
\#\# Link Test \\n<>
[Link to Google](https:\/\/www.google.com) \\n<>
\#\# H2 Test \\n<>
\#\#\# H3 Test \\n<>
\#\#\#\# H4 Test \\n<>
\#\# Code Test \\n<>
\`Hello World\` \\n<>
\`\`\`js \\n<>
console.log("Hello World") \\n<>
\`\`\` \\n<>
\#\# List Test \\n<>
\- Item 1 \\n<>
\* Item 2 \\n<>
\- [x] Item 3 \\n<>
\#\# Table Test \\n<>
\| Header 1 \| Header 2 \| \\n<>
\| -------- \| -------- \| \\n<>
\| Cell 1   \| Cell 2   \| \\n<>
\#\# Separator Test \\n<>
\*\*\* \\n<>
Footer
```

== On Markdown

```markdown
# Markdown Test

Hello, this is a test of the markdown parser. Pixi’VN does not manage markdown, but you can implement a markdown parser to display text with markdown syntax.

For example in React, you can use the library [react-markdown](https://www.npmjs.com/package/react-markdown).

## Colored Text

<span style="color:blue">some *blue* text</span>.

<span style="color:red">some *red* text</span>.

<span style="color:green">some *green* text</span>.

## Bold Text

**This is bold text.**

## Italic Text

*This is italic text.*

## Delete Text

~~This is deleted text.~~

## Link Test

[Link to Google](https://www.google.com)

## H2 Test

### H3 Test

#### H4 Test
 
## Code Test

\`Hello World\`

\`\`\`js
console.log("Hello World")
\`\`\`

## List Test

- Item 1
* Item 2
- [x] Item 3

## Table Test

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

## Separator Test

***
Footer
```

:::
