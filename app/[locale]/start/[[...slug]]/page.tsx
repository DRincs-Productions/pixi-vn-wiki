import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
    const { slug, locale } = await params;

    return <MDXPage locale={locale} slug={slug} folther='start' />;
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
    const { slug, locale } = await params;
    const page = source.getPage(slug, locale);
    if (!page) notFound();

    return createMetadata({
        title: `Pixi'VN - ${page.data.title}`,
        description: page.data.description,
    });
}
