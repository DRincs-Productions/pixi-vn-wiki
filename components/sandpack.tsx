"use client";

import { SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";

export function ReactTemplate() {
    return (
        <SandpackProvider
            template='react-ts'
            customSetup={{
                dependencies: {
                    "@drincs/pixi-vn": "^1.2.13",
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
