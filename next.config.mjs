import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    images: {
        domains: ["pixijs.io", "github.com", "filters.pixijs.download"],
    },
};

export default withMDX(config);
