---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Pixi’VN"
  text: "PixiJS Game Engine"
  tagline: Create visual novels with the modern 2D rendering engine PixiJS, and your favorite JavaScript framework.
  image:
    src: /logo.webp
    alt: Pixi’VN Logo
  actions:
    - theme: brand
      text: Quick start
      link: /start/getting-started
    - theme: alt
      text: Why Pixi’VN?
      link: /start/why
    - theme: alt
      text: Discord
      link: https://discord.gg/E95FZWakzp
    - theme: alt
      text: Make your first Visual Novel 
      link: /start/make-visual-novel
    - theme: alt
      text: Make your first Game Engine
      link: /start/make-game-engine
---

<div style="height: 5rem;"></div>

<div class="grid">
<div class="right">
  <h2>
    Write your story <br />
    <span>As you like!!!</span>
  </h2>

  Write your story in your favorite narrative language. Such as *ink* or Ren'Py or TS/JS. <br />
  In all cases you can also interact with the canvas and sounds, or create custom narrative scripts. <br />
  You can read more about it [here](/start/narration.md).

</div>
<div class="left">

::: code-group

```ink [start.ink]
=== start
Hello, world!
This is a Pixi’VN tutorial.
I hope you enjoy it!
->DONE
```

```renpy [start.rpy]
label start:
    "Hello, world!"
    "This is a Pixi’VN tutorial."
    "I hope you enjoy it!"
```

```typescript [startLabel.ts]
const startLabel = newLabel("start_label_id", [
    (props) => narration.dialogue = "Hello, world!",
    (props) => narration.dialogue = "This is a Pixi’VN tutorial.",
    (props) => narration.dialogue = "I hope you enjoy it!"
])
```

```json [startLabel.json]
{
    "labels": {
        "start_label_id": [
            {
                "dialogue": "Hello, world!",
            },
            {
                "dialogue": "This is a Pixi’VN tutorial.",
            },
            {
                "dialogue": "I hope you enjoy it!",
            },
        ],
    }
}
```

:::

</div>
</div>

<div style="height: 5rem;"></div>

<div class="grid">
<div class="left">
  <h2>
    Show your creativity <br />
    <span>To the whole world!</span>
  </h2>

  Create your own assets with your favorite tools. Like Daz 3D, Blender, Photoshop, Krita, GIMP, Cinema 4D, Spine 2D etc. <br />
  Pixi’VN uses the power of [PixiJS](/start/canvas.md) to render your assets. <br />
  You can also create 2D animations with [Spine 2D](/start/canvas-spine2d.md) or interact with 3D elements with [Three.js](/start/canvas-threejs.md).

</div>

<div class="right">

<div class="nine_images">
  <img src="/daz.svg" alt="Daz 3D">
  <img src="/photoshop.svg" alt="Photoshop">
  <img src="/blender.svg" alt="Blender">
  <img src="/krita.svg" alt="Krita">
  <img src="/cinema4d.svg" alt="Cinema 4d">
  <img src="/gimp.svg" alt="GIMP">
  <img src="/spine.svg" alt="Spine 2D">
  <img src="/pixijs.svg" alt="PixiJS">
  <img src="/threejs.svg" alt="Three.js" style="background-color: white;">
</div>

</div>
</div>

<div style="height: 5rem;"></div>

<div class="grid">
<div class="left">
  <h2>
    Build the UI<br />
    <span>Use your favorite framework</span>
  </h2>

  Build the UI with your favorite JavaScript framework. Like React, Vue, Preact, Qwik, lit, Solid, Svelte, Angular, PixiJS etc. <br />
  You can read more about it [here](/start/interface.md).

</div>

<div class="right">

<div class="nine_images">
  <img src="/react.svg" alt="React">
  <img src="/vue.svg" alt="Vue">
  <img src="/preact.svg" alt="Preact">
  <img src="/pixijs.svg" alt="PixiJS">
  <img src="/qwik.svg" alt="qwik">
  <img src="/litjs.svg" alt="lit">
  <img src="/solidjs.svg" alt="Solid">
  <img src="/svelte.svg" alt="Svelte">
  <img src="/angular.svg" alt="Angular">
</div>

</div>
</div>

<div style="height: 5rem;"></div>

<div class="grid">
<div class="right">
  <h2>
    Welcome to the Web World<br />
    <span>With infinite possibilities</span>
  </h2>

  Choose which tools to use from the vast possibilities of the world of Web apps. Like TypeScript, Tauri, VS Code, Vite.js, i18n, NodeJS, Astro, AWS, Bootstrap, Electron, ESLint, Firebase, Gatsby, Gulp, Bit, Jest, MUI, Netlify, Nextjs, npm, Nuxt, Rollup, Supabase, Webpack, Fluent etc.

</div>

<div class="left">

<div class="images">
  <img src="/typescript.svg" alt="TypeScript">
  <img src="/tauri.svg" alt="Tauri">
  <img src="/vscode.svg" alt="VS Code">
  <img src="/vitejs.svg" alt="Vite.js">
  <img src="/i18next.svg" alt="i18next">
  <img src="/nodejs.svg" alt="NodeJS">
  <img src="/astro.svg" alt="Astro" style="background-color: white;">
  <img src="/aws.svg" alt="AWS">
  <img src="/bootstrap.svg" alt="Bootstrap">
  <img src="/electron.svg" alt="Electron">
  <img src="/eslint.svg" alt="ESLint">
  <img src="/firebase.svg" alt="Firebase">
  <img src="/gatsby.svg" alt="Gatsby">
  <img src="/gulp.svg" alt="Gulp">
  <img src="/bit.svg" alt="bit">
  <img src="/jest.svg" alt="Jest">
  <img src="/mui.svg" alt="MUI">
  <img src="/netlify.svg" alt="Netlify">
  <img src="/nextjs.svg" alt="Nextjs" style="background-color: white; border-radius: 50%;">
  <img src="/npm.svg" alt="npm">
  <img src="/nuxt.svg" alt="Nuxt">
  <img src="/rollup.svg" alt="Rollup">
  <img src="/supabase.svg" alt="supabase">
  <img src="/webpack.svg" alt="Webpack">
  <img src="/fluent.svg" alt="Fluent">
</div>

</div>
</div>

<style scoped>
.grid {
  display: grid;
  align-items: center;

  h2 {
    border-top: none;
    margin-top: 0rem;
    font-size: 2.25rem;
    line-height: calc(2.5 / 2.25);

    span {
      color: cyan;
    }
  }

  .right {
    max-width: 40ch;
    text-wrap: pretty;
  }
}

@media (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4rem;

    .right {
      order: 2;
    }
  }
}

.nine_images {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  align-items: center;

  img {
    width: 6rem;
    height: 6rem;
    transition: 200ms ease-in-out transform;
    border-radius: 20%;
  }

  img:hover {
    transform: scale(1.3);
  }
}

.images {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  align-items: center;

  img {
    width: 4.5rem;
    height: 4.5rem;
    transition: 200ms ease-in-out transform;
    border-radius: 20%;
  }

  img:hover {
    transform: scale(1.3);
  }
}
</style>
