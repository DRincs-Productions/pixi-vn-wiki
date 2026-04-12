"use client";
import { create } from "@orama/orama";
import { useDocsSearch } from "fumadocs-core/search/client";
import {
    SearchDialog,
    SearchDialogClose,
    SearchDialogContent,
    SearchDialogHeader,
    SearchDialogIcon,
    SearchDialogInput,
    SearchDialogList,
    SearchDialogOverlay,
    type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";

function initOrama() {
    return create({
        schema: { _: "string" },
        // https://docs.orama.com/docs/orama-js/supported-languages
        language: "english",
    });
}

export default function DefaultSearchDialog(props: SharedProps) {
    const { locale } = useI18n(); // (optional) for i18n
    const { search, setSearch, query } = useDocsSearch({
        type: "static",
        initOrama,
        locale,
    });
    let items = query.data;
    switch (locale) {
        case "en":
            if (Array.isArray(items)) {
                items = items.map((item) => ({
                    ...item,
                    id: item.id.replaceAll("/en/", "/"),
                    url: item.url.replaceAll("/en/", "/"),
                }));
            }
            break;
    }

    return (
        <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList items={items !== "empty" ? items : null} />
            </SearchDialogContent>
        </SearchDialog>
    );
}
