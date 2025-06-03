import MDXPage from "@/components/page";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;

    return <MDXPage slug={slug} folther='renpy' />;
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    return createMetadata({
        title: `Pixi'VN - ${page.data.title}`,
        description: page.data.description,
    });
}
