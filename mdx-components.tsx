import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        ...components,
        img: (props) => {
            console.log(props);
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
            return <ImageZoom {...props} />;
        },
    };
}
