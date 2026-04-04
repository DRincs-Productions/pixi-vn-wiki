"use client";
import { gitConfig } from "@/lib/shared";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function GiscusComments({ lang, folther, slug }: { lang?: string; folther: string; slug?: string[] }) {
    const { resolvedTheme } = useTheme();
    const term = slug && slug.length > 0 ? `${folther}/${slug.join("/")}` : folther;

    return (
        <div className='mt-8 border-t pt-8'>
            <Giscus
                repo={`${gitConfig.user}/${gitConfig.repo}`}
                repoId='R_kgDOLSXFcQ'
                category='Wiki chat (giscus)'
                categoryId='DIC_kwDOLSXFcc4CkZqY'
                mapping='specific'
                term={term}
                strict='0'
                reactionsEnabled='1'
                emitMetadata='0'
                inputPosition='bottom'
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                lang={lang ?? "en"}
                loading='lazy'
            />
        </div>
    );
}
