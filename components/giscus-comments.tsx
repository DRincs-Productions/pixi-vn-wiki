"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function GiscusComments() {
    const { resolvedTheme } = useTheme();

    return (
        <div className='mt-8 border-t pt-8'>
            <Giscus
                repo='DRincs-Productions/pixi-vn-wiki'
                repoId='R_kgDONapE6Q'
                category='General'
                categoryId='DIC_kwDONapE6c4CmOg5'
                mapping='pathname'
                strict='0'
                reactionsEnabled='1'
                emitMetadata='0'
                inputPosition='top'
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                lang='en'
                loading='lazy'
            />
        </div>
    );
}
