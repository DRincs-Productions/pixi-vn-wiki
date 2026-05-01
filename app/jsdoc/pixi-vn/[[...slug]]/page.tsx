import JsdocPage from "@/components/jsdoc-page";
import { jsdocPixiVnSource } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    setRequestLocale("en");

    return <JsdocPage slug={slug} lib='pixi-vn' />;
}

export async function generateStaticParams() {
    return jsdocPixiVnSource.generateParams();
}
