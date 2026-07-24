import JsdocPage from "@/components/jsdoc-page";
import { jsdocPixiVnLive2dSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <JsdocPage slug={slug} lib="pixi-vn-live2d" />;
}

export async function generateStaticParams() {
    return jsdocPixiVnLive2dSource.generateParams();
}
