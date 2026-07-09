import { AiFirst } from "@/app/(home)/ai-first";
import { CharacterAnimation } from "@/app/(home)/character-animation";
import { Contributing } from "@/app/(home)/contributing";
import { DesignSystem } from "@/app/(home)/design-system";
import { Hero } from "@/app/(home)/hero.client";
import { StepsGrid } from "@/app/(home)/steps.client";
import { Terminal } from "@/app/(home)/terminal";
import { Wrappers } from "@/app/(home)/wrappers";
import { AnybodyCanWrite } from "@/app/(home)/writing";
import { Markdown } from "@/components/ui/markdown";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
    return source.generateParams();
}

export default async function Home() {
    const t = await getTranslations("HomePage");
    return (
        <main className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
            <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
                <Hero />
            </div>
            <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">
                <Markdown className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
                    {t("description")}
                </Markdown>
            </div>
            <div className="mx-auto mt-12 w-full max-w-[1400px] lg:mt-20">
                <StepsGrid terminal={<Terminal />} writing={<AnybodyCanWrite />} />
            </div>
            <div className="mx-auto mt-12 w-full max-w-[1400px] lg:mt-20">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <Wrappers />
                    <AiFirst />
                    <DesignSystem />
                    <CharacterAnimation />
                </div>
            </div>
            <Contributing />
        </main>
    );
}

export async function generateMetadata() {
    return createMetadata({}, {});
}
