"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function TranslateButton({ lang, folther }: { lang?: string; folther: string; path: string }) {
    const t = useTranslations("common");

    return (
        <a
            target='_blank'
            rel='noreferrer noopener'
            className={cn(
                buttonVariants({
                    variant: "secondary",
                    size: "xs",
                    className: "gap-1.5 not-prose padding-6 padding-x-2",
                })
            )}
            href={
                lang
                    ? `https://crowdin.com/project/pixi-vn/${lang}#/pixi-vn-wiki%20%2F%20main/content/${folther}`
                    : `https://crowdin.com/project/pixi-vn`
            }
        >
            <Globe className='size-3.5' />
            {t("translate_crowdin")}
        </a>
    );
}
