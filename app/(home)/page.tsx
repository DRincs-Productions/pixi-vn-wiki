import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import Home from "./home";

export async function generateStaticParams() {
    return source.generateParams();
}

export default function Page() {
    return <Home />;
}

export async function generateMetadata() {
    return createMetadata();
}
