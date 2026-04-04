"use client";

import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

export default function ServerImage(
    props: {
        alt: string;
        src: string;
        title?: string;
        style?: React.CSSProperties;
    } & ImgHTMLAttributes<HTMLImageElement>,
) {
    const { alt, src, title, style, ...rest } = props;

    if (alt?.endsWith("-h3")) {
        return (
            <Image
                {...{ src, alt, title }}
                style={{
                    width: "26px",
                    height: "26px",
                    marginRight: "5px",
                    float: "left",
                    borderRadius: "5px",
                    marginBottom: "0px",
                    marginTop: "15px",
                    ...(style || {}),
                }}
                {...(rest as any)}
            />
        );
    }
    if (alt?.endsWith("-h3-bgwt")) {
        return (
            <Image
                {...{ src, alt, title }}
                style={{
                    width: "26px",
                    height: "26px",
                    marginRight: "5px",
                    float: "left",
                    borderRadius: "5px",
                    marginBottom: "0px",
                    marginTop: "15px",
                    backgroundColor: "white",
                    ...(style || {}),
                }}
                {...(rest as any)}
            />
        );
    }
    if (alt?.endsWith("-h2")) {
        return (
            <Image
                {...{ src, alt, title }}
                style={{
                    width: "28px",
                    height: "28px",
                    marginRight: "5px",
                    float: "left",
                    borderRadius: "5px",
                    marginBottom: "0px",
                    marginTop: "29px",
                    ...(style || {}),
                }}
                {...(rest as any)}
            />
        );
    }
    if (alt?.endsWith("-h2-bgwt")) {
        return (
            <Image
                {...{ src, alt, title }}
                style={{
                    width: "28px",
                    height: "28px",
                    marginRight: "5px",
                    float: "left",
                    borderRadius: "5px",
                    marginBottom: "0px",
                    marginTop: "29px",
                    backgroundColor: "white",
                    ...(style || {}),
                }}
                {...(rest as any)}
            />
        );
    }
    if (alt?.endsWith("-text")) {
        return (
            <Image
                {...{ src, alt, title }}
                style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "5px",
                    float: "left",
                    borderRadius: "5px",
                    marginBottom: "0px",
                    marginTop: "0px",
                    ...(style || {}),
                }}
                {...(rest as any)}
            />
        );
    }
    if (alt === "Architecture") {
        return (
            <Image
                {...{ src, alt, title }}
                className='mx-auto -my-16 w-full max-w-[400px] invert dark:invert-0 lg:mx-0'
                style={{
                    maxHeight: "300px",
                    width: "auto",
                    height: "auto",
                    ...(style || {}),
                }}
                {...(rest as any)}
            />
        );
    }

    return <Image {...{ src, alt, title }} style={style} {...(rest as any)} />;
}
