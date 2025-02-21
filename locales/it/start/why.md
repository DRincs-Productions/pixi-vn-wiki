# Perché Pixi’VN?

Il motivo per cui è nato Pixi’VN è che gli attuali sistemi per la creazione di visual novel si basano su sistemi datati e presentano numerose carenze.

## Che cos'è Pixi’VN?

Pixi’VN è un engine per visual novel/giochi 2D molto versatile e potente. Si basa su JavaScript/TypeScript e utilizza la libreria [PixiJS](https://pixijs.com/) per il rendering.

La sua grande versatilità è dovuta al fatto che Pixi'VN è un pacchetto npm, che fornisce varie funzionalità di base per gestire fasi della storia, dialoghi, personaggi, canvas, archiviazione variabile, salvataggio e caricamento e molto altro. Ciò significa che può essere utilizzato sia per creare visual novel sia per creare altri tipi di giochi 2D (come giochi di avventura punta e clicca, giochi di ruolo, ecc.), con il tuo framework JavaScript preferito (React, Vue, Angular, ecc.).

Pixi’VN provides the ability to use [project templates](/start/getting-started.md#pivivn-templates) to get started quickly. Gli sviluppatori meno esperti possono utilizzare questi templates per creare una visual novel senza avere grandi conoscenze di JavaScript/TypeScript.

You have the option to use various types of narrative languages ​​(in addition to JavaScript/TypeScript). Attualmente è possibile usare le seguenti:

- [_ink_](/ink/ink.md)
- [Ren'Py](/renpy/renpy.md)

## Ren'Py vs Pixi’VN

Making a comparison between Ren'Py and Pixi’VN is necessary because Ren'Py is currently the most widely used engine for creating visual novels.

(Questo confronto è stato effettuato dal team di Pixi'VN, cercando di essere imparziale. Se non sei d'accordo con questo confronto o se ritieni che altre funzionalità dovrebbero essere confrontate, crea una [nuova discussione](https://github.com/DRincs-Productions/pixi-vn/discussions/categories/wiki).)

**Cos'è Ren'Py?**

Ren'Py è un engine di visual novel, utilizzato da migliaia di creatori in tutto il mondo, che ti aiuta a usare parole, immagini e suoni per raccontare storie interattive eseguibili su computer e dispositivi mobili. Possono essere sia visual novel che giochi di simulazione di vita.

- Linguaggio di programmazione: `Ren'Py language`, un linguaggio di programmazione che consente di sviluppare visual novel molto rapidamente e senza grandi conoscenze. È basato su Python.
- Libreria Canvas: [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2) è una reimplementazione dell'API Pygame che utilizza SDL2 e librerie correlate. Sebbene in passato fosse stato concepito per supportare più applicazioni, è stato adottato solo come tecnologia alla base di Ren'Py e attualmente è supportato per quello scopo.
- Come funziona: Ren'Py è un engine/framework completo per visual novel che si occupa della creazione di un progetto, della sua esecuzione, della sua distribuzione e molto altro ancora.

### Linguaggio di programmazione

Ren'Py utilizza un linguaggio proprio, `Ren'Py language`, basato sul superset di Python. È possibile usare istruzioni Python nel linguaggio Ren'Py.

Pixi’VN utilizza JavaScript/TypeScript, un linguaggio molto potente e popolare. To write narrative instead of using a specific language, you can use various narrative languages ​​(with the [PixiVNJson](/other-topics/pixi-vn-json.md)).

| Linguaggio di programmazione   | Ren'Py                                                                                                                                                                                                                               | Pixi’VN                                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ease of learning               | È destinato a persone che non sanno programmare                                                                                                                                                                                      | You can use templates to get started, but as you progress with development you will need basic knowledge of JavaScript/TypeScript, NodeJS and npm                               |
| Is it a typed language?        | ❌ (Utilizzando Python è possibile utilizzare i tipi, ma il compilatore Ren'Py non ha il controllo dei tipi. Inoltre, gran parte del codice nativo di Ren'Py non utilizza i tipi.) | ✅                                                                                                                                                                               |
| Puoi usare il debug?           | ❌                                                                                                                                                                                                                                    | ✅                                                                                                                                                                               |
| Gestore pacchetti/librerie     | ❌                                                                                                                                                                                                                                    | npm                                                                                                                                                                             |
| Linguaggio narrativo           | Linguaggio Ren'Py e istruzioni Python                                                                                                                                                                                                | JavaScript/TypeScript e vari linguaggi narrativi (tra cui il linguaggio Ren'Py)                                                                              |
| Implementazione dei minigiochi | Puoi usare i Creator-Defined Displayables (CDD) di Ren'Py                                                                                                                                                         | Puoi usare PixiJS o installare altre librerie                                                                                                                                   |
| Implementazione dell'UI        | Puoi usare gli screens di Ren'Py                                                                                                                                                                                                     | Puoi usare PixiJS, React, Vue, Angular, ecc.                                                                                                                    |
| Componenti dell'UI             | Puoi utilizzare i componenti forniti da Ren'Py. Di solito si basano su immagini.                                                                                                                     | A seconda del framework UI scelto, puoi utilizzare la libreria di componenti che preferisci. Ad esempio Material-UI, Bootstrap, PixiJS UI, ecc. |

#### Dialogues implementation

In Ren'Py, for creating dialogues, you need to use the `Ren'Py language`. Questo linguaggio è molto semplice e facile da imparare. Si basa su Python ed è possibile utilizzare le istruzioni Python nel linguaggio Ren'Py.

In Pixi’VN, you can use JavaScript/TypeScript to create dialogues. You can also use various narrative languages ​​(potentially you can integrate any narrative language using [PixiVNJson](/other-topics/pixi-vn-json.md)).

Esempio di Ren'Py:

```renpy [start.rpy]
label start:
    "Hello, world!"
    "This is a Pixi’VN tutorial."
    "I hope you enjoy it!"
```

Esempio di Pixi’VN:

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

#### Minigame implementation

In Ren'Py, per creare minigiochi con meccaniche/animazioni complesse, è necessario utilizzare i [`Creator-Defined Displayables (CDD)`](https://www.renpy.org/doc/html/cdd.html), questo è necessario perché altrimenti si verificheranno grossi problemi di prestazioni. Con CDD è possibile creare/controllare uno o più elementi grafici tramite un ciclo di rendering.
Il CDD non è molto intuitivo e complicato da usare. Gli esempi e gli sviluppatori che utilizzano CDD sono molto pochi. Infatti, la maggior parte dei minigiochi non ha una logica e delle animazioni complesse.

In Pixi’VN puoi usare PixiJS per creare minigiochi. PixiJS è una libreria molto potente che consente di creare animazioni e meccaniche complesse. La documentazione e gli esempi sono molto dettagliati e sono molti gli sviluppatori che utilizzano PixiJS.

You can try some Ren'py and PIxiJS minigames to understand the difference:

- Minigiochi di Ren'Py: <https://itch.io/game-assets/free/tag-minigames/tag-renpy>
- Minigiochi PixiJS: <https://github.com/pixijs/open-games>
- Tutorial PixiJS: <https://pixijs.com/8.x/tutorials>

#### Implementazione dell'UI

In Ren'Py, per creare l'interfaccia utente, è necessario creare screens e styles. The most recommended implementation is to create a series of images that are positioned within the canvas across graphic components. The graphic components are very few, limiting and not very intuitive.

In Pixi’VN, oltre a poter utilizzare i componenti di PixiJS, è possibile utilizzare anche sistemi come React, Vue, Angular, ecc. e installare librerie di componenti come Material-UI, Bootstrap, ecc. Ciò consente di creare schermate dell'UI screens molto più complesse con prestazioni eccellenti.

### Prestazioni e dimensioni del progetto

Le prestazioni e le dimensioni del progetto sono fattori molto importanti da considerare quando si sceglie un framework.

**Librerie canvas utilizzate:**

- [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2): Questo canvas è assolutamente poco performante. This can be tested by inserting more moving graphic elements into Ren'py.
- PixiJS: si basa su sistemi più moderni e offre ottime prestazioni. È possibile verificarlo direttamente tramite questo esempio:

<sandbox
template="jrlkrt"
entry="/src/labels/startLabel.ts"
/>

**Prestazioni dell'UI:**

- L'UI di Ren'Py si basa su componenti canvas che utilizzano immagini all'interno del progetto.
- In Pixi’VN you can use HTML and/or JavaScript frameworks, known for their performance and usability, or the canvas. I componenti HTML/JavaScript non sono necessariamente basati su immagini, il che comporta una dimensione del progetto più piccola.

**Dimensioni del progetto:**

- The entire UI of Ren'py is based on "physical images" and this makes the size of the project very large.
- In a Pixi’VN project, you can choose whether and which graphics component library to use the canvas with a "physical images". Being a library it does not determine the size of the project, but if you use [vite](https://vitejs.dev/) or other tools, the size of the project will be very small.

### Device distribution

Il framework Ren'Py è direttamente responsabile della distribuzione del gioco su vari dispositivi.

Pixi’VN does not deal with distributing the project. You can use various frameworks (Tauri, Electron, Cordova, etc...) per distribuire il progetto su diversi dispositivi. Pixi’VN fornisce templates che includono già le configurazioni necessarie per la distribuzione.

| Device Distribution                                                                                                  | Ren'Py                                                                               | Pixi’VN                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Facilità d'uso                                                                                                       | It's **very simple**. You can use an Ren'Py UI to create the package | For less experienced users, it **can be difficult** to set up the project so that it can be distributed on multiple devices. Using templates can simplify this step. |
| Package Configurations                                                                                               | Essential                                                                            | Very complete. (You can choose if the package should be installed and run without an installation)                                                                |
| Deployment automations with github action or gitlab pipeline                                                         | ❌                                                                                    | ✅                                                                                                                                                                                                    |
| System notification                                                                                                  | ❌                                                                                    | ✅                                                                                                                                                                                                    |
| Use connected devices (Camera, Flashlight etc...) | ❌                                                                                    | ✅                                                                                                                                                                                                    |
| UI scaling based on device type                                                                                      | ✅                                                                                    | ✅                                                                                                                                                                                                    |
| UI scaling to fit screen size                                                                                        | ❌                                                                                    | ✅                                                                                                                                                                                                    |
| Windows/Linux/Mac OS                                                                                                 | ✅ (using Ren'Py)                                                  | ✅ (using Tauri, Electron, Cordova, etc...)                                                                                        |
| Android/iOS                                                                                                          | ✅ (using Ren'Py)                                                  | ✅ (using Ionic or Cordova)                                                                                                                                                        |
| Web                                                                                                                  | ✅ (is in beta)                                                    | ✅ (is natively supported)                                                                                                                                                         |
| Xbox/PlayStation/Nintendo Switch                                                                                     | ✅ (using Sen’py)                                                  | Only with Xbox with UWP                                                                                                                                                                              |

### Development possibilities

Ren'Py is a engine designed only for creating visual novels. Adding complex functionality through Python that goes beyond the development of a normal visual novel is very complicated and is not recommended by the Ren'Py team. It does not have package/library manager.

Pixi’VN is an [npm](https://www.npmjs.com/) library that allows you to create visual novels. So if you want you can use this library in a project that is not natively a visual novel. [npm](https://www.npmjs.com/) is a package manager for JavaScript and the world's largest software registry.

### Longevità e facilità di sviluppo interno

Ren'py born in 2004 and is still used today. È un progetto molto stabile e maturo.
Ren'Py, oltre allo sviluppo della propria libreria per le visual novels, include anche lo sviluppo del `linguaggio Ren'Py` e di `Pygame_sdl2`. Furthermore, since it also deals with distributing the project on various devices, this means that Ren'Py must also keep the system updated based on the devices on which it is distributed.

This means that keeping Ren'Py updated is a constant and very complex process that "touches" many types of programming (Parsing, Graphics, etc...).

Pixi’VN born in 2024. It is a very young project.
Pixi’VN is only a library that uses PixiJS for the canvas. As well as providing functionality for visual novels, it doesn't care about anything else.

This means that keeping Pixi’VN updated is a very simple process and once it reaches a stable version it will not need constant updates to be compatible with the latest devices.

### Conclusion

Finally my personal conclusion is that, you know object-oriented programming and you want to create a visual novel with various features (minigames, etc...) you should use Pixi’VN. If you are not a programmer and you want to create a visual novel quickly and easily, you can use Ren'Py.
