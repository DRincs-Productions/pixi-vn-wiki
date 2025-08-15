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
  const loading = useRef(false);

  // Keep latest callbacks in refs to avoid effect restarts
  const startRef = useRef<() => Promise<void>>(props?.onStart ?? (async () => {}));
  const exitRef = useRef<(layer: Layer) => void>(props?.onExit);

  // Update refs when props change, without changing effect identity
  useEffect(() => {
    startRef.current = props?.onStart ?? (async () => {});
  }, [props?.onStart]);

  useEffect(() => {
    exitRef.current = props?.onExit;
  }, [props?.onExit]);

  useEffect(() => {
    // Create the layer and start the game once
    loading.current = true;
    const layer = canvas.addLayer("minigame", new PIXI.Container());
    if (!layer) {
      console.error("Failed to create UI layer for minigame");
      return;
    }

    let cancelled = false;

    startRef.current().then(() => {
      if (cancelled) return;
      loading.current = false;
      game(layer);
    });

    return () => {
      cancelled = true;
      canvas.removeLayer("minigame");
      if (exitRef.current) {
        exitRef.current(layer);
      }
    };
  }, [game]);

  return { loading };
}`,
            }}
        />
    );
}
