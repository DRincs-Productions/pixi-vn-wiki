import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { nqtrSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    setRequestLocale(lang);

    return <MDXPage slug={slug} lang={lang} folther='nqtr' />;
}

export async function generateStaticParams() {
    return nqtrSource.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    const page = nqtrSource.getPage(slug, lang);
    if (!page) notFound();

    return createMetadata(
        {
            title: `Pixi'VN - ${page.data.title}`,
            description: page.data.description,
        },
        { slug: slug ? slug.join("/") : "", lang },
    );
}
