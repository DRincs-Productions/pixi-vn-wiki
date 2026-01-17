import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { jsonSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    setRequestLocale(lang);

    return <MDXPage slug={slug} lang={lang} folther='json' />;
}

export async function generateStaticParams() {
    return jsonSource.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    const page = jsonSource.getPage(slug, lang);
    if (!page) notFound();

    return createMetadata(
        {
            title: `Pixi'VN - ${page.data.title}`,
            description: page.data.description,
        },
        { slug: slug ? slug.join("/") : "", lang },
    );
}
