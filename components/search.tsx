"use client";
import { useStaticSearch, type SearchResultItem } from "fumadocs-core/search/client";
import { create } from "zbsearch";
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

function initDB() {
    return create({
        schema: { _: "string" },
        // https://docs.orama.com/docs/orama-js/supported-languages
        language: "english",
    });
}

const stripEnPath = (value: string) => value.replaceAll("/en/", "/");

function stripEn(item: SearchResultItem): SearchResultItem {
    if (item.type === "table") {
        return {
            ...item,
            id: stripEnPath(item.id),
            rows: item.rows.map((row) => ({ ...row, id: stripEnPath(row.id), url: stripEnPath(row.url) })),
        };
    }
    return { ...item, id: stripEnPath(item.id), url: stripEnPath(item.url) };
}

export default function DefaultSearchDialog(props: SharedProps) {
    const { locale } = useI18n(); // (optional) for i18n
    const search = useStaticSearch({
        locale,
        initDB,
    });
    let data = search.data;
    if (locale === "en" && data) {
        // the default language has no "/en" prefix in the URLs
        data = { ...data, items: data.items.map(stripEn) };
    }

    return (
        <SearchDialog {...search} data={data} {...props}>
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList />
            </SearchDialogContent>
        </SearchDialog>
    );
}
