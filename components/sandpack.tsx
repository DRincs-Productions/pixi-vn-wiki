"use client";

import { SandpackFiles, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";

export function ReactTemplate({
    files,
    previewHeight = 400,
    dependencies = {},
}: {
    files?: SandpackFiles;
    previewHeight?: number;
    dependencies?: Record<string, string>;
}) {
    return (
        <SandpackProvider
            template='react-ts'
            customSetup={{
                dependencies: {
                    "@drincs/pixi-vn": "^1.4.3",
                    "@tanstack/react-query": "^5.85.2",
                    "react-markdown": "^8.0.0",
                    "rehype-raw": "^7.0.0",
                    "remark-gfm": "^4.0.1",
                    ...dependencies,
                },
            }}
            files={{
                "public/index.html": indexhtml,
                "App.tsx": App,
                "styles.css": styles,
                "components/BackButton.tsx": BackButton,
                "components/NextButton.tsx": NextButton,
                "screens/modals/TextInput.tsx": TextInput,
                "screens/NarrationScreen.tsx": NarrationScreen,
                "hooks/useQueryInterface.ts": useQueryInterface,
                "screens/ChoiceMenu.tsx": ChoiceMenu,
                "labels/startLabel.ts": startLabel,
                "utils/assets-utility.ts": assetsUtility,
                "assets/manifest.ts": manifest,
                "index.tsx": index,
                "hooks/useNarrationFunctions.ts": useNarrationFunctions,
                "constants.ts": constants,
                "labels/index.ts": labels,
                "values/characters.ts": "",
                ...files,
            }}
            style={{
                width: "100%",
                height: `${previewHeight}px`,
                border: 0,
                borderRadius: "4px",
                overflow: "hidden",
            }}
        >
            <SandpackLayout>
                {/* <SandpackCodeEditor /> */}
                <SandpackPreview
                    style={{
                        height: `${previewHeight}px`,
                    }}
                />
            </SandpackLayout>
        </SandpackProvider>
    );
}

const indexhtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pixi’VN</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const App = `import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

export default function App() {
  return (
    <div>
      <NarrationScreen />
      <TextInput />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "70%",
          width: 40,
        }}
      >
        <NextButton />
        <BackButton />
      </div>
    </div>
  );
}`;

const styles = `:root {
  background-color: #242424;
}

body {
  margin: 0;
  display: flex;
  overflow: hidden;
}`;

const NextButton = `import { useState } from "react";
import useNarrationFunctions from "../hooks/useNarrationFunctions";
import { useQueryCanGoNext } from "../hooks/useQueryInterface";

export default function NextButton() {
  const { data: canGoNext = false } = useQueryCanGoNext();
  const [loading, setLoading] = useState(false);
  const { goNext } = useNarrationFunctions();

  if (!canGoNext) {
    return null;
  }

  return (
    <button
      onClick={() => {
        setLoading(true);
        goNext()
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      }}
      disabled={loading}
      style={{
        width: 40,
        height: 20,
        pointerEvents: "auto",
      }}
    >
      Next
    </button>
  );
}`;

const TextInput = `import { narration } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryDialogue, useQueryInputValue } from "../../hooks/useQueryInterface";

export default function TextInput() {
  const { data: { text } = {} } = useQueryDialogue();
  const {
    data: { isRequired: open, currentValue } = {
      currentValue: undefined,
      isRequired: false,
    },
  } = useQueryInputValue<string | number>();
  const [tempValue, setTempValue] = useState<string | number>();
  const queryClient = useQueryClient();

  return (
    <dialog
      open={open}
      style={{
        pointerEvents: "auto",
      }}
    >
      <p>{text}</p>
      {open && (
        <input
          defaultValue={currentValue || ""}
          onChange={(e) => {
            if (e && e.target && "value" in e.target) {
              let value: any = e.target.value;
              if ("type" in e.target && e.target.type === "number" && "valueAsNumber" in e.target) {
                value = e.target.valueAsNumber;
              }
              setTempValue(value);
            }
          }}
        />
      )}
      <button
        onClick={() => {
          narration.inputValue = tempValue || currentValue;
          setTempValue(undefined);
          queryClient.invalidateQueries({
            queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
          });
        }}
      >
        Confirm
      </button>
    </dialog>
  );
}`;

const NarrationScreen = `import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useQueryCanGoBack, useQueryCanGoNext, useQueryDialogue } from "../hooks/useQueryInterface";
import ChoiceMenu from "./ChoiceMenu";

export default function NarrationScreen() {
  const { data: { text, character } = {} } = useQueryDialogue();
  const { data: canGoNext = false } = useQueryCanGoNext();
  const { data: canGoBack = false } = useQueryCanGoBack();

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ flex: 1, minHeight: 0 }}>
        {/* READ THIS: https://pixi-vn.web.app/start/choices.html#how-to-create-the-choice-menu-ui-screen */}
        <ChoiceMenu />
      </div>
      {text && (
        <div
          style={{
            flex: "0 0 auto",
            height: "30%",
            minHeight: 0,
            pointerEvents: "auto",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {character && character.name && <b>{\`\${character?.name || ""} \${character?.surname || ""}\`}</b>}
          <div
            style={{
              marginRight: canGoNext || canGoBack ? "40px" : undefined,
              display: "flex",
              flexDirection: "row",
              height: "100%",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {character?.icon && (
              <img
                src={character?.icon}
                loading='lazy'
                alt=''
                style={{
                  maxWidth: "30%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            )}
            <div style={{ flex: 1, minHeight: 0, overflow: "auto", height: "100%" }}>
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {text}
              </Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

const BackButton = `import { useState } from "react";
import useNarrationFunctions from "../hooks/useNarrationFunctions";
import { useQueryCanGoBack } from "../hooks/useQueryInterface";

export default function BackButton() {
  const { data: canGoBack = false } = useQueryCanGoBack();
  const [loading, setLoading] = useState(false);
  const { goBack } = useNarrationFunctions();

  if (!canGoBack) {
    return null;
  }

  return (
    <button
      onClick={() => {
        setLoading(true);
        goBack()
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      }}
      disabled={loading}
      style={{
        width: 40,
        height: 20,
        pointerEvents: "auto",
      }}
    >
      Back
    </button>
  );
}`;

const useQueryInterface = `import { CharacterBaseModel, narration, stepHistory } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";

export const INTERFACE_DATA_USE_QUEY_KEY = "interface_data_use_quey_key";

const CAN_GO_BACK_USE_QUEY_KEY = "can_go_back_use_quey_key";
export function useQueryCanGoBack() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CAN_GO_BACK_USE_QUEY_KEY],
    queryFn: async () => stepHistory.canGoBack,
  });
}

const CHOICE_MENU_OPTIONS_USE_QUEY_KEY = "choice_menu_options_use_quey_key";
export function useQueryChoiceMenuOptions() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CHOICE_MENU_OPTIONS_USE_QUEY_KEY],
    queryFn: async () =>
      narration.choices?.map((option) => ({
        ...option,
        text: typeof option.text === "string" ? option.text : option.text.join(" "),
      })) || [],
  });
}

const INPUT_VALUE_USE_QUEY_KEY = "input_value_use_quey_key";
export function useQueryInputValue<T>() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, INPUT_VALUE_USE_QUEY_KEY],
    queryFn: async () => ({
      isRequired: narration.isRequiredInput,
      type: narration.inputType,
      currentValue: narration.inputValue as T | undefined,
    }),
  });
}

const DIALOGUE_USE_QUEY_KEY = "dialogue_use_quey_key";
export function useQueryDialogue() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, DIALOGUE_USE_QUEY_KEY],
    queryFn: async ({ queryKey }) => {
      let dialogue = narration.dialogue;
      let text = dialogue?.text;
      if (Array.isArray(text)) {
        text = text.join(" ");
      }
      let character = dialogue?.character as string | CharacterBaseModel | undefined;
      if (typeof character === "string") {
        character = new CharacterBaseModel(character, {
          name: character,
        });
      }

      return {
        text,
        character,
      };
    },
  });
}

const CAN_GO_NEXT_USE_QUEY_KEY = "can_go_next_use_quey_key";
export function useQueryCanGoNext() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CAN_GO_NEXT_USE_QUEY_KEY],
    queryFn: async () => narration.canContinue && !narration.isRequiredInput,
  });
}

const NARRATIVE_HISTORY_USE_QUEY_KEY = "narrative_history_use_quey_key";
export function useQueryNarrativeHistory() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, NARRATIVE_HISTORY_USE_QUEY_KEY],
    queryFn: async () => {
      const promises = stepHistory.narrativeHistory.map(async (step) => {
        let character = step.dialogue?.character as string | CharacterBaseModel | undefined;
        if (typeof character === "string") {
          character = new CharacterBaseModel(character, { name: character });
        }
        let text = step.dialogue?.text;
        if (Array.isArray(text)) {
          text = text.join(" ");
        }
        return {
          character: character?.name ? character.name + (character.surname ? " " + character.surname : "") : undefined,
          text: text || "",
          icon: character?.icon,
          choices: step.choices,
          inputValue: step.inputValue,
        };
      });
      return await Promise.all(promises);
    },
  });
}`;

const ChoiceMenu = `import useNarrationFunctions from "../hooks/useNarrationFunctions";
import { useQueryChoiceMenuOptions } from "../hooks/useQueryInterface";

export default function ChoiceMenu() {
  const { data: menu = [] } = useQueryChoiceMenuOptions();
  const { selectChoice } = useNarrationFunctions();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflow: "auto",
        gap: "8px",
        maxHeight: "100%",
        margin: 0,
        pointerEvents: menu?.length > 0 ? "auto" : "none",
      }}
    >
      {menu?.map((item, index) => (
        <button
          key={"choice-" + index}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => selectChoice(item)}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}`;

const startLabel = `import { narration, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => (narration.dialogue = "Hello"),
  (props, { labelId }) => narration.jump(labelId, props),
]);`;

const assetsUtility = `import { Assets } from "@drincs/pixi-vn";
import manifest from "../assets/manifest";

/**
 * Define all the assets that will be used in the game.
 * This function will be called before the game starts.
 * You can read more about assets management in the documentation: https://pixi-vn.web.app/start/assets-management.html
 */
export async function defineAssets() {
  Assets.init({ manifest });
}`;

const index = `import { Assets, Container, Game, canvas, narration } from "@drincs/pixi-vn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BACKGROUND_COLOR, HEIGHT, WIDTH } from "./constants";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./hooks/useQueryInterface";
import "./labels";
import { startLabel } from "./labels/startLabel";
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
  backgroundColor: BACKGROUND_COLOR,
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
    await narration.jump(startLabel, {});
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

  defineAssets().then(() => {
    Game.clear();
    narration.call(startLabel, {}).then(() => {
      reactRoot.render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      );
      queryClient.invalidateQueries({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
      });
    });
  });
});`;

const manifest = `import { AssetsManifest } from "@drincs/pixi-vn";

/**
 * Manifest for the assets used in the game.
 * You can read more about the manifest here: https://pixijs.com/8.x/guides/components/assets#loading-multiple-assets
 */
const manifest: AssetsManifest = {
  bundles: [],
};
export default manifest;`;

const useNarrationFunctions = `import { narration, stepHistory, StoredIndexedChoiceInterface } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

export default function useNarrationFunctions() {
  const queryClient = useQueryClient();
  const gameProps = {};

  const goNext = useCallback(async () => {
    try {
      if (!narration.canContinue) {
        return;
      }
      return narration
        .continue(gameProps)
        .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
      return;
    }
  }, [gameProps, queryClient]);

  const goBack = useCallback(async () => {
    return stepHistory
      .back(gameProps)
      .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
      .catch((e) => console.error(e));
  }, [gameProps, queryClient]);

  const selectChoice = useCallback(
    async (item: StoredIndexedChoiceInterface) => {
      return narration
        .selectChoice(item, gameProps)
        .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
        .catch((e) => console.error(e));
    },
    [gameProps, queryClient]
  );

  return {
    goNext,
    goBack,
    selectChoice,
  };
}`;

const constants = `export const HEIGHT = 480;
export const WIDTH = 720;
export const BACKGROUND_COLOR = "#303030";`;

const labels = `import "./startLabel";`;
