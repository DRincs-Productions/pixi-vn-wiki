"use client";

import { SandpackFiles } from "@codesandbox/sandpack-react";
import { ReactTemplate } from "./sandpack";

export function InkExample({ files, previewHeight = 400 }: { files?: SandpackFiles; previewHeight?: number }) {
    return (
        <ReactTemplate
            files={{
                "ink/start.ink": `export const startLabel = \`=== start ===
We arrived into London at 9.45pm exactly.

*	"There is not a moment to lose!"[] I declared.
	-> hurry_outside

*	"Monsieur, let us savour this moment!"[] I declared.
	My master clouted me firmly around the head and dragged me out of the door.
	-> dragged_outside

*	[We hurried home] -> hurry_outside

=== hurry_outside ===
We hurried home to Savile Row -> as_fast_as_we_could

=== dragged_outside ===
He insisted that we hurried home to Savile Row
-> as_fast_as_we_could

=== as_fast_as_we_could ===
<> as fast as we could.
-> start\`;`,
                "index.tsx": `import { Assets, Container, Game, canvas, narration } from "@drincs/pixi-vn";
import { importInkText } from "@drincs/pixi-vn-ink";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HEIGHT, WIDTH } from "./constants";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./hooks/useQueryInterface";
import { startLabel } from "./ink/start";
import "./styles.css";
import { defineAssets } from "./utils/assets-utility";

// Canvas setup with PIXI
const body = document.body;
if (!body) {
  throw new Error("body element not found");
}

Game.init(body, {
  height: HEIGHT,
  width: WIDTH,
  backgroundColor: "#303030",
}).then(() => {
  // Pixi.JS UI Layer
  canvas.addLayer("ui", new Container());

  // React setup with ReactDOM
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("root element not found");
  }

  const htmlLayout = canvas.addHtmlLayer("ui", root);
  if (!htmlLayout) {
    throw new Error("htmlLayout not found");
  }
  const reactRoot = createRoot(htmlLayout);
  const queryClient = new QueryClient();

  Game.onEnd(async () => {
    Game.clear();
    await narration.jumpLabel("start", {});
  });
  Game.onLoadingLabel(async (_stepId, { id }) => await Assets.backgroundLoadBundle(id));

  reactRoot.render(
    <div
      style={{
        color: "white",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      Loading...
    </div>
  );

  defineAssets().then(() =>
    importInkText([startLabel]).then(() => {
      Game.clear();
      narration.callLabel("start", {}).then(() => {
        reactRoot.render(
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        );
        queryClient.invalidateQueries({
          queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
        });
      });
    })
  );
});`,
                "ink.d.ts": `declare module "*.ink" {
  const content: string;
  export default content;
}`,
                ...files,
            }}
            previewHeight={previewHeight}
            dependencies={{
                "@drincs/pixi-vn-ink": "^0.8.3",
            }}
        />
    );
}
