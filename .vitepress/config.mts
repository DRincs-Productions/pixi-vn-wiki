import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pixi’VN",
  description: "Pixi’VN is a npm package that provides various features for creating visual novels, based on PixiJS.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Advanced topics', link: '/canvas-elements' },
      {
        text: 'Other topics',
        items: [
          { text: 'Distribution', link: '/distribution' },
          { text: 'Various Answers', link: '/various-answers' },
        ],
      },
    ],

    sidebar: {
      '/getting-started': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Why Pixi’VN?', link: '/why' },
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'Interface with JavaScript Framework', link: '/interface' },
          ]
        },
        {
          text: 'First steps',
          items: [
            { text: 'Characters', link: '/character' },
            { text: 'Dialogue and Narration', link: '/narration' },
            { text: 'Choice Menus', link: '/choices' },
            { text: 'Label and Game Step', link: '/labels' },
            { text: 'Game Storage', link: '/storage' },
            { text: 'Flags Management', link: '/flags' },
            { text: 'Save and Load', link: '/save' },
            { text: 'Images and Animations', link: '/images' },
            { text: 'Canvas Elements', link: '/canvas-elements' },
          ]
        }
      ],
      '/canvas-elements': [
        {
          text: 'Advanced topics',
          items: [
            { text: 'Canvas Elements', link: '/canvas-elements' },
            { text: 'Animations and Effects', link: '/animations-effects' },
            { text: 'Tickers', link: '/tickers' },
            { text: 'Stored Classes', link: '/stored-classes' },
            { text: 'Intecept Events', link: '/intercept-events' },
          ]
        }
      ],
      '/distribution': [
        {
          text: 'Other topics',
          items: [
            { text: 'Distribution', link: '/distribution' },
            { text: 'Various Answers', link: '/various-answers' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DRincs-Productions/pixi-vn' }
    ]
  }
})
