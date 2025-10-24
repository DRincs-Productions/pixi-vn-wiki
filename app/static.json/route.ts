import { faqSource, inkSource, nqtrSource, renpySource, source } from "@/lib/source";
import { type OramaDocument } from "fumadocs-core/search/orama-cloud";
import { NextResponse } from "next/server";

export const revalidate = false;

export function GET() {
    const results: OramaDocument[] = [];

    for (const page of source.getPages()) {
        results.push({
            id: page.url,
            structured: page.data.structuredData,
            url: page.url,
            title: page.data.title,
            description: page.data.description,
        });
    }
    for (const page of inkSource.getPages()) {
        results.push({
            id: page.url,
            structured: page.data.structuredData,
            url: page.url,
            title: page.data.title,
            description: page.data.description,
        });
    }
    for (const page of faqSource.getPages()) {
        results.push({
            id: page.url,
            structured: page.data.structuredData,
            url: page.url,
            title: page.data.title,
            description: page.data.description,
        });
    }
    for (const page of renpySource.getPages()) {
        results.push({
            id: page.url,
            structured: page.data.structuredData,
            url: page.url,
            title: page.data.title,
            description: page.data.description,
        });
    }
    for (const page of nqtrSource.getPages()) {
        results.push({
            id: page.url,
            structured: page.data.structuredData,
            url: page.url,
            title: page.data.title,
            description: page.data.description,
        });
    }

    return NextResponse.json(results);
}
