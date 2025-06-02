import { baseOptions } from "@/app/layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const locale = await getLocale();

    return (
        <HomeLayout
            {...baseOptions(locale)}
            links={[
                {
                    type: "menu",
                    text: "Make your first",
                    items: [
                        {
                            text: "Visual Novel",
                            url: "/start/make-visual-novel",
                        },
                        {
                            text: "Point and Click adventure game",
                            url: "/start/make-point-and-click",
                        },
                        {
                            text: "RPG game",
                            url: "/start/make-rpg",
                        },
                        {
                            text: "Game engine",
                            url: "/start/make-game-engine",
                        },
                    ],
                },
                {
                    text: "Guide",
                    url: "/start/getting-started",
                },
                {
                    type: "menu",
                    text: "Other topics",
                    items: [
                        {
                            text: "FAQ",
                            url: "/other-topics/faq",
                        },
                        {
                            text: "Migration",
                            url: "/other-topics/migration",
                        },
                        {
                            text: "Intecept Events",
                            url: "/other-topics/intercept-events",
                        },
                        {
                            text: "Pixi’VN + Json Integration",
                            url: "/other-topics/pixi-vn-json",
                        },
                    ],
                },
            ]}
        >
            {children}
        </HomeLayout>
    );
}
