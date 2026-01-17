import Home from "@/app/(home)/home";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
    return source.generateParams();
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    setRequestLocale(lang);
    return <Home />;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
    const { slug, lang } = await params;

    return createMetadata({}, { slug: slug ? slug.join("/") : "", lang });
}
