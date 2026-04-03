import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    setRequestLocale(lang);

    return <MDXPage lang={lang} slug={slug} folther='start' />;
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;

    return createMetadata({}, { slug: slug, lang });
}
