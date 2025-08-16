import { baseOptions } from "@/app/layout.config";
import { homeLinks } from "@/components/docs-layout-props";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";
import LayoutProvider from "../layout.provider";

export default async function Layout({ children }: { children: ReactNode }) {
    const linksVar = await homeLinks();
    return (
        <LayoutProvider>
            <HomeLayout {...baseOptions()} links={linksVar}>
                {children}
            </HomeLayout>
        </LayoutProvider>
    );
}
