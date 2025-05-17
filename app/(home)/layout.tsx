import { baseOptions } from "@/app/layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <HomeLayout
            {...baseOptions}
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
            ]}
        >
            {children}
        </HomeLayout>
    );
}
