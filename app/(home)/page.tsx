import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { setRequestLocale } from "next-intl/server";
import Home from "./home";

export async function generateStaticParams() {
    return source.generateParams();
}

export default function Page() {
    setRequestLocale("en");
    return <Home />;
}

export async function generateMetadata() {
    return createMetadata({}, {});
}
