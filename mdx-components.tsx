import { Image } from "@/components/mdx/img";
import { Mermaid } from "@/components/mdx/mermaid";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import * as icons from "lucide-react";
import type { MDXComponents } from "mdx/types";
import DynamicLink from "./components/dynamiclink";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...(icons as unknown as MDXComponents),
        ...defaultMdxComponents,
        ...TabsComponents,
        img: Image,
        Sandbox: ({
            entry,
            template,
            previewHeight = 400,
        }: {
            entry: string;
            template: string;
            previewHeight?: number;
        }) => {
            return (
                <iframe
                    src={`https://codesandbox.io/embed/${template}?${entry}fontsize=12&hidenavigation=1&theme=dark&view=preview&hidedevtools=1`}
                    style={{
                        width: "100%",
                        height: `${previewHeight}px`,
                        border: 0,
                        borderRadius: "4px",
                        overflow: "hidden",
                    }}
                    title='drincs/pixi-vn'
                    allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
                    sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
                />
            );
        },
        Mermaid,
        Comments: () => null,
        DynamicLink,
        ...components,
    };
}
