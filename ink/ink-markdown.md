# Style Text on *ink* + Pixi’VN

To add style in **native *ink*** it must be done through `.css` files. **This method is not possible** to use in Pixi’VN.

For this reason ***ink* + Pixi’VN integration** provides the following possibilities that are not handled by **native *ink***.

## New Lines

To create a new line, you can use the escape character `\\n`.

```ink
Hello, this is a test. \\n<>
This is a new line.
```

## Style Text with Markdown on *ink*

On Pixi’VN it is recommended to use Markdown to add style to your text. If you have [implemented Markdown in your project](/start/markdown.md) then you will be able to write your dialogues using Markdown.

To do this you need to keep in mind that many symbols in Markdown syntax are also used by ***ink* syntax**, such as: `#`, `*`, `/`, `~`, `-`, `|` etc. To avoid conflicts you can use the escape character `\` before the symbol.

Here's an example:

On Markdown:

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

On *ink*:

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
Footer \\n<>
```
