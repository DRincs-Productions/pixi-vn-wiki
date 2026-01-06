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
import { BACKGROUND_COLOR, HEIGHT, WIDTH } from "./constants";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./hooks/useQueryInterface";
import "./labels";
import { startLabel } from "./ink/start";
import "./styles.css";
import { defineAssets } from "./utils/assets-utility";
import { initializeInk } from "./utils/ink-utility";
import "./values/characters";

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
    await narration.jump("start", {});
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
      initializeInk();
      Game.clear();
      narration.call("start", {}).then(() => {
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
                "labels/index.ts": "",
                ...files,
            }}
            previewHeight={previewHeight}
            dependencies={{
                "@drincs/pixi-vn-ink": "^0.11.1",
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
mc@happy: Hi, I'm Liam. I'm very happy today.
-> DONE\`;`,
                "values/characters.ts": `import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";

export const mc = new CharacterBaseModel("mc", {
  name: "Liam",
});

export const mcHappy = new CharacterBaseModel(
  { id: "mc", emotion: "happy" },
  {
    name: "Liam happy",
  }
);

RegisteredCharacters.add([mc, mcHappy]);`,
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
                "labels/javascriptLabel.ts": `import { narration, newLabel } from "@drincs/pixi-vn";

const javascriptLabel = newLabel("javascript_label_id", [
    () => {
        narration.dialogue = "After";
    },
    () => {
        narration.dialogue = "After End";
    },
]);
export default javascriptLabel;`,
                "labels/index.ts": `import "./javascriptLabel";`,
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

export function InputExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Hello, 
# request input type string // [!code focus]
<>what is your name?
My name is { _input_value_ } // [!code focus]
# request input type number default 18 // [!code focus]
How old are you?
I am { _input_value_ } years old // [!code focus]
# request input type "html textarea" // [!code focus]
Describe who you are:
{ _input_value_ } // [!code focus]
Restart
-> DONE\`;`,
            }}
        />
    );
}

export function ContinueExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Who are we going to rescue: the kitten or the wizard?<># continue
* [workplace_midground_kitten] 
    -> END
*  [workplace_midground_wizard]
    -> END\`;`,
            }}
        />
    );
}

export function NewLinesExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Hello, this is a test. \\\\n\\\\n This is a new line.\`;`,
            }}
        />
    );
}

export function MarkdownExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
Hello, this is some *italic* text and this is some **bold** text.\`;`,
            }}
        />
    );
}

export function Markdown2Example() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
\\# Markdown Test \\\\n<>
Hello, this is a test of the markdown parser. Pixi’VN does not manage markdown, but you can implement a markdown parser to display text with markdown syntax. \\\\n<>
For example in React, you can use the library [react-markdown](https:\\/\\/www.npmjs.com/package/react-markdown). \\\\n<>
\\#\\# Bold Text \\\\n<>
\\**This is bold text.** \\\\n<>
\\#\\# Italic Text \\\\n<>
\\*This is italic text.* \\\\n<>
\\#\\# Delete Text \\\\n<>
\\~~This is deleted text.~~ \\\\n<>
\\#\\# Link Test \\\\n<>
[Link to Google](https:\\/\\/www.google.com) \\\\n<>
\\#\\# H2 Test \\\\n<>
\\#\\#\\# H3 Test \\\\n<>
\\#\\#\\#\\# H4 Test \\\\n<>
\\#\\# Code Test \\\\n<>
\\\`Hello World\\\` \\\\n<>
\\\`\\\`\\\`js \\\\n<>
console.log("Hello World") \\\\n<>
\\\`\\\`\\\` \\\\n<>
\\#\\# List Test \\\\n<>
\\- Item 1 \\\\n<>
\\* Item 2 \\\\n<>
\\- [x] Item 3 \\\\n<>
\\#\\# Table Test \\\\n<>
\\| Header 1 \\| Header 2 \\| \\\\n<>
\\| -------- \\| -------- \\| \\\\n<>
\\| Cell 1   \\| Cell 2   \\| \\\\n<>
\\#\\# Separator Test \\\\n<>
\\*\\*\\* \\\\n<>
Footer\`;`,
            }}
        />
    );
}

export function CSSExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
<span style="color:blue">some *blue* text</span>.
<span style="color:red">some *red* text</span>.
<span style="color:green">some *green* text</span>.\`;`,
            }}
        />
    );
}

export function ShowComponentExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
# show image eggHead
# show image "eggHead 2" eggHead xAlign 1 yAlign 1
# show image flowerTop xAlign 0 yAlign 1 visible true cursor "pointer" alpha 0.5
# show video my_video xAlign 1 yAlign 0
# show text hello "Hello, this is a text" xAlign 0.5 yAlign 0.5 style \\\{ "fill": "red", "fontSize": 30 \\\}
# pause
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
        { alias: "eggHead", src: "https://pixijs.com/assets/eggHead.png" },
        { alias: "flowerTop", src: "https://pixijs.com/assets/flowerTop.png" },
        { alias: "my_video", src: "https://pixijs.com/assets/video.mp4" },
      ],
    },
  ],
};
export default manifest;`,
            }}
        />
    );
}

export function ShowContainerExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
# show imagecontainer james [m01-body m01-eyes m01-mouth] xAlign 0.5 yAlign 1
# show imagecontainer sly [fm01-body fm01-eyes fm01-mouth] xAlign 0.2 yAlign 1 with movein
# show imagecontainer steph [fm02-body fm02-eyes fm02-mouth] xAlign 0.8 yAlign 1 with dissolve
# pause\`;`,
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
          alias: "fm01-body",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/fm01/fm01-body.webp",
        },
        {
          alias: "fm01-eyes",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/fm01/fm01-eyes-smile.webp",
        },
        {
          alias: "fm01-mouth",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/fm01/fm01-mouth-smile00.webp",
        },
        {
          alias: "fm02-body",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/fm02/fm02-body.webp",
        },
        {
          alias: "fm02-eyes",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/fm02/fm02-eyes-smile.webp",
        },
        {
          alias: "fm02-mouth",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/fm02/fm02-mouth-smile00.webp",
        },
        {
          alias: "m01-body",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-body.webp",
        },
        {
          alias: "m01-eyes",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-eyes-smile.webp",
        },
        {
          alias: "m01-mouth",
          src: "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-bucket/refs/heads/main/breakdown/m01/m01-mouth-smile00.webp",
        },
      ],
    },
  ],
};
export default manifest;`,
                "constants.ts": `export const HEIGHT = 1080;
export const WIDTH = 1920;
export const BACKGROUND_COLOR = "#303030";`,
            }}
        />
    );
}

export function CanvasExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
# show image eggHead x 20 y 20
# show image flowerTop x 220 y 20 with dissolve
# show image helmlok x 20 y 220 with movein
# show image skully x 220 y 220 with zoomin
# pause
# move eggHead x 300 y 0
# rotate flowerTop
# edit image helmlok alpha 0.5
# shake skully
# pause
# remove image eggHead
# remove image flowerTop with dissolve duration 2
# remove image helmlok with moveout
# remove image skully with zoomout
# pause
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
        { alias: "eggHead", src: "https://pixijs.com/assets/eggHead.png" },
        { alias: "flowerTop", src: "https://pixijs.com/assets/flowerTop.png" },
        { alias: "helmlok", src: "https://pixijs.com/assets/helmlok.png" },
        { alias: "skully", src: "https://pixijs.com/assets/skully.png" },
      ],
    },
  ],
};
export default manifest;`,
            }}
        />
    );
}

export function TransitionExample() {
    return (
        <InkExample
            files={{
                "ink/start.ts": `export const startLabel = \`=== start ===
# show eggHead with dissolve duration 3
temp durationVar = 3
# show eggHead eggHead2 with fade duration {durationVar}
# show flowerTop x 20 y 30 with movein
# show helmlok x 20 y 30 with zoomin
# show skully x 20 y 30 with pushin
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
        { alias: "eggHead", src: "https://pixijs.com/assets/eggHead.png" },
        { alias: "flowerTop", src: "https://pixijs.com/assets/flowerTop.png" },
        { alias: "helmlok", src: "https://pixijs.com/assets/helmlok.png" },
        { alias: "skully", src: "https://pixijs.com/assets/skully.png" },
      ],
    },
  ],
};
export default manifest;`,
            }}
        />
    );
}
