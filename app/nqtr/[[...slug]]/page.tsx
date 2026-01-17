import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { nqtrSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
    const page = nqtrSource.getPage(params.slug);
    if (!page) notFound();

    return createMetadata(
        {
            title: `Pixi'VN - ${page.data.title}`,
            description: page.data.description,
        },
        { slug: params.slug ? params.slug.join("/") : "" },
    );
}
