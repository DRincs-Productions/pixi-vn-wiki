import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { faqSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;
    setRequestLocale(lang);

    return <MDXPage slug={slug} lang={lang} folther='faq' />;
}

export async function generateStaticParams() {
    return faqSource.generateParams();
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;

    return createMetadata({}, { slug: slug ? ["faq", ...slug] : undefined, lang });
}
