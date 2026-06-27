import { getPageImage, source } from "@/lib/source";
import { ImageResponse } from "@takumi-rs/image-response";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const revalidate = false;

const fontBold = readFileSync(
    join(process.cwd(), "node_modules/@fontsource/outfit/files/outfit-latin-800-normal.woff2"),
);
const fontRegular = readFileSync(
    join(process.cwd(), "node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff2"),
);
const logoBase64 = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/logo.png")).toString("base64")}`;
const iconBase64 = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/icon.png")).toString("base64")}`;

export async function GET(_req: Request, { params }: RouteContext<"/og/docs/[...slug]">) {
    const { slug } = await params;
    const page = source.getPage(slug.slice(0, -1));
    if (!page) notFound();

    return new ImageResponse(
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                padding: "4rem",
                backgroundColor: "#ffffff",
                backgroundImage:
                    "linear-gradient(to top right, rgba(56, 152, 220, 0.18), rgba(175, 48, 180, 0.12), transparent)",
                position: "relative",
                fontFamily: "Outfit",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "980px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "32px",
                    }}
                >
                    <img
                        src={iconBase64}
                        style={{
                            height: "100px",
                            width: "auto",
                            flexShrink: 0,
                        }}
                        alt=""
                    />
                    <p
                        style={{
                            fontWeight: 800,
                            fontSize: "82px",
                            margin: 0,
                            color: "#0f0f0f",
                            lineHeight: 1.1,
                        }}
                    >
                        {page.data.title}
                    </p>
                </div>
                {page.data.description && (
                    <p
                        style={{
                            fontSize: "52px",
                            color: "rgba(15, 15, 15, 0.6)",
                            margin: "28px 0 0 0",
                            fontWeight: 400,
                        }}
                    >
                        {page.data.description}
                    </p>
                )}
            </div>
            <img
                src={logoBase64}
                style={{
                    position: "absolute",
                    bottom: "3.5rem",
                    right: "4rem",
                    height: "50px",
                    width: "auto",
                }}
                alt=""
            />
        </div>,
        {
            width: 1200,
            height: 630,
            format: "webp",
            fonts: [
                { name: "Outfit", data: fontRegular, weight: 400, style: "normal" },
                { name: "Outfit", data: fontBold, weight: 800, style: "normal" },
            ],
        },
    );
}

export function generateStaticParams() {
    return source.getPages().map((page) => ({
        lang: page.locale,
        slug: getPageImage(page).segments,
    }));
}
