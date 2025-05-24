import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    output: "export",
    reactStrictMode: true,
    images: {
        domains: ["pixijs.io", "github.com", "filters.pixijs.download", "firebasestorage.googleapis.com"],
        unoptimized: true,
    },
};

export default withMDX(config);
