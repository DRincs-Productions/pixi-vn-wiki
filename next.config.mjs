import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

// "light" local development: see `lib/dev-mode.ts`. Disable it with `WIKI_FULL_DEV=1`.
const lightDev = process.env.NODE_ENV === "development" && process.env.WIKI_FULL_DEV !== "1";
// also needed in `process.env` (not only in `env`): the fumadocs macro evaluates `lib/source.ts` outside the bundle
process.env.WIKI_LIGHT_DEV = lightDev ? "1" : "0";

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
    output: "export",
    reactStrictMode: true,
    serverExternalPackages: ["@takumi-rs/core"],
    env: {
        WIKI_LIGHT_DEV: process.env.WIKI_LIGHT_DEV,
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "pixijs.io" },
            { protocol: "https", hostname: "github.com" },
            { protocol: "https", hostname: "pixijs.download" },
            { protocol: "https", hostname: "firebasestorage.googleapis.com" },
        ],
        unoptimized: true,
    },
    ...(lightDev && {
        experimental: {
            // lower peak memory of webpack, at the cost of slightly slower compilations
            webpackMemoryOptimizations: true,
            // do not load every page module when the server starts
            preloadEntriesOnStart: false,
        },
        // drop the compiled pages that are not visited anymore
        onDemandEntries: {
            maxInactiveAge: 30 * 1000,
            pagesBufferLength: 2,
        },
    }),
};

export default withMDX(withNextIntl(config));
