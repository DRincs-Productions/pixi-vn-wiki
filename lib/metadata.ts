import type { Metadata } from "next/types";

export function createMetadata(props: Metadata = {}): Metadata {
    const {
        title = "Pixi'VN - Visual Novel/2D game engine",
        description = "Create your own visual novel/2D game with Pixi'VN. It is a very versatile and powerful visual novel/2D game engine. It is based on JavaScript/TypeScript and uses the PixiJS library for rendering.",

        ...override
    } = props;
    const images = "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fog_image.png?alt=media";
    return {
        ...override,
        openGraph: {
            title: title ?? undefined,
            description: description ?? undefined,
            url: baseUrl,
            images: images,
            siteName: "Pixi'VN Wiki",
            type: "website",
            ...override.openGraph,
        },
        twitter: {
            card: "summary_large_image",
            creator: "@money_is_shark",
            title: title ?? undefined,
            description: description ?? undefined,
            images: images,
            ...override.twitter,
        },
    };
}

export const baseUrl = "https://pixi-vn.web.app";
