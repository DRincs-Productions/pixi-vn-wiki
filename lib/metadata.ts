import { getPageImage, source } from "@/lib/source";
import type { Metadata } from "next/types";

export function createMetadata(
    props: Metadata,
    params: { lang?: string; slug?: string[]; isHome?: boolean },
): Metadata {
    const slug = params.slug;
    const slugString = slug ? `/${slug.join("/")}` : "";
    const lang = params.lang ? `/${params.lang}` : "";
    // The homepage route has no slug of its own, which collides with the
    // `/start` index page (also reached with an empty slug). Skip the page
    // lookup for the homepage so it always gets the SEO-focused fallback
    // below, instead of inheriting the "Quick start" page's metadata.
    const page = params.isHome ? undefined : source.getPage(slug);
    const images = page ? `${baseUrl}${getPageImage(page).url}` : `${baseUrl}/og_image.png`;
    const title = page
        ? `Pixi'VN - ${page.data.title}`
        : "Pixi'VN - Visual Novel Engine for React, JavaScript & TypeScript";
    const description = page
        ? page.data.description
        : "Create your own visual novel or 2D game with Pixi'VN, a React/JavaScript/TypeScript visual novel engine with ink (Inkle) support, built on the PixiJS rendering library.";
    return {
        title: title,
        description: description,
        keywords: [
            "pixi-vn",
            "pixivn",
            "Pixi'VN",
            "PixiVN",
            "pixi vn",
            "visual novel engine",
            "visual novel react",
            "react visual novel",
            "2D game engine",
            "PixiJS",
            "Point & Click Adventure",
            "React",
            "JavaScript",
            "Node.js",
            "ink",
            "inkle",
            "renpy alternatives",
            "ren'py alternatives",
        ],
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

export const baseUrl = "https://pixi-vn.com";
