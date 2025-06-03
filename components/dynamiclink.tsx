"use client";

import { DynamicLinkProps } from "fumadocs-core/dynamic-link";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DynamicLink(props: DynamicLinkProps) {
    const { href, ...rest } = props;
    const { lang } = useParams();
    const reshref = `${lang ? "/" + lang : "/"}/${href}`;

    return <Link {...rest} href={reshref} />;
}
