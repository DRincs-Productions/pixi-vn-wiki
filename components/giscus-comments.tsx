"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function GiscusComments() {
    const { resolvedTheme } = useTheme();

    return (
        <div className='mt-8 border-t pt-8'>
            {/* repoId and categoryId can be generated at https://giscus.app for DRincs-Productions/pixi-vn */}
            <Giscus
                repo='DRincs-Productions/pixi-vn'
                repoId='TODO_REPLACE_REPO_ID'
                category='General'
                categoryId='TODO_REPLACE_CATEGORY_ID'
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
