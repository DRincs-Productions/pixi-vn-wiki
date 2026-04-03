import { homeLinks } from "@/components/docs-layout-props";
import { baseOptions } from "@/lib/layout.shared";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { setRequestLocale } from "next-intl/server";
import LayoutProvider from "../layout.provider";

export default async function Layout({ children }: LayoutProps<"/">) {
    setRequestLocale("en");
    const linksVar = await homeLinks();
    return (
        <LayoutProvider>
            <HomeLayout {...baseOptions()} links={linksVar}>
                {children}
            </HomeLayout>
        </LayoutProvider>
    );
}
