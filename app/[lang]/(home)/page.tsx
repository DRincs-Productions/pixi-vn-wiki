import Home from "@/app/(home)/home";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
    // English is served at the root of the site (see `app/<section>`), not under `/en`
    return source.generateParams().filter((params) => params.lang !== "en");
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    setRequestLocale(lang);
    return <Home />;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    return createMetadata({}, { lang, isHome: true });
}
