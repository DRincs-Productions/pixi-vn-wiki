import type { ReactNode } from "react";
import "./global.css";
import Provider from "./provider";

export default function RootLayout({ children }: { children: ReactNode }) {
    return <Provider>{children}</Provider>;
}
