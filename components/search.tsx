"use client";

import { OramaClient } from "@oramacloud/client";
import type { SharedProps } from "fumadocs-ui/components/dialog/search";
import OramaSearchDialog from "fumadocs-ui/components/dialog/search-orama";

const client = new OramaClient({
    endpoint: "https://cloud.orama.run/v1/indexes/pixi-vn-b1iesv",
    api_key: "yGCP52czbPjk5QCkTkDwPsekZ4LXg3Bl",
});

export default function CustomSearchDialog(props: SharedProps) {
    return <OramaSearchDialog {...props} client={client} showOrama />;
}
