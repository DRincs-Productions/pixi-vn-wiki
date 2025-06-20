"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function TranslateButton() {
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
            href={"https://crowdin.com/project/pixi-vn"}
        >
            <Globe className='size-3.5' />
            {t("translate_crowdin")}
        </a>
    );
}
