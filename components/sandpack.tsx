"use client";

import { SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";

export function ReactTemplate() {
    return (
        <SandpackProvider
            template='react-ts'
            customSetup={{
                dependencies: {
                    "@drincs/pixi-vn": "^1.2.14",
                    "@emotion/styled": "^11.13.5",
                    "@emotion/react": "^11.13.5",
                    "@mui/system": "^6.1.10",
                    "@tanstack/react-query": "^5.62.2",
                },
            }}
            files={{
                "public/index.html": index,
                "App.tsx": App,
                "styles.css": styles,
                "components/BackButton.tsx": BackButton,
                "components/NextButton.tsx": NextButton,
                "screens/modals/TextInput.tsx": TextInput,
                "screens/NarrationScreen.tsx": NarrationScreen,
                "hooks/useQueryInterface.ts": useQueryInterface,
                "screens/ChoiceMenu.tsx": ChoiceMenu,
            }}
        >
            <SandpackLayout>
                {/* <SandpackCodeEditor /> */}
                <SandpackPreview />
            </SandpackLayout>
        </SandpackProvider>
    );
}

const index = `<!DOCTYPE html>
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

const NextButton = `import { narration } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  INTERFACE_DATA_USE_QUEY_KEY,
  useQueryCanGoNext,
} from "../hooks/useQueryInterface";

export default function NextButton() {
  const queryClient = useQueryClient();
  const { data: canGoNext = false } = useQueryCanGoNext();
  const [loading, setLoading] = useState(false);

  async function nextOnClick(): Promise<void> {
    try {
      if (!narration.canGoNext) {
        return;
      }
      setLoading(true);
      narration
        .goNext({})
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
          });
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
      return;
    } catch (e) {
      console.error(e);
      return;
    }
  }

  if (!canGoNext) {
    return null;
  }

  return (
    <button
      onClick={nextOnClick}
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
}
`;

const TextInput = `import { narration } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  INTERFACE_DATA_USE_QUEY_KEY,
  useQueryDialogue,
  useQueryInputValue,
} from "../../hooks/useQueryInterface";

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
              if (
                "type" in e.target &&
                e.target.type === "number" &&
                "valueAsNumber" in e.target
              ) {
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
}
`;

const NarrationScreen = `import { Box, Grid, Stack } from "@mui/system";
import {
  useQueryCanGoBack,
  useQueryCanGoNext,
  useQueryDialogue,
} from "../hooks/useQueryInterface";
import ChoiceMenu from "./ChoiceMenu";

export default function NarrationScreen() {
  const { data: { text, character } = {} } = useQueryDialogue();
  const { data: canGoNext = false } = useQueryCanGoNext();
  const { data: canGoBack = false } = useQueryCanGoBack();

  return (
    <Stack
      direction="column"
      spacing={0}
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* READ THIS: https://pixi-vn.web.app/start/choices.html#how-to-create-the-choice-menu-ui-screen */}
      <ChoiceMenu />
      {text && (
        <Box
          sx={{
            pointerEvents: "auto",
            backgroundColor: "white",
            height: "30%",
            width: "100%",
          }}
        >
          <Stack
            direction="column"
            spacing={0}
            sx={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
              height: "100%",
              width: "100%",
            }}
          >
            {character && character.name && (
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                {character.name +
                  (character.surname ? " " + character.surname : "")}
              </div>
            )}
            <Grid
              container
              direction={"row"}
              sx={{
                overflow: "auto",
                marginRight: canGoNext || canGoBack ? "40px" : undefined,
                height: "100%",
              }}
            >
              {character?.icon && (
                <Grid size={2}>
                  <img
                    src={character?.icon}
                    loading="lazy"
                    alt=""
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </Grid>
              )}
              <Grid size={character?.icon ? 10 : 12}>
                <Box>{text}</Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
`;

const BackButton = `import { stepHistory } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import {
  INTERFACE_DATA_USE_QUEY_KEY,
  useQueryCanGoBack,
} from "../hooks/useQueryInterface";
import { useState } from "react";

export default function BackButton() {
  const queryClient = useQueryClient();
  const { data: canGoBack = false } = useQueryCanGoBack();
  const [loading, setLoading] = useState(false);

  async function backOnClick(): Promise<void> {
    try {
      if (!stepHistory.canGoBack) {
        return;
      }
      setLoading(true);
      stepHistory
        .goBack((_path) => {
          // TODO: navigate in the url path
          // READ THIS: https://pixi-vn.web.app/start/interface.html#navigate-switch-between-ui-screens
        })
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
          });
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
      return;
    } catch (e) {
      console.error(e);
      return;
    }
  }

  if (!canGoBack) {
    return null;
  }

  return (
    <button
      onClick={backOnClick}
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
}
`;

const useQueryInterface = `import {
  CharacterBaseModel,
  getCharacterById,
  narration,
} from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";

// READ THIS: https://pixi-vn.web.app/start/interface-connect-storage.html

export const INTERFACE_DATA_USE_QUEY_KEY = "interface_data_use_quey_key";

const CAN_GO_BACK_USE_QUEY_KEY = "can_go_back_use_quey_key";
export function useQueryCanGoBack() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CAN_GO_BACK_USE_QUEY_KEY],
    queryFn: () => {
      return narration.canGoBack;
    },
  });
}

const CHOICE_MENU_OPTIONS_USE_QUEY_KEY = "choice_menu_options_use_quey_key";
export function useQueryChoiceMenuOptions() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CHOICE_MENU_OPTIONS_USE_QUEY_KEY],
    queryFn: () => {
      return narration.choiceMenuOptions || [];
    },
  });
}

const INPUT_VALUE_USE_QUEY_KEY = "input_value_use_quey_key";
export function useQueryInputValue<T>() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, INPUT_VALUE_USE_QUEY_KEY],
    queryFn: () => {
      return {
        isRequired: narration.isRequiredInput,
        type: narration.inputType,
        currentValue: narration.inputValue as T | undefined,
      };
    },
  });
}

const DIALOGUE_USE_QUEY_KEY = "dialogue_use_quey_key";
export function useQueryDialogue() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, DIALOGUE_USE_QUEY_KEY],
    queryFn: () => {
      let dialogue = narration.dialogue;
      let newText: string | undefined = dialogue?.text;
      let newCharacter: CharacterBaseModel | undefined = undefined;
      if (dialogue) {
        newCharacter = dialogue.character
          ? getCharacterById(dialogue.character)
          : undefined;
        if (!newCharacter && dialogue.character) {
          newCharacter = new CharacterBaseModel(dialogue.character, {
            name: dialogue.character,
          });
        }
      }
      return {
        text: newText,
        character: newCharacter,
      };
    },
  });
}

const CAN_GO_NEXT_USE_QUEY_KEY = "can_go_next_use_quey_key";
export function useQueryCanGoNext() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CAN_GO_NEXT_USE_QUEY_KEY],
    queryFn: () => {
      return narration.canGoNext && !narration.isRequiredInput;
    },
  });
}

const NARRATIVE_HISTORY_USE_QUEY_KEY = "narrative_history_use_quey_key";
export function useQueryNarrativeHistory() {
  return useQuery({
    queryKey: [INTERFACE_DATA_USE_QUEY_KEY, NARRATIVE_HISTORY_USE_QUEY_KEY],
    queryFn: () => {
      return narration.narrativeHistory.map((step) => {
        let character = step.dialoge?.character
          ? getCharacterById(step.dialoge?.character) ??
            new CharacterBaseModel(step.dialoge?.character, {
              name: step.dialoge?.character,
            })
          : undefined;
        return {
          character: character?.name
            ? character.name +
              (character.surname ? " " + character.surname : "")
            : undefined,
          text: step.dialoge?.text || "",
          icon: character?.icon,
          choices: step.choices,
          inputValue: step.inputValue,
        };
      });
    },
  });
}
`;

const ChoiceMenu = `import {
  ChoiceMenuOption,
  ChoiceMenuOptionClose,
  narration,
} from "@drincs/pixi-vn";
import { Grid } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import {
  INTERFACE_DATA_USE_QUEY_KEY,
  useQueryChoiceMenuOptions,
} from "../hooks/useQueryInterface";

export default function ChoiceMenu() {
  const { data: menu = [] } = useQueryChoiceMenuOptions();
  const queryClient = useQueryClient();

  function afterSelectChoice(
    item: ChoiceMenuOptionClose | ChoiceMenuOption<{}>
  ) {
    narration
      .selectChoice(item, {})
      .then(() =>
        queryClient.invalidateQueries({
          queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
        })
      )
      .catch((e) => console.error(e));
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        gap: 1,
        pointerEvents: "auto",
        maxHeight: "100%",
      }}
    >
      {menu?.map((item, index) => {
        return (
          <Grid
            key={"choice-" + index}
            justifyContent="center"
            alignItems="center"
          >
            <button onClick={() => afterSelectChoice(item)}>{item.text}</button>
          </Grid>
        );
      })}
    </Grid>
  );
}
`;
