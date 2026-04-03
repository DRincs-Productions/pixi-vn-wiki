import { i18n } from "@/lib/i18n";
import LogoImg from "@/public/logo.webp";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            // JSX supported
            title: (
                <>
                    <Image src={LogoImg} alt='Logo' width={24} height={24} className='mr-2' />
                    {appName}
                </>
            ),
        },
        githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        i18n,
    };
}
