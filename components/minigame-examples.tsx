"use client";

import { ReactTemplate } from "./sandpack";

export function MiniGameExample() {
    return (
        <ReactTemplate
            files={{
                "labels/startLabel.ts": `import { newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [() => {}]);`,
                "App.tsx": `import MiniGame from "./screens/MiniGame";

export default function App() {
  return (
    <div>
      <MiniGame />
    </div>
  );
}`,
                "screens/MiniGame.tsx": `export default function MiniGame() {
  return null;
}`,
                "hooks/useMinigame.ts": `import { canvas, Layer, PIXI } from "@drincs/pixi-vn";
import { useEffect, useRef } from "react";

export default function useMinigame(
  game: (layer: Layer) => void,
  props?: {
    onStart?: () => Promise<void>;
    onExit?: (layer: Layer) => void;
  }
) {
  const { onStart = () => Promise.resolve(), onExit } = props || {};
  const loading = useRef(false);

  useEffect(() => {
    loading.current = true;
    const layer = canvas.addLayer("minigame", new PIXI.Container());
    if (!layer) {
      console.error("Failed to create UI layer for minigame");
      return;
    }
    onStart().then(() => {
      loading.current = false;
      game(layer);
    });

    return () => {
      canvas.removeLayer("minigame");
      if (onExit) {
        onExit(layer);
      }
    };
  }, [game, onStart, onExit]);

  return {
    loading,
  };
}`,
            }}
        />
    );
}
