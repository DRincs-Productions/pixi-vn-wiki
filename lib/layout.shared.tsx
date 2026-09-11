import LogoImg from "@/app/icon.png";
import LogoWordmarkImg from "@/public/logo.png";
import { DiscordIcon, KofiIcon } from "@/components/ui/icons";
import { i18n } from "@/lib/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { appName, discordUrl, gitConfig, kofiUrl } from "./shared";

export function baseOptions(variant: "home" | "docs" = "home"): BaseLayoutProps {
    return {
        nav: {
            // JSX supported
            title:
                variant === "docs" ? (
                    <Image
                        src={LogoWordmarkImg}
                        alt={appName}
                        height={20}
                        width={89}
                        className="h-5 w-auto"
                    />
                ) : (
                    <>
                        <Image src={LogoImg} alt="Logo" width={40} height={40} />
                        <Image
                            src={LogoWordmarkImg}
                            alt={appName}
                            height={28}
                            width={125}
                            className="h-7 w-auto"
                        />
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
