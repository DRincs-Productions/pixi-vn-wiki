import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { jsonSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

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

    return createMetadata({}, { slug: slug ? ["json", ...slug] : undefined, lang });
}
