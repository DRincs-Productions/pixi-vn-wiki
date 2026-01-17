import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { renpySource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <MDXPage slug={slug} folther='renpy' />;
}

export async function generateStaticParams() {
    return renpySource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = renpySource.getPage(params.slug);
    if (!page) notFound();

    return createMetadata(
        {
            title: `Pixi'VN - ${page.data.title}`,
            description: page.data.description,
        },
        { slug: params.slug ? params.slug.join("/") : "" },
    );
}
