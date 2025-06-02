import type { ReactNode } from "react";
import "./global.css";
import Provider from "./provider";

// Funzione per ottenere la lingua del browser lato client

export default function RootLayout({ children }: { children: ReactNode }) {
    return <Provider>{children}</Provider>;
}
