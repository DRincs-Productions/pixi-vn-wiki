"use client";

import { Accordions } from "fumadocs-ui/components/accordion";
import { Accordion as InternalAccordion } from "fumadocs-ui/components/accordion";
import { useTranslations } from "next-intl";

export function Accordion({ title, ...rest }: { title: string; value?: string }) {
    const t = useTranslations("accordions");

    return <InternalAccordion {...rest} title={t(title)} />;
}

export default {Accordions, Accordion}
