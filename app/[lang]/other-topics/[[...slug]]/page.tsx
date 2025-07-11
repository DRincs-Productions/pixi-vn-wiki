import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { otherTopicsSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    setRequestLocale(lang);

    return <MDXPage slug={slug} lang={lang} folther='other-topics' />;
}

export async function generateStaticParams() {
    return otherTopicsSource.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    const page = otherTopicsSource.getPage(slug, lang);
    if (!page) notFound();

    return createMetadata({
        title: `Pixi'VN - ${page.data.title}`,
        description: page.data.description,
    });
}
