import dark from "@shikijs/themes/github-dark";
import light from "@shikijs/themes/github-light";
import { highlight } from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";

export interface CodeBlockProps {
    code: string;
    lang: string;
}

export async function CodeBlockPre({ code, lang }: CodeBlockProps) {
    return await highlight(code, {
        lang,
        themes: {
            light: light,
            dark: dark,
        },
        theme: dark,
        components: {
            pre: Base.Pre,
        },
    });
}
