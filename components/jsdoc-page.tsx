import { getMDXComponents } from "@/components/mdx";
import {
    getJsdocPageMarkdownUrl,
    jsdocNqtrSource,
    jsdocPixiVnInkSource,
    jsdocPixiVnJsonSource,
    jsdocPixiVnSource,
    jsdocPixiVnSpineSource,
} from "@/lib/source";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
    EditOnGitHub,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { ViewOptionsPopover } from "./ai/page-actions";
import { KofiButton } from "./page-actions";

const libConfig = {
    "pixi-vn": {
        source: jsdocPixiVnSource,
        title: "pixi-vn",
        githubUrl: "https://github.com/DRincs-Productions/pixi-vn",
    },
    "pixi-vn-json": {
        source: jsdocPixiVnJsonSource,
        title: "pixi-vn-json",
        githubUrl: "https://github.com/DRincs-Productions/pixi-vn-json",
    },
    "pixi-vn-ink": {
        source: jsdocPixiVnInkSource,
        title: "pixi-vn-ink",
        githubUrl: "https://github.com/DRincs-Productions/pixi-vn-ink",
    },
    nqtr: {
        source: jsdocNqtrSource,
        title: "nqtr",
        githubUrl: "https://github.com/DRincs-Productions/nqtr",
    },
    "pixi-vn-spine": {
        source: jsdocPixiVnSpineSource,
        title: "pixi-vn-spine",
        githubUrl: "https://github.com/DRincs-Productions/pixi-vn-spine",
    },
} as const;

export type JsdocLib = keyof typeof libConfig;

export default async function JsdocPage({ slug, lib }: { slug?: string[]; lib: JsdocLib }) {
    const config = libConfig[lib];
    const jsdocSource = config.source;

    const page = jsdocSource.getPage(slug);
    if (!page) notFound();

    const MDX = page.data.body;
    const markdownUrl = getJsdocPageMarkdownUrl(page, lib).url;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
            <div className="flex flex-row gap-2 items-center border-b pb-6">
                <EditOnGitHub href={config.githubUrl}>
                    <ExternalLink className="size-3.5" />
                    {config.title} on GitHub
                </EditOnGitHub>
                <ViewOptionsPopover markdownUrl={markdownUrl} />
                <KofiButton />
            </div>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        a: createRelativeLink(jsdocSource, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}
