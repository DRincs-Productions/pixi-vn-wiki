import { baseOptions } from "@/app/layout.config";
import { homeLinks } from "@/components/docs-layout-props";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const locale = "en";

    return (
        <HomeLayout {...baseOptions(locale)} links={homeLinks}>
            {children}
        </HomeLayout>
    );
}
