# Ren'Py vs Pixi’VN

Making a comparison between Ren'Py and Pixi’VN is necessary because Ren'Py is currently the most widely used engine for creating visual novels.

(This comparison was made by the Pixi’VN team, trying to be unbiased. If you disagree with this comparison or if you think other features should be compared, create an [new discussion](https://github.com/DRincs-Productions/pixi-vn/discussions/categories/wiki).)

**What is Ren'Py?**

Ren'Py is a visual novel engine – used by thousands of creators from around the world – that helps you use words, images, and sounds to tell interactive stories that run on computers and mobile devices. These can be both visual novels and life simulation games.

* Programming language: `Ren'Py language`, a programming language that allows you to develop visual novels without much knowledge and very quickly. It is based on Python.
* Canvas library: [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2) is a reimplementation of the Pygame API using SDL2 and related libraries. While in the past it was meant to support multiple applications, it only saw adoption as technology underlying Ren'Py, and is currently being supported for that purpose.
* How does it work: Ren'Py is a complete visual novel engine/framework that takes care of creating a project, executing it, distributing it, and much more.

## Programming language

Ren'Py uses its own language, `Ren'Py language`, which is based on superset of Python. You can use Python statements in Ren'Py language.

Pixi’VN uses JavaScript/TypeScript, which is a very powerful and popular language. To write the narration, you can use JavaScript/Typescript or choose one or more narrative languages ​​from those available.

| Programming language | Ren'Py | Pixi’VN |
|---|---|---|
| Ease of learning | It is intended for people who do not know how to program | You can get started quickly using a template, but as you progress in development and need to integrate new features, you will need to learn some basic skills in JavaScript/TypeScript, NodeJS and npm |
| Is it a typed language? | ❌ (Using Python you can use types, but the Ren'Py compiler does not have type checking. Also, much of the native Ren'Py code does not use types.) | ✅ |
| Can you use the debug? | ❌ | ✅ |
| Package/libraries manager | ❌ | npm |
| Narrative Language | Ren'Py language and Python Statements | JavaScript/TypeScript and various narrative languages ​​(including Ren'Py language) |
| Mini-games implementation  | You can use Ren'Py Creator-Defined Displayables (CDD) | You can use PixiJS or install other libraries |
| UI implementation | You can use Ren'Py screens | You can use PixiJS, React, Vue, Angular, etc. |
| UI components | You can use components provided by Ren'Py. They are usually based on images. | Depending on the UI framework you choose, you can use the component library you prefer. For example Material-UI, Bootstrap, PixiJS UI, etc. |

### Writing the narrative

With Ren'Py, to write the narrative, you need to use the `Ren'Py language`. This language is very simple and easy to learn. It is based on Python and you can use Python statements in Ren'Py language.

With Pixi’VN you can use JavaScript/TypeScript to write the narration. You can also use various narrative languages ​​(potentially you can integrate any narrative language using [PixiVNJson](/other-topics/pixi-vn-json.md)).

Example of Ren'Py:

```renpy [start.rpy]
label start:
    "Hello, world!"
    "This is a Pixi’VN tutorial."
    "I hope you enjoy it!"
```

Example of Pixi’VN:

```typescript [startLabel.ts]
const startLabel = newLabel("start_label_id", [
    (props) => narration.dialogue = "Hello, world!",
    (props) => narration.dialogue = "This is a Pixi’VN tutorial.",
    (props) => narration.dialogue = "I hope you enjoy it!"
])
```

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

### Implementation of minigames

With Ren'Py, for creating minigames with complex mechanics/animations, you need to use the [`Creator-Defined Displayables (CDD)`](https://www.renpy.org/doc/html/cdd.html), this is necessary because otherwise you will have big performance problems. With CDD you can create/control one or more graphic elements through a render loop.
CDD is not very intuitive and complicated to use. There are very few examples and few developers using CDD. In fact, most of the minigames do not have complex logic and animations.

With Pixi’VN, you can use PixiJS to create minigames. PixiJS is a very powerful library that allows you to create complex animations and mechanics. The documentation and examples are very detailed and there are many developers using PixiJS.

You can try some Ren'Py and PIxiJS minigames to understand the difference:

* Ren'Py minigames: <https://itch.io/game-assets/free/tag-minigames/tag-renpy>
* PixiJS minigames: <https://github.com/pixijs/open-games>
* PixiJS tutorials: <https://pixijs.com/8.x/tutorials>

### UI implementation

With Ren'Py, to create the user interface, you need to use `screens` and `styles`. The recommended implementation is to draw a series of images and add them inside the canvas through the graphics components. The graphic components are very few, limiting and not very intuitive.

With Pixi’VN, in addition to being able to use the components of PixiJS, you can also use systems such as React, Vue, Angular, etc. and install component libraries such as Material-UI, Bootstrap, etc. This allows you to create much more complex UI screens with excellent performance.

## Performance and project size

The performance and size of the project are very important factors to consider when choosing a framework.

**Canvas libraries used:**

* [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2): This canvas is absolutely underperforming. You can test this by inserting lots of moving graphics into Ren'Py.
* PixiJS: It is based on more modern systems and has great performance. This can be tested directly from this example:

<sandbox
  template="jrlkrt"
  entry="/src/labels/startLabel.ts"
/>

**UI performance:**

* Ren'Py's UI is based on canvas components that use images within the project.
* With Pixi’VN you can use HTML and/or JavaScript frameworks, known for their performance and usability, or the canvas. HTML/JavaScript components are not necessarily based on images, which leads to a smaller project size.

**Project size:**

* The entire UI of Ren'Py is based on "physical images" and this makes the size of the project very large.
* Since Pixi’VN is a library it does not determine the size of the project, but if you use [vite](https://vitejs.dev/) or other tools, the size of the project will be very light.

## Distribution on multiple devices

Ren'Py framework is directly responsible for distributing the game on various devices.

Pixi’VN does not deal with distributing the project. You can use various frameworks (Tauri, Electron, Cordova, etc...) to distribute the project on various devices. Pixi’VN provides templates that already include the necessary configurations for distribution.

| Distribution on multiple devices | Ren'Py | Pixi’VN |
|---|---|---|
| Ease of use | It's **very simple**. You can use the Ren'Py UI to create the package to distribute | For less experienced users, it **can be difficult** to set up the project so that it can be distributed on multiple devices. Using templates can simplify this step. |
| Package configurations | Essential | Very complete. (You can choose if the package should be installed or run without an installation) |
| Deployment automations with github action or gitlab pipeline | ❌ | ✅ |
| System notification | ❌ | ✅ |
| Use connected devices (Camera, Flashlight etc...) | ❌ | ✅ |
| UI scaling based on device type | ✅ | ✅ |
| UI scaling to fit screen size | ❌ | ✅ |
| Windows/Linux/Mac OS | ✅ (using Ren'Py) | ✅ (using Tauri, Electron, Cordova, etc...) |
| Android/iOS | ✅ (using Ren'Py) | ✅ (using Ionic or Cordova) |
| Web | ✅ (is in beta) | ✅ (is natively supported) |
| Xbox/PlayStation/Nintendo Switch | ✅ (using Sen’py) | Only with Xbox with UWP |

## Development possibilities

Ren'Py is a engine designed only for creating visual novels. Adding complex functionality through Python that goes beyond the development of a normal visual novel is very complicated and is not recommended by the Ren'Py team. It does not have package/library manager.

Pixi’VN is an [npm](https://www.npmjs.com/) library that allows you to create visual novels. So if you want you can use this library in a project that is not natively a visual novel. [npm](https://www.npmjs.com/) is a package manager for JavaScript and the world's largest software registry.

## Longevity and ease of internal development

Ren'Py born in 2004 and is still used today. It is a very stable and mature project.
Ren'Py in addition to including the development of its own library for visual novels also includes the development of `Ren'Py language` and `Pygame_sdl2`. Since Ren'Py also handles the distribution of the project on various devices, it is necessary to keep the system up to date with updates for supported operating systems.

This means that keeping Ren'Py updated is a constant and very complex process that "touches" many types of programming (Parsing, Graphics, etc...).

Pixi’VN was born in 2024. It is a very young project.
Pixi’VN is only a library that uses PixiJS for the canvas. As well as providing functionality for visual novels, it doesn't care about anything else.

This means that keeping Pixi’VN updated is a very simple process and once it reaches a stable version it will not need constant updates to be compatible with the latest devices.

## Conclusion

Finally my personal conclusion is that, if you know object oriented programming and want to create a visual novel with many features, minigames, a very complex UI etc... you should use Pixi’VN. If you are not a programmer, want to create your visual novel quickly and are willing to learn knowledge over time that you can reuse later from this project, forget Ren'Py, use Pixi'VN. If you want a unified framework that takes care of everything without you having to decide which libraries to use, then Pixi'VN is not for you, Ren'Py is a valid option. If you want a no-code framework, currently, neither Ren'Py nor Pixi'VN are for you.
