import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { faqSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; slug?: string[] }>;
}) {
    const { slug, lang } = await params;
    setRequestLocale(lang);

    return <MDXPage slug={slug} lang={lang} folther="faq" />;
}

export async function generateStaticParams() {
    // English is served at the root of the site (see `app/<section>`), not under `/en`
    return faqSource.generateParams().filter((params) => params.lang !== "en");
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug?: string[] }>;
}) {
    const { slug, lang } = await params;

    return createMetadata({ section: "faq", slug, lang });
}
