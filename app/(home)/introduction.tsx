import { Terminal } from "@/app/(home)/terminal";
import { AnybodyCanWrite } from "@/app/(home)/writing";
import { ItchLogo } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const badgeVariants = cva(
    "inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground ring-4 ring-fd-primary/20",
);

export async function Introduction() {
    const t = await getTranslations("Introduction");

    return (
        <div className="grid grid-cols-1 border-r md:grid-cols-2">
            <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
                <div className={cn(badgeVariants())}>1</div>
                <h3 className="text-xl font-semibold">{t("create_it")}</h3>
                <p className="mb-8 text-fd-muted-foreground">{t("create_it_description")}</p>
                <Terminal />
            </div>
            <div className="flex flex-col gap-2 border-l border-t px-6 py-12 md:py-16">
                <div className={cn(badgeVariants())}>2</div>
                <h3 className="text-xl font-semibold">{t("write")}</h3>
                <p className="text-fd-muted-foreground">{t("write_description")}</p>
                <AnybodyCanWrite />
            </div>
            <div className="col-span-full flex flex-col items-center gap-2 border-l border-t px-6 py-16 text-center">
                <div className={cn(badgeVariants())}>3</div>
                <h3 className="text-2xl font-semibold">{t("ship")}</h3>
                <p className="text-fd-muted-foreground">{t("ship_description")}</p>

                <div className="mt-4 flex flex-row flex-wrap items-center gap-8">
                    <Link href="/start/distribution-itchio" rel="noreferrer noopener">
                        <ItchLogo className="h-auto w-32" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
