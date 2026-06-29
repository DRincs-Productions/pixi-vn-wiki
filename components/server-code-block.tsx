import { cn } from "@/lib/cn";
import type { LanguageInput } from "@shikijs/types";
import { highlight, type HighlightOptions } from "fumadocs-core/highlight";
import { CodeBlock, type CodeBlockProps, Pre } from "fumadocs-ui/components/codeblock";

export type ServerCodeBlockProps = HighlightOptions & {
    code: string;
    langs?: LanguageInput[];
    codeblock?: CodeBlockProps;
};

export async function ServerCodeBlock({
    code,
    codeblock,
    langs,
    ...options
}: ServerCodeBlockProps) {
    return await highlight(code, {
        defaultColor: false,
        ...(langs && ({ langs } as object)),
        ...options,
        components: {
            pre: (props) => (
                <CodeBlock
                    {...props}
                    {...codeblock}
                    className={cn("my-0", props.className, codeblock?.className)}
                >
                    <Pre>{props.children}</Pre>
                </CodeBlock>
            ),
            ...options.components,
        },
    } as HighlightOptions);
}
