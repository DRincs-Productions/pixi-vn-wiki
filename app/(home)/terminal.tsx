import { CreateAppAnimation } from "@/app/(home)/terminal.client";
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";

export function Terminal() {
    return (
        <div className="mx-auto w-full max-w-[800px] p-2 bg-fd-card text-fd-card-foreground border rounded-2xl shadow-lg">
            <div className="flex flex-row gap-2">
                <h2 className="text-brand content-center font-mono font-bold uppercase border-2 border-brand/50 px-2 rounded-xl">
                    Try it out
                </h2>
                <ServerCodeBlock
                    code="npm create pixi-vn@latest"
                    lang="bash"
                    codeblock={{
                        className: "bg-fd-secondary flex-1",
                    }}
                />
            </div>

            <CreateAppAnimation />
        </div>
    );
}
