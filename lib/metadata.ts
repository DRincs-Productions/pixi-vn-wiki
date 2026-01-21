import type { Metadata } from "next/types";

export function createMetadata(props: Metadata, params: { lang?: string; slug?: string }): Metadata {
    const {
        title = "Pixi'VN - Visual Novel/2D game engine",
        description = "Create your own visual novel/2D game with Pixi'VN. It is a very versatile and powerful visual novel/2D game engine. It is based on JavaScript/TypeScript and uses the PixiJS library for rendering.",

        ...override
    } = props;
    const images = "/og_image.png";
    const slug = params.slug ? "/" + params.slug : "";
    const lang = params.lang ? "/" + params.lang : "";
    return {
        title: title,
        description: description,
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
        alternates: {
            canonical: `${baseUrl}${lang}${slug}`,
            languages: {
                en: `${baseUrl}${slug}`,
                it: `${baseUrl}/it${slug}`,
                ru: `${baseUrl}/ru${slug}`,
                zh: `${baseUrl}/zh${slug}`,
                ja: `${baseUrl}/ja${slug}`,
                es: `${baseUrl}/es${slug}`,
                fr: `${baseUrl}/fr${slug}`,
                ko: `${baseUrl}/ko${slug}`,
            },
        },
    };
}

export const baseUrl = "https://pixi-vn.web.app";
