"use client";

import { ImageZoom } from "fumadocs-ui/components/image-zoom";

export function Image(props: { alt: string; src: string; title?: string; style?: React.CSSProperties }) {
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
}
