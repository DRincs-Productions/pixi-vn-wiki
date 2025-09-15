"use client";

import { SandpackFiles } from "@codesandbox/sandpack-react";
import { ReactTemplate } from "./sandpack";

export function InkExample({ files, previewHeight = 400 }: { files?: SandpackFiles; previewHeight?: number }) {
    return (
        <ReactTemplate
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
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
import "./values/characters";
import { initializeInk } from "./utils/ink-utility";
import "./labels/javascriptLabel";

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

  initializeInk();
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
                "utils/ink-utility.ts": `import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";
import { onInkHashtagScript, onReplaceTextAfterTranslation } from "@drincs/pixi-vn-ink";

export function initializeInk() {
  onInkHashtagScript((script, props, convertListStringToObj) => {
    if (script[0] === "rename" && script.length === 3) {
      let character = RegisteredCharacters.get<CharacterBaseModel>(script[1]);
      if (character) {
        character.name = script[2];
      }
      return true;
    }
    return false;
  });
  onReplaceTextAfterTranslation((key) => {
    let character = RegisteredCharacters.get<CharacterBaseModel>(key);
    if (character) {
      return character.name;
    }

    // if return undefined, the system will not replace the character id
    return undefined;
  });
}`,
                "labels/javascriptLabel": ``,
                ...files,
            }}
            previewHeight={previewHeight}
            dependencies={{
                "@drincs/pixi-vn-ink": "^0.9.9",
            }}
        />
    );
}

export function CharacterDialogueExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
mc: Hello, I'm Liam.
-> DONE\`;`,
                "values/characters.ts": `import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";

export const mc = new CharacterBaseModel("mc", {
  name: "Liam",
});

RegisteredCharacters.add(mc);`,
            }}
        />
    );
}

export function CharacterDialogueTextExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Hello, [mc].
-> DONE\`;`,
                "values/characters.ts": `import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";

export const mc = new CharacterBaseModel("mc", {
  name: "Liam",
});

RegisteredCharacters.add(mc);`,
            }}
        />
    );
}

export function CharacterEditExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
mc: Hello, I'm [mc].
# request input string
mc: My name is:
# rename mc {_input_value_}
mc: My name is [mc]
-> DONE\`;`,
                "values/characters.ts": `import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";

export const mc = new CharacterBaseModel("mc", {
  name: "Liam",
});

RegisteredCharacters.add(mc);`,
            }}
        />
    );
}

export function CharacterEmotionsExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
mc: Hello, I'm [mc].
# request input string
mc: My name is:
# rename mc {_input_value_}
mc: My name is [mc]
-> DONE\`;`,
                "values/characters.ts": `import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";

export const mc = new CharacterBaseModel("mc", {
  name: "Liam",
});

RegisteredCharacters.add(mc);`,
            }}
        />
    );
}

export function NativeJumpExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Start
-> after

=== after ===
After
End
-> DONE\`;`,
            }}
        />
    );
}

export function NativeCallExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`== start ==
I had a headache; threading is hard to get your head around.
<- conversation
<- walking


== conversation ==
It was a tense moment for Monty and me.
 * "What did you have for lunch today?"[] I asked.
    "Spam and eggs," he replied.
 * "Nice weather, we're having,"[] I said.
    "I've seen better," he replied.
 - -> house

== walking ==
We continued to walk down the dusty road.
 * [Continue walking]
    -> house

== house ==
Before long, we arrived at his house.
-> DONE\`;`,
            }}
        />
    );
}

export function JumpExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Start
# jump javascript_label_id
Start End
-> DONE\`;`,
                "labels/javascriptLabel": `import { narration, newLabel } from "@drincs/pixi-vn";

const javascriptLabel = newLabel("javascript_label_id", [
    () => {
        narration.dialogue = "After";
    },
    () => {
        narration.dialogue = "After End";
    },
]);
export default javascriptLabel;`,
            }}
        />
    );
}

export function CallExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Start
# call after
Start End
-> DONE

=== after ===
After
End
-> DONE\`;`,
            }}
        />
    );
}

export function PauseExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
# show image alien eggHead
# pause
Hello, world!
-> DONE\`;`,
                "assets/manifest.ts": `import { AssetsManifest } from "@drincs/pixi-vn";

/**
 * Manifest for the assets used in the game.
 * You can read more about the manifest here: https://pixijs.com/8.x/guides/components/assets#loading-multiple-assets
 */
const manifest: AssetsManifest = {
    bundles: [
        {
            name: "start",
            assets: [
                {
                    alias: "eggHead",
                    src: "https://pixijs.com/assets/eggHead.png",
                },
            ],
        },
    ],
};
export default manifest;`,
            }}
        />
    );
}
