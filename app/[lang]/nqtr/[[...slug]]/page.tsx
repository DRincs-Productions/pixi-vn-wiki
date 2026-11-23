import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { nqtrSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; slug?: string[] }>;
}) {
    const { slug, lang } = await params;
    setRequestLocale(lang);

    return <MDXPage slug={slug} lang={lang} folther="nqtr" />;
}

export async function generateStaticParams() {
    // English is served at the root of the site (see `app/<section>`), not under `/en`
    return nqtrSource.generateParams().filter((params) => params.lang !== "en");
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug?: string[] }>;
}) {
    const { slug, lang } = await params;

    return createMetadata({}, { slug: slug ? ["nqtr", ...slug] : undefined, lang });
}
