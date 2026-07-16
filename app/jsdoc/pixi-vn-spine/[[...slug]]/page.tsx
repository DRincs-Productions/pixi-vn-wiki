import JsdocPage from "@/components/jsdoc-page";
import { jsdocPixiVnSpineSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <JsdocPage slug={slug} lib="pixi-vn-spine" />;
}

export async function generateStaticParams() {
    return jsdocPixiVnSpineSource.generateParams();
}
