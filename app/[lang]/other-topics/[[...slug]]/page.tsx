import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;

    return <MDXPage slug={slug} lang={lang} folther='other-topics' />;
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    const page = source.getPage(slug, lang);
    if (!page) notFound();

    return createMetadata({
        title: `Pixi'VN - ${page.data.title}`,
        description: page.data.description,
    });
}
