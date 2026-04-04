"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function GiscusComments({ lang }: { lang?: string }) {
    const { resolvedTheme } = useTheme();

    return (
        <div className='mt-8 border-t pt-8'>
            <Giscus
                repo='DRincs-Productions/pixi-vn'
                repoId='R_kgDOLSXFcQ'
                category='Wiki chat (giscus)'
                categoryId='DIC_kwDOLSXFcc4CkZqY'
                mapping='pathname'
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
