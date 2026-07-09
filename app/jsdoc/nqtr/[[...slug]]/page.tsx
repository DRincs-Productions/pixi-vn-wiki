import JsdocPage from "@/components/jsdoc-page";
import { jsdocNqtrSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <JsdocPage slug={slug} lib="nqtr" />;
}

export async function generateStaticParams() {
    return jsdocNqtrSource.generateParams();
}
