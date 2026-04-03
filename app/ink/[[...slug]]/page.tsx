import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { inkSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <MDXPage slug={slug} folther='ink' />;
}

export async function generateStaticParams() {
    return inkSource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;

    return createMetadata({}, { slug: params.slug ? ["ink", ...params.slug] : undefined });
}
