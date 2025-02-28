# Ren'Py vs Pixi’VN

È necessario fare un paragone tra Ren'Py e Pixi'VN perché Ren'Py è attualmente il motore più utilizzato per la creazione di visual novel.

(Questo confronto è stato effettuato dal team di Pixi'VN, cercando di essere imparziale. Se non sei d'accordo con questo confronto o se ritieni che altre funzionalità dovrebbero essere confrontate, crea una [nuova discussione](https://github.com/DRincs-Productions/pixi-vn/discussions/categories/wiki).)

**Cos'è Ren'Py?**

Ren'Py è un engine di visual novel, utilizzato da migliaia di creatori in tutto il mondo, che ti aiuta a usare parole, immagini e suoni per raccontare storie interattive eseguibili su computer e dispositivi mobili. Possono essere sia visual novel che giochi di simulazione di vita.

- Linguaggio di programmazione: `Ren'Py language`, un linguaggio di programmazione che consente di sviluppare visual novel molto rapidamente e senza grandi conoscenze. È basato su Python.
- Libreria Canvas: [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2) è una reimplementazione dell'API Pygame che utilizza SDL2 e librerie correlate. Sebbene in passato fosse stato concepito per supportare più applicazioni, è stato adottato solo come tecnologia alla base di Ren'Py e attualmente è supportato per quello scopo.
- Come funziona: Ren'Py è un engine/framework completo per visual novel che si occupa della creazione di un progetto, della sua esecuzione, della sua distribuzione e molto altro ancora.

## Linguaggio di programmazione

Ren'Py utilizza un linguaggio proprio, `Ren'Py language`, basato sul superset di Python. È possibile usare istruzioni Python nel linguaggio Ren'Py.

Pixi’VN utilizza JavaScript/TypeScript, un linguaggio molto potente e popolare. Per scrivere la narrazione puoi usare JavaScript/Typescript oppure scegliere uno o più linguaggi narrativi tra quelli disponibili.

| Linguaggio di programmazione   | Ren'Py                                                                                                                                                                                                                               | Pixi’VN                                                                                                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Facilità di apprendimento      | È destinato a persone che non sanno programmare                                                                                                                                                                                      | Puoi iniziare rapidamente utilizzando un template, ma man mano che avanzi nello sviluppo e hai bisogno di integrare nuove funzionalità, dovrai apprendere alcune competenze di base in JavaScript/TypeScript, NodeJS e npm |
| È un linguaggio tipizzato?     | ❌ (Utilizzando Python è possibile utilizzare i tipi, ma il compilatore Ren'Py non ha il controllo dei tipi. Inoltre, gran parte del codice nativo di Ren'Py non utilizza i tipi.) | ✅                                                                                                                                                                                                                          |
| Puoi usare il debug?           | ❌                                                                                                                                                                                                                                    | ✅                                                                                                                                                                                                                          |
| Gestore pacchetti/librerie     | ❌                                                                                                                                                                                                                                    | npm                                                                                                                                                                                                                        |
| Linguaggio narrativo           | Linguaggio Ren'Py e istruzioni Python                                                                                                                                                                                                | JavaScript/TypeScript e vari linguaggi narrativi (tra cui il linguaggio Ren'Py)                                                                                                                         |
| Implementazione dei minigiochi | Puoi usare i Creator-Defined Displayables (CDD) di Ren'Py                                                                                                                                                         | Puoi usare PixiJS o installare altre librerie                                                                                                                                                                              |
| Implementazione dell'UI        | Puoi usare gli screens di Ren'Py                                                                                                                                                                                                     | Puoi usare PixiJS, React, Vue, Angular, ecc.                                                                                                                                                               |
| Componenti dell'UI             | Puoi utilizzare i componenti forniti da Ren'Py. Di solito si basano su immagini.                                                                                                                     | A seconda del framework UI scelto, puoi utilizzare la libreria di componenti che preferisci. Ad esempio Material-UI, Bootstrap, PixiJS UI, ecc.                                            |

### Scrittura del racconto

Con Ren'Py, per scrivere la narrazione, è necessario utilizzare il `linguaggio Ren'Py`. Questo linguaggio è molto semplice e facile da imparare. Si basa su Python ed è possibile utilizzare le istruzioni Python nel linguaggio Ren'Py.

Con Pixi’VN puoi usare JavaScript/TypeScript per scrivere la narrazione. È inoltre possibile utilizzare diversi linguaggi narrativi (potenzialmente si può integrare qualsiasi linguaggio narrativo utilizzando [PixiVNJson](/other-topics/pixi-vn-json.md)).

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

### Implementazione di minigiochi

Con Ren'Py, per creare minigiochi con meccaniche/animazioni complesse, è necessario utilizzare i [`Creator-Defined Displayables (CDD)`](https://www.renpy.org/doc/html/cdd.html), questo è necessario perché altrimenti si verificheranno grossi problemi di prestazioni. Con CDD è possibile creare/controllare uno o più elementi grafici tramite un ciclo di rendering.
Il CDD non è molto intuitivo e complicato da usare. Gli esempi e gli sviluppatori che utilizzano CDD sono molto pochi. Infatti, la maggior parte dei minigiochi non ha una logica e delle animazioni complesse.

Con Pixi’VN puoi usare PixiJS per creare minigiochi. PixiJS è una libreria molto potente che consente di creare animazioni e meccaniche complesse. La documentazione e gli esempi sono molto dettagliati e sono molti gli sviluppatori che utilizzano PixiJS.

Puoi provare alcuni minigiochi Ren'py e PIxiJS per capire la differenza:

- Minigiochi di Ren'Py: <https://itch.io/game-assets/free/tag-minigames/tag-renpy>
- Minigiochi PixiJS: <https://github.com/pixijs/open-games>
- Tutorial PixiJS: <https://pixijs.com/8.x/tutorials>

### Implementazione dell'UI

Con Ren'Py, per creare l'interfaccia utente, è necessario utilizzare `screens` e `styles`. L'implementazione consigliata è quella di disegnare una serie di immagini e aggiungerle all'interno del canvas tramite componenti grafici. I componenti grafici sono molto pochi, limitanti e poco intuitivi.

Con Pixi’VN, oltre a poter utilizzare i componenti di PixiJS, è possibile utilizzare anche sistemi come React, Vue, Angular, ecc. e installare librerie di componenti come Material-UI, Bootstrap, ecc. Ciò consente di creare schermate dell'UI screens molto più complesse con prestazioni eccellenti.

## Prestazioni e dimensioni del progetto

Le prestazioni e le dimensioni del progetto sono fattori molto importanti da considerare quando si sceglie un framework.

**Librerie canvas utilizzate:**

- [`Pygame_sdl2`](https://github.com/renpy/pygame_sdl2): Questo canvas è assolutamente poco performante. Puoi testarlo inserendo un sacco di elementi grafici in movimento in Ren'py.
- PixiJS: si basa su sistemi più moderni e offre ottime prestazioni. È possibile verificarlo direttamente tramite questo esempio:

<sandbox
template="jrlkrt"
entry="/src/labels/startLabel.ts"
/>

**Prestazioni dell'UI:**

- L'UI di Ren'Py si basa su componenti canvas che utilizzano immagini all'interno del progetto.
- Con Pixi’VN puoi utilizzare frameworks HTML e/o JavaScript, noti per le loro prestazioni e usabilità, oppure il canvas. I componenti HTML/JavaScript non sono necessariamente basati su immagini, il che comporta una dimensione del progetto più piccola.

**Dimensioni del progetto:**

- L'intera interfaccia utente di Ren'py è basata su "immagini fisiche" e questo rende le dimensioni del progetto molto grandi.
- Poiché Pixi'VN è una libreria, non determina la dimensione del progetto, ma se si utilizza [vite](https://vitejs.dev/) o altri strumenti, la dimensione del progetto sarà molto ridotta.

## Distribuzione su più dispositivi

Il framework Ren'Py è direttamente responsabile della distribuzione del gioco su vari dispositivi.

Pixi’VN non si occupa della distribuzione del progetto. È possibile utilizzare vari framework (Tauri, Electron, Cordova, ecc...) per distribuire il progetto su diversi dispositivi. Pixi’VN fornisce templates che includono già le configurazioni necessarie per la distribuzione.

| Distribuzione su più dispositivi                                                              | Ren'Py                                                                                              | Pixi’VN                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Facilità d'uso                                                                                | È **molto semplice**. You can use the Ren'Py UI to create the package to distribute | Per gli utenti meno esperti, **può risultare difficile** impostare il progetto in modo che possa essere distribuito su più dispositivi. L'utilizzo di templates può semplificare questo passaggio. |
| Configurazioni del pacchetto                                                                  | Essenziale                                                                                          | Molto completo. (Puoi scegliere se il pacchetto deve essere installato o eseguito senza installazione)                                                                                          |
| Automazioni di distribuzione con github action o gitlab pipeline                              | ❌                                                                                                   | ✅                                                                                                                                                                                                                                  |
| Notifica di sistema                                                                           | ❌                                                                                                   | ✅                                                                                                                                                                                                                                  |
| Utilizzare dispositivi connessi (fotocamera, torcia, ecc.) | ❌                                                                                                   | ✅                                                                                                                                                                                                                                  |
| Ridimensionamento dell'UI in base al tipo di dispositivo                                      | ✅                                                                                                   | ✅                                                                                                                                                                                                                                  |
| Ridimensionamento dell'UI in base al tipo di dispositivo                                      | ❌                                                                                                   | ✅                                                                                                                                                                                                                                  |
| Windows/Linux/Mac OS                                                                          | ✅ (usando Ren'Py)                                                                | ✅ (utilizzando Tauri, Electron, Cordova, ecc...)                                                                                                                |
| Android/iOS                                                                                   | ✅ (usando Ren'Py)                                                                | ✅ (utilizzando Ionic o Cordova)                                                                                                                                                                                 |
| Web                                                                                           | ✅ (è in versione beta)                                                           | ✅ (è supportato nativamente)                                                                                                                                                                                    |
| Xbox/PlayStation/Nintendo Switch                                                              | ✅ (usando Sen'py)                                                                | Solo con Xbox con UWP                                                                                                                                                                                                              |

## Development possibilities

Ren'Py è un motore progettato esclusivamente per la creazione di visual novel. Aggiungere funzionalità complesse tramite Python che vadano oltre lo sviluppo di una normale visual novel è molto complicato e non è consigliato dal team di Ren'Py. Non ha un gestore di package/librerie.

Pixi’VN è una libreria [npm](https://www.npmjs.com/) che consente di creare romanzi visivi. Quindi, se vuoi, puoi usare questa libreria in un progetto che non sia nativamente una visual novel. [npm](https://www.npmjs.com/) è un gestore di pacchetti per JavaScript e il più grande registro software al mondo.

## Longevità e facilità di sviluppo interno

Ren'py è nato nel 2004 ed è ancora utilizzato oggi. È un progetto molto stabile e maturo.
Ren'Py, oltre allo sviluppo della propria libreria per le visual novels, include anche lo sviluppo del `linguaggio Ren'Py` e di `Pygame_sdl2`. Since Ren'Py also handles the distribution of the project on various devices, it is necessary to keep the system up to date with updates for supported operating systems.

Ciò significa che mantenere aggiornato Ren'Py è un processo costante e molto complesso che "tocca" molti tipi di programmazione (Parsing, Grafica, ecc...).

Pixi’VN was born in 2024. È un progetto molto giovane.
Pixi’VN è solo una libreria che utilizza PixiJS per il canvas. Oltre a fornire funzionalità per le visual novel, non gli importa di nient'altro.

Ciò significa che mantenere Pixi’VN aggiornato è un processo molto semplice e una volta che raggiungerà una versione stabile non avrà bisogno di aggiornamenti costanti per essere compatibile con i dispositivi più recenti.

## Conclusion

Infine, la mia conclusione personale è che se conosci la programmazione orientata agli oggetti e vuoi creare una visual novel con molte funzionalità, minigiochi, un'interfaccia utente molto complessa, ecc... dovresti usare Pixi'VN. If you are not a programmer, want to create your visual novel quickly and are willing to learn knowledge over time that you can reuse later from this project, forget Ren'Py, use Pixi'VN. If you want a unified framework that takes care of everything without you having to decide which libraries to use, then Pixi'VN is not for you, Ren'Py is a valid option. If you want a no-code framework, currently, neither Ren'Py nor Pixi'VN are for you.
