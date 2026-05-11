import JsdocPage from "@/components/jsdoc-page";
import { jsdocPixiVnInkSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <JsdocPage slug={slug} lib="pixi-vn-ink" />;
}

export async function generateStaticParams() {
    return jsdocPixiVnInkSource.generateParams();
}
