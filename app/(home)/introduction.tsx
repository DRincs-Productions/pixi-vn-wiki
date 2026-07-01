import { StepsGrid } from "@/app/(home)/steps.client";
import { Terminal } from "@/app/(home)/terminal";
import { AnybodyCanWrite } from "@/app/(home)/writing";
import { ItchLogo } from "@/components/ui/icons";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function Introduction() {
    const t = await getTranslations("Introduction");

    return (
        <StepsGrid
            step1={{ title: t("create_it"), description: t("create_it_description") }}
            step2={{ title: t("write"), description: t("write_description") }}
            step3={{ title: t("ship"), description: t("ship_description") }}
            terminal={<Terminal />}
            writing={<AnybodyCanWrite />}
            shipAction={
                <Link href="/start/distribution-itchio" rel="noreferrer noopener">
                    <ItchLogo className="h-auto w-32" />
                </Link>
            }
        />
    );
}
