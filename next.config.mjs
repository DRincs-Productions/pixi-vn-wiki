import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
    output: "export",
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "pixijs.io" },
            { protocol: "https", hostname: "github.com" },
            { protocol: "https", hostname: "pixijs.download" },
            { protocol: "https", hostname: "firebasestorage.googleapis.com" },
        ],
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default withMDX(withNextIntl(config));
