import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { nqtrSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <MDXPage slug={slug} folther='nqtr' />;
}

export async function generateStaticParams() {
    return nqtrSource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;

    return createMetadata({}, { slug: params.slug ? ["nqtr", ...params.slug] : undefined });
}
