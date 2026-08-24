"use client";

import { RefreshCw, SquareCode } from "lucide-react";
import { useState } from "react";
import { ReactTemplate } from "./sandpack";
import { buttonVariants } from "./ui/button";

export function VisualNovelExample() {
    return <ReactTemplate />;
}

export function PixiVnExample({ path }: { path: string }) {
    const [reloadKey, setReloadKey] = useState(0);

    return (
        <div className="relative">
            <div className="absolute top-2 right-2 z-10 flex gap-1">
                <button
                    type="button"
                    aria-label="Reload example"
                    title="Reload example"
                    className={buttonVariants({ variant: "secondary", size: "icon-sm" })}
                    onClick={() => setReloadKey((key) => key + 1)}
                >
                    <RefreshCw />
                </button>
                <a
                    href={`https://github.com/DRincs-Productions/pixi-vn-examples/blob/main/src/routes/${path}.tsx`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="View source on GitHub"
                    title="View source on GitHub"
                    className={buttonVariants({ variant: "secondary", size: "icon-sm" })}
                >
                    <SquareCode />
                </a>
            </div>
            <iframe
                key={reloadKey}
                src={`https://pixi-vn-visual-novel-example.pages.dev/${path}`}
                title={path}
                style={{
                    width: "100%",
                    height: "400px",
                    border: "0",
                    borderRadius: "4px",
                    overflow: "hidden",
                }}
            />
        </div>
    );
}
