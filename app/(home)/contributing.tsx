import { buttonVariants } from "@/components/ui/button";
import { KofiLogo } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { fetchAllContributors, fetchCrowdinTranslators } from "@/lib/get-contributors";
import { contributorRepos, gitConfig, kofiUrl } from "@/lib/shared";
import { Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function Contributing() {
    const t = await getTranslations("Contributing");

    return (
        <div className="relative flex flex-col items-center overflow-hidden px-4 py-16 text-center">
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.10]"
                style={{
                    background:
                        "radial-gradient(ellipse at center, var(--color-brand-secondary) 0%, transparent 70%)",
                }}
            />
            <Heart fill="currentColor" className="text-pink-500 mb-4 animate-pixivn-float" />
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">{t("title")}</h2>
            <p className="mb-4 text-fd-muted-foreground">{t("subtitle")}</p>
            <div className="mb-8 flex flex-row items-center gap-2">
                <a
                    href={kofiUrl}
                    target="_blank"
                    rel="noopener"
                    aria-label="Ko-fi"
                    className={cn(buttonVariants({ variant: "outline" }), "px-4")}
                >
                    <KofiLogo className="h-5 w-auto" />
                </a>
            </div>
            <div className="flex flex-col items-center gap-10">
                <GithubContributors />
                <CrowdinTranslators />
            </div>
        </div>
    );
}

async function GithubContributors() {
    const t = await getTranslations("Contributing");
    const contributors = await fetchAllContributors(gitConfig.user, contributorRepos);

    return (
        <AvatarGroup
            title={t("contributors")}
            people={contributors.map((contributor) => ({
                key: contributor.login,
                href: `https://github.com/${contributor.login}`,
                avatarUrl: contributor.avatar_url,
                alt: `${contributor.login}'s avatar`,
            }))}
        />
    );
}

async function CrowdinTranslators() {
    const t = await getTranslations("Contributing");
    const translators = await fetchCrowdinTranslators();

    return (
        <AvatarGroup
            title={t("translators")}
            people={translators.map((translator) => ({
                key: translator.login,
                href: translator.profileUrl,
                avatarUrl: translator.avatarUrl,
                alt: `${translator.name || translator.login}'s avatar`,
            }))}
        />
    );
}

function AvatarGroup({
    title,
    people,
}: {
    title: string;
    people: { key: string; href: string; avatarUrl: string; alt: string }[];
}) {
    if (people.length === 0) return null;

    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-sm font-medium text-fd-muted-foreground">{title}</h3>
            <div className="flex flex-row flex-wrap items-center justify-center md:pe-3">
                {people.map((person, i) => (
                    <a
                        key={person.key}
                        href={person.href}
                        rel="noreferrer noopener"
                        target="_blank"
                        title={person.key}
                        className="size-10 overflow-hidden rounded-full border-2 border-fd-background bg-fd-background transition-transform duration-200 hover:z-50 hover:scale-125 md:-mr-3 md:size-12"
                        style={{ zIndex: people.length - i }}
                    >
                        <Image
                            src={person.avatarUrl}
                            alt={person.alt}
                            unoptimized
                            width={48}
                            height={48}
                            loading="lazy"
                            className="size-full"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}
