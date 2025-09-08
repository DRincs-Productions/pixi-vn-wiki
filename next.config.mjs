import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
    output: "export",
    reactStrictMode: true,
    images: {
        domains: ["pixijs.io", "github.com", "filters.pixijs.download", "firebasestorage.googleapis.com"],
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default withMDX(withNextIntl(config));
