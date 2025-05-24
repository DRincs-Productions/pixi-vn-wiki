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
            light: "github-light",
            dark: "github-dark",
        },
        components: {
            pre: Base.Pre,
        },
    });
}
