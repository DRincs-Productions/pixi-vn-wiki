import { Mermaid } from "@/components/mdx/mermaid";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
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
        img: (props) => {
            if (props.alt.endsWith("-h3")) {
                return (
                    <ImageZoom
                        {...props}
                        style={{
                            width: "26px",
                            height: "26px",
                            marginRight: "5px",
                            float: "left",
                            borderRadius: "5px",
                            marginBottom: "0px",
                            marginTop: "15px",
                            ...props.style,
                        }}
                    />
                );
            }
            if (props.alt.endsWith("-h3-bgwt")) {
                return (
                    <ImageZoom
                        {...props}
                        style={{
                            width: "26px",
                            height: "26px",
                            marginRight: "5px",
                            float: "left",
                            borderRadius: "5px",
                            marginBottom: "0px",
                            marginTop: "15px",
                            backgroundColor: "white",
                            ...props.style,
                        }}
                    />
                );
            }
            if (props.alt.endsWith("-h2")) {
                return (
                    <ImageZoom
                        {...props}
                        style={{
                            width: "28px",
                            height: "28px",
                            marginRight: "5px",
                            float: "left",
                            borderRadius: "5px",
                            marginBottom: "0px",
                            marginTop: "29px",
                            ...props.style,
                        }}
                    />
                );
            }
            if (props.alt.endsWith("-h2-bgwt")) {
                return (
                    <ImageZoom
                        {...props}
                        style={{
                            width: "28px",
                            height: "28px",
                            marginRight: "5px",
                            float: "left",
                            borderRadius: "5px",
                            marginBottom: "0px",
                            marginTop: "29px",
                            backgroundColor: "white",
                            ...props.style,
                        }}
                    />
                );
            }
            if (props.alt.endsWith("-text")) {
                return (
                    <ImageZoom
                        {...props}
                        style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "5px",
                            float: "left",
                            borderRadius: "5px",
                            marginBottom: "0px",
                            marginTop: "0px",
                            ...props.style,
                        }}
                    />
                );
            }
            if (props.alt === "Architecture") {
                return (
                    <ImageZoom
                        {...props}
                        className='mx-auto -my-16 w-full max-w-[400px] invert dark:invert-0 lg:mx-0'
                        style={{
                            maxHeight: "300px",
                            width: "auto",
                            height: "auto",
                            ...props.style,
                        }}
                    />
                );
            }
            return <ImageZoom {...props} />;
        },
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
