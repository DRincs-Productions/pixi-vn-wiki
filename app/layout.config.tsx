import LogoImg from "@/public/logo.webp";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/start/layout.tsx
 * Ink Layout: app/ink/layout.tsx
 * Ren'Py Layout: app/renpy/layout.tsx
 * Other Topics Layout: app/other-topics/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        title: (
            <>
                <Image src={LogoImg} alt='Logo' width={24} height={24} className='mr-2' />
                Pixi’VN
            </>
        ),
        transparentMode: "top",
    },
    githubUrl: "https://github.com/DRincs-Productions/pixi-vn",
};
