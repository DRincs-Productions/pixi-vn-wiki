import { getPageImage, source } from "@/lib/source";
import type { Metadata } from "next/types";

export function createMetadata(props: Metadata, params: { lang?: string; slug?: string[] }): Metadata {
    const slug = params.slug;
    const slugString = slug ? "/" + slug.join("/") : "";
    const lang = params.lang ? "/" + params.lang : "";
    const page = source.getPage(slug);
    const images = page ? getPageImage(page).url : "/og_image.png";
    const title = page ? `Pixi'VN - ${page.data.title}` : "Pixi'VN - Visual Novel/2D game engine";
    const description = page
        ? page.data.description
        : "Create your own visual novel/2D game with Pixi'VN. It is a very versatile and powerful visual novel/2D game engine. It is based on JavaScript/TypeScript and uses the PixiJS library for rendering.";
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description ?? undefined,
            url: baseUrl,
            images,
            siteName: "Pixi'VN Wiki",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            creator: "@money_is_shark",
            title: title ?? undefined,
            description: description ?? undefined,
            images: images,
        },
        alternates: {
            canonical: `${baseUrl}${lang}${slugString}`,
            languages: {
                en: `${baseUrl}${slugString}`,
                it: `${baseUrl}/it${slugString}`,
                ru: `${baseUrl}/ru${slugString}`,
                zh: `${baseUrl}/zh${slugString}`,
                ja: `${baseUrl}/ja${slugString}`,
                es: `${baseUrl}/es${slugString}`,
                fr: `${baseUrl}/fr${slugString}`,
                ko: `${baseUrl}/ko${slugString}`,
            },
        },
    };
}

export const baseUrl = "https://pixi-vn.web.app";
