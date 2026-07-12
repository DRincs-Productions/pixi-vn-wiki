import LogoImg from "@/app/icon.png";
import { DiscordIcon, KofiIcon } from "@/components/ui/icons";
import { i18n } from "@/lib/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { appName, discordUrl, gitConfig, kofiUrl } from "./shared";

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            // JSX supported
            title: (
                <>
                    <Image src={LogoImg} alt="Logo" width={24} height={24} className="mr-2" />
                    {appName}
                </>
            ),
        },
        githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        i18n,
        links: [
            {
                type: "icon",
                label: "Discord",
                icon: <DiscordIcon className="size-5" />,
                text: "Discord",
                url: discordUrl,
            },
            {
                type: "icon",
                label: "Ko-fi",
                icon: <KofiIcon className="h-5 w-auto" />,
                text: "Ko-fi",
                url: kofiUrl,
            },
        ],
    };
}
