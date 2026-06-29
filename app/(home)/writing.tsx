import { Writing } from "@/app/(home)/writing.client";
import { ServerCodeBlock } from "@/components/server-code-block";
import { inkLanguage } from "@/lib/syntaxes";

export function AnybodyCanWrite() {
    return (
        <Writing
            tabs={{
                writer: (
                    <ServerCodeBlock
                        code={`=== start ===
# show image bg bg01-hallway
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1 with movein direction right speed 300
james: You're my roommate's replacement, huh?
What is your name?
# input mc_name
* [Nice to meet you!]
    -> nice_meeting
* [I'd rather not say.]
    -> silent_response

=== nice_meeting ===
james: Nice to meet you, { mc_name }!
-> END

=== silent_response ===
james: ...Suit yourself.
-> END`}
                        lang="ink"
                        langs={[inkLanguage]}
                    />
                ),
                developer: (
                    <ServerCodeBlock
                        code={`---
title: Hello World
---

import { Playground } from "@/components/playground";

## Overview

<Playground title="Test" />

This codeblock shows TypeScript information!

\`\`\`ts twoslash
console.log("Hello World");

// give your code decorations [!code ++]
const name = "fumadocs";
\`\`\`

And re-use content:

<include>./another-page.mdx</include>`}
                        lang="ts"
                    />
                ),
                automation: (
                    <ServerCodeBlock
                        code={`---
title: Hello World
---

import { db } from "@/lib/db";

export async function DataView() {
  const products = await db.select().from("products");
  return products.map(product => <div key={product.id}>{product.name}</div>)
}

<DataView />

<auto-type-table path='./my-file.ts' name='CardProps' />`}
                        lang="json"
                    />
                ),
            }}
        />
    );
}
