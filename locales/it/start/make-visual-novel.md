# Crea la tua prima Visual Novel

Questo tutorial ti guiderà attraverso il processo di creazione della tua prima Visual Novel.

**Cos'è una visual novel?** Una visual novel (VN) è una forma di narrativa interattiva digitale. Le visual novel sono spesso associate al medium dei videogiochi, ma non sempre vengono etichettate come tali. Combinano una narrazione testuale con illustrazioni statiche o animate e un grado variabile di interattività. Il formato è più raramente indicato come novel game, una ritrascrizione del termine wasei-eigo noberu gēmu (ノベルゲーム), che è più spesso usato in giapponese.

A scopo di test, in questa guida ricreeremo la visual novel [Breakdown](https://joshpowlison.itch.io/breakdown) utilizzando Pixi'VN. Breakdown è un racconto breve che ha tutte le caratteristiche che una visual novel dovrebbe avere. Josh Powlison, il creatore di Breakdown, ci ha dato il permesso di utilizzare la sua narrazione per scopi didattici❤️.

Poiché Pixi’VN ti dà la possibilità di scrivere la tua narrazione scegliendo un o più [linguaggio narrative disponibili](/start/narration.md), verranno realizzati esempi per ciascun linguaggio attualmente disponibile in ogni fase di sviluppo.

## Crea un nuovo progetto

Il primo passo è creare un nuovo progetto. Puoi trovare maggiori informazioni su come creare un nuovo progetto partendo da un template [qui](/start/getting-started.md#project-initialization). Utilizzeremo il template "Visual Novel - React".

`Visual Novel -> React`

Una volta completata la creazione, è molto importante leggere il file `README.md` che si trova nella cartella principale del progetto. Questo file contiene informazioni importanti sul progetto e su come utilizzarlo.

Nel nostro caso, per avviare il progetto dovremo semplicemente eseguire i seguenti comandi:

```bash
npm install
npm start
```

## Creazione del personaggio

Adesso definiremo i personaggi di questa storia. Per fare ciò, definiremo nel file `/values/characters.ts` i personaggi che utilizzeremo. Per maggiori informazioni su come creare e utilizzare i personaggi puoi consultare: [Personaggi](/start/character.md)

Cosa significa `mc`? `mc` è un'abbreviazione comune per "Main Character". Nelle visual novel è prassi comune usare `mc` come nome del personaggio principale.

::: code-group

```ts [values/characters.ts]
import { saveCharacter } from "@drincs/pixi-vn";
import Character from "../models/Character";

export const mc = new Character('mc', {
    name: 'Me',
});

export const james = new Character('james', {
    name: 'James',
    color: "#0084ac"
});

export const steph = new Character('steph', {
    name: 'Steph',
    color: "#ac5900"
});

export const sly = new Character('sly', {
    name: 'Sly',
    color: "#6d00ac"
});

saveCharacter([mc, james, steph, sly]);
```

```ts [App.tsx]
// Remember to import the character file at least once into your project. // [!code focus]
import "./values/characters"; // [!code focus]

export default function App() {
return // ...
}
```

:::

## Prima bozza della narrazione

Ora possiamo iniziare a scrivere la "prima bozza" della [narrazione](/start/narration.md) della visual novel.
Creeremo la prima ["label"](/start/labels.md) chiamata `start`, che sarà l'inizio del gioco.

Dopodiché potremo scrivere i [dialoghi](/start/dialogue.md) che seguiranno nella nostra visual novel. Il template che abbiamo scelto supporta il [linguaggio di markup markdown](/start/markup-markdown.md) ([Linguaggio di markup in _ink_](/ink/ink-markup.md)), quindi lo useremo per la nostra narrazione.

<!-- TODO: use Tailwind CSS -->

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
=== start ===
james: You're my roommate's replacement, huh?
james: Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!
mc: ...

He thrusts out his hand.

james: James!
mc: ...Peter.

I take his hand and shake.

james: Ooh, Peter! Nice, firm handshake! The last quy always gave me the dead fish. I already think we'r gonna get along fine.
james: Come on in and...
james: ...
james: I know you're both watching, come on out already!

sly: I just wanted to see what the new guy was like. Hey, you, Peter- be nice to our little brother, or you'll have to deal with *us*.
mc: ...
james: Peter, this is Sly. Yes, that is her real name.

I put out my hand.

sly: I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.
mc: Fair enough, I'm a pretty scary guy, or so l've been told.
james: The redhead behind her is Stephanie.
steph: Hey! Everyone calls me Steph. I'll shake your hand.

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    () => narration.dialogue = { character: james, text: `You're my roommate's replacement, huh?` },
    () => narration.dialogue = { character: james, text: `Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => { narration.dialogue = "He thrusts out his hand." },
    () => narration.dialogue = { character: james, text: `James!` },
    () => narration.dialogue = { character: mc, text: `...Peter.` },
    () => { narration.dialogue = "I take his hand and shake." },
    () => narration.dialogue = { character: james, text: `Ooh, Peter! Nice, firm handshake! The last quy always gave me the dead fish. I already think we'r gonna get along fine.` },
    () => narration.dialogue = { character: james, text: `Come on in and...` },
    () => narration.dialogue = { character: james, text: `...` },
    () => narration.dialogue = { character: james, text: `I know you're both watching, come on out already!` },
    () => narration.dialogue = { character: james, text: `I just wanted to see what the new guy was like. Hey, you, Peter- be nice to our little brother, or you'll have to deal with *us*.` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => narration.dialogue = { character: james, text: `Peter, this is Sly. Yes, that is her real name.` },
    () => { narration.dialogue = "I put out my hand." },
    () => narration.dialogue = { character: james, text: `I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.` },
    () => narration.dialogue = { character: mc, text: `Fair enough, I'm a pretty scary guy, or so l've been told.` },
    () => narration.dialogue = { character: james, text: `The redhead behind her is Stephanie.` },
    () => narration.dialogue = { character: steph, text: `Hey! Everyone calls me Steph. I'll shake your hand.` },
    // ...
]);
export default startLabel;
```

:::

### Dividi la narrazione in più label

Non è consigliabile creare label molto lunghe (anche per visual novel lineari), ma è consigliabile creare più label piccole e "chiamarle" quando necessario con le [funzionalità di controllo del flusso di gioco](/start/labels-flow.md) ([_ink_ knot (o label)](/ink/ink-label.md)).

Per questo motivo, anche se nel nostro caso la nostra storia è lineare, verrà divisa in due etichette, la prima sarà quella che abbiamo appena creato, mentre la seconda si chiamerà `second_part`.

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
=== start ===
james: You're my roommate's replacement, huh?
james: Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!
mc: ...

He thrusts out his hand.

james: James!
mc: ...Peter.

// ...
-> second_part

=== second_part ===

She enters my room before I'VE even had a chance to. \\n\\n...I could've just come back and gotten the platter later...
She sets it on a desk. I throw my two paper bags down beside the empty bed.

steph: They got you a new mattress, right? That last guy was a druggie, did James tell you that?
sly: *We're* the reason he got expelled!
steph: Sly! If word gets out about that... well, actually, it wouldn't matter, *he's* the one who shot himself up.

I'm fumbling for a new subject.

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    () => narration.dialogue = { character: james, text: `You're my roommate's replacement, huh?` },
    () => narration.dialogue = { character: james, text: `Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you' fine!` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => { narration.dialogue = "He thrusts out his hand." },
    () => narration.dialogue = { character: james, text: `James!` },
    () => narration.dialogue = { character: mc, text: `...Peter.` },
    // ...
    async (props) => await narration.jumpLabel(secondPart, props),
]);
export default startLabel;

const secondPart = newLabel("second_part", [
    () => { narration.dialogue = `She enters my room before I'VE even had a chance to. \n\n...I could've just come back and gotten the platter later...` },
    () => { narration.dialogue = `She sets it on a desk. I throw my two paper bags down beside the empty bed.` },
    () => narration.dialogue = { character: steph, text: `They got you a new mattress, right? That last guy was a druggie, did James tell you that?` },
    () => narration.dialogue = { character: sly, text: `*We're* the reason he got expelled!` },
    () => narration.dialogue = { character: steph, text: `Sly! If word gets out about that... well, actually, it wouldn't matter, *he's* the one who shot himself up.` },
    () => { narration.dialogue = `I'm fumbling for a new subject.` },
    // ...
]);
```

:::

## Menù a scelta

Ora chiederemo al giocatore se desidera continuare con la seconda parte della visual novel.

Per fare ciò, utilizzeremo il [menu di scelta](/start/choices.md).

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
=== start ===
// ...

You want continue to the next part?
* Yes, I want to continue
-> second_part
* No, I want to stop here
-> END

=== second_part ===

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    // ...
    async () => {
        narration.dialogue = `You want continue to the next part?`
        narration.choiceMenuOptions = [
            new ChoiceMenuOption("Yes, I want to continue", secondPart, {}, { type: "jump" }),
            new ChoiceMenuOptionClose("No, I want to stop here"),
        ]
    },
]);
export default startLabel;

const secondPart = newLabel("second_part", [
    // ...
]);
```

:::

## Modifica le informazioni del personaggio e usalo come variabile

Ora darò al giocatore la possibilità di cambiare il nome del `mc`.

Per fare ciò, chiederò al giocatore di [completare una casella di input utilizzando le funzionalità di Pixi'VN](/start/input.md) ([Utilizzare il prompt di input in _ink_](/ink/ink-input.md)).

Dopo aver ottenuto il valore di input, puoi [impostare il nome del personaggio](/start/character.md#edit-characters-in-the-game) utilizzando il valore ottenuto ([Modifica il nome del personaggio in _ink_](/ink/ink-character.md#edit-character-name-in-dialogues)).

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
VAR _input_value_ = ""

=== start ===
// ...

He thrusts out his hand.
# request input type string default Peter
What is your name?
# rename mc { _input_value_ }

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    // ...
    () => { narration.dialogue = `He thrusts out his hand.` },
    () => {
        narration.requestInput({ type: "string" }, "Peter")
        narration.dialogue = `What is your name?`
    },
    () => {
        mc.name = narration.inputValue as string
    },
    // ...
]);
export default startLabel;
```

:::

Ora potremmo usare i nomi dei personaggi nei dialoghi ([Usa il nome del personaggio nei dialoghi in _ink_](/ink/ink-character.md#use-character-name-in-dialogues)).

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
VAR steph_fullname = "Stephanie"

=== start ===
// ...

sly: I just wanted to see what the new guy was like. Hey, you, [mc]- be nice to our little brother, or you'll have to deal with *us*.
mc: ...
james: [mc], this is [sly]. Yes, that is her real name.

I put out my hand.

sly: I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.
mc: Fair enough, I'm a pretty scary guy, or so l've been told.
james: The redhead behind her is [steph_fullname].
steph: Hey! Everyone calls me [steph]. I'll shake your hand.

She puts out her hand, and I take it.

mc: Thanks, good to meet you, [steph_fullname].
steph: WOW, that is, like, the most perfect handshake I've ever had! Firm, but also gentle. [sly], you *gotta* shake his hand!

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const steph_fullname = "Stephanie";

const startLabel = newLabel("start", [
    // ...
    () => narration.dialogue = { character: sly, text: `I just wanted to see what the new guy was like. Hey, you, ${mc.name}- be nice to our little brother, or you'll have to deal with *us*.` },
    () => narration.dialogue = { character: mc, text: `...` },
    () => narration.dialogue = { character: james, text: `${mc.name}, this is ${sly.name}. Yes, that is her real name.` },
    () => { narration.dialogue = `I put out my hand.` },
    () => narration.dialogue = { character: sly, text: `I'm not shakin' your hand until I decide you're an all-right dude. Sorry, policy.` },
    () => narration.dialogue = { character: mc, text: `Fair enough, I'm a pretty scary guy, or so I've been told.` },
    () => narration.dialogue = { character: james, text: `The redhead behind her is ${steph_fullname}.` },
    () => narration.dialogue = { character: steph, text: `Hey! Everyone calls me ${steph.name}. I'll shake your hand.` },
    () => { narration.dialogue = `She puts out her hand, and I take it.` },
    () => narration.dialogue = { character: mc, text: `Thanks, good to meet you, ${steph_fullname}.` },
    () => narration.dialogue = { character: steph, text: `WOW, that is, like, the most perfect handshake I've ever had! Firm, but also gentle. ${sly.name}, you *gotta* shake his hand!` },
    // ...
]);
export default startLabel;
```

:::

## Utilizzare la funzionalità "glue" dei dialoghi

Nelle visual novel è spesso utile incollare del testo nel dialogo corrente. Ad esempio, per mettere in pausa una conversazione e farla proseguire in uno step successivo. Per farlo, possiamo usare la [funzionalità glue](/start/dialogue.md#dialogue-glue).

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
=== start ===
// ...

james: Ooh, [mc]! Nice, firm handshake!
<> The last guy always gave me the dead fish.
<> I already think we're gonna get along fine.
james: Come on in and...

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    // ...
    async () => narration.dialogue = { character: james, text: `Ooh, ${mc.name}! Nice, firm handshake!` },
    async () => {
        narration.dialogGlue = true
        narration.dialogue = ` The last guy always gave me the dead fish.`
    },
    async () => {
        narration.dialogGlue = true
        narration.dialogue = ` I already think we're gonna get along fine.`
    },
    async () => narration.dialogue = { character: james, text: `Come on in and...` },
    // ...
]);
export default startLabel;
```

:::

## Definisci le assets e caricale

Uno dei primi passi è scegliere dove salvare le risorse della tua visual novel. In questo caso salveremo gli assets nello storage Firebase (un servizio di hosting).

Prima di utilizzare una assets, si consiglia vivamente di [inizializzare la matrice delle risorse](/start/assets-management.md#initialize-the-asset-matrix-at-project-start).

Questo è l'esempio:

```ts [assets/defineAssets.ts]
import { Assets } from "@drincs/pixi-vn"

/**
 * Define all the assets that will be used in the game.
 * This function will be called before the game starts.
 * You can read more about assets management in the documentation: https://pixi-vn.web.app/start/assets-management.html
 */
export async function defineAssets() {
    // backgrounds
    Assets.add({ alias: 'background_main_menu', src: "https://andreannaking.com/wp-content/uploads/2021/12/Download-Beautiful-Nature-Landscape-Hd-Wallpaper-Full-HD-Wallpapers.jpg" })
    Assets.add({ alias: 'bg01-hallway', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fbg01-hallway.webp?alt=media" })
    Assets.add({ alias: 'bg02-dorm', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fbg02-dorm.webp?alt=media" })
    // female character 01
    Assets.add({ alias: 'fm01-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-body.webp?alt=media" })
    Assets.add({ alias: 'fm01-eyes-grin', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-eyes-grin.webp?alt=media" })
    Assets.add({ alias: 'fm01-eyes-smile', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm01%2Ffm01-eyes-smile.webp?alt=media" })
    // ...
    // female character 02
    Assets.add({ alias: 'fm02-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm02%2Ffm02-body.webp?alt=media" })
    Assets.add({ alias: 'fm02-eyes-bawl', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm02%2Ffm02-eyes-bawl.webp?alt=media" })
    Assets.add({ alias: 'fm02-eyes-joy', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Ffm02%2Ffm02-eyes-joy.webp?alt=media" })
    // ...
    // male character 01
    Assets.add({ alias: 'm01-body', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-body.webp?alt=media" })
    Assets.add({ alias: 'm01-eyes-annoy', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-annoy.webp?alt=media" })
    Assets.add({ alias: 'm01-eyes-concern', src: "https://firebasestorage.googleapis.com/v0/b/pixi-vn.appspot.com/o/public%2Fbreakdown%2Fm01%2Fm01-eyes-concern.webp?alt=media" })
    // ...

    // The game will not start until these assets are loaded.
    await Assets.load('background_main_menu')

    // The game will start immediately, but these assets will be loaded in the background.
    // Assets.load('flowerTop')
}
```

## Aggiungere lo sfondo e le immagini dei personaggi

Ora è il momento di pensare anche all'aspetto visivo. Aggiungeremo lo sfondo e gli sprite dei personaggi al canvas della visual novel.

**Cos'è uno sprite?** In computer grafica, uno sprite è una bitmap bidimensionale integrata in una scena più grande, il più delle volte in un videogioco 2D.

Nel nostro caso gli sprite dei personaggi sono composti da 3 immagini: il corpo, gli occhi e la bocca. Quindi utilizziamo [ImageContainer](/start/canvas-image-container.md) per comporre il personaggio.

Puoi trovare maggiori informazioni su come aggiungere componenti canvas in [questa documentazione](/start/canvas-components.md) ([Utilizza componenti canvas in _ink_](/ink/ink-canvas.md)).

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
=== start ===
# show image bg bg01-hallway
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1
james: You're my roommate's replacement, huh?
# show imagecontainer james [m01-body m01-eyes-grin m01-mouth-smile01]
james: Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you'll be fine!
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-grin00]
mc: ...

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    async () => {
        await showImage("bg", "bg01-hallway");
        await showImageContainer("james", ["m01-body", "m01-eyes-smile", "m01-mouth-neutral01"], { xAlign: 0.5, yAlign: 1 });
        narration.dialogue = { character: james, text: `You're my roommate's replacement, huh?` }
    },
    async () => {
        await showImageContainer("james", ["m01-body", "m01-eyes-grin", "m01-mouth-smile01"])
        narration.dialogue = { character: james, text: `Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you'll be fine!` }
    },
    async () => {
        await showImageContainer("james", ["m01-body", "m01-eyes-smile", "m01-mouth-grin00"])
        narration.dialogue = { character: mc, text: `...` }
    },
    // ...
]);
export default startLabel;
```

:::

## Caricamento intelligente degli assets

Nel nostro caso abbiamo salvato le immagini del gioco su un servizio di hosting (Firebase). Per questo motivo il caricamento delle risorse non avviene tempestivamente.

Per evitare che il giocatore percepisca troppi caricamenti, dovremmo raggrupparli in determinate fasi del gioco. Nel mio caso caricherò le immagini più utilizzate all'inizio della label.

Puoi trovare maggiori informazioni su come gestire i caricamenti [qui](/start/assets-management.md).

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
=== start ===
# load assets bg01-hallway
# load assets m01-body m01-eyes-grin m01-eyes-smile m01-eyes-wow m01-mouth-grin00 m01-mouth-smile00 m01-mouth-smile01
# load assets fm01-body fm01-eyes-smile fm01-eyes-upset fm01-mouth-serious00 fm01-mouth-serious01 fm01-mouth-smile00
# load assets fm02-body fm02-eyes-joy fm02-eyes-nervous fm02-eyes-wow fm02-mouth-nervous00 fm02-mouth-smile00

# show image bg bg01-hallway
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1 with movein direction right speed 300
james: You're my roommate's replacement, huh?
# show imagecontainer james [m01-body m01-eyes-grin m01-mouth-smile01]
james: Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you'll be fine!
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-grin00]
mc: ...

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    // ...
], {
    onLoadingLabel: () => {
        Assets.load([
            "bg01-hallway",
            "m01-body", "m01-eyes-grin", "m01-eyes-smile", "m01-eyes-wow", "m01-mouth-grin00", "m01-mouth-smile00", "m01-mouth-smile01",
            "fm01-body", "fm01-eyes-smile", "fm01-eyes-upset", "fm01-mouth-serious00", "fm01-mouth-serious01", "fm01-mouth-smile00",
            "fm02-body", "fm02-eyes-joy", "fm02-eyes-nervous", "fm02-eyes-wow", "fm02-mouth-nervous00", "fm02-mouth-smile00",
        ])
    }
});
export default startLabel;
```

:::

## Utilizzare le transizioni

Per rendere più dinamica la visual novel, è possibile utilizzare le transizioni per mostrare le immagini. Puoi trovare maggiori informazioni sull'utilizzo delle transizioni [qui](/start/canvas-transition.md) ([Utilizzo delle transizioni in _ink_](/ink/ink-canvas.md#show-a-canvas-component-with-transition-in-ink)).

Questo è l'esempio:

::: code-group

```ink [ink/start.ink]
=== start ===
// ...

# show image bg bg01-hallway
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-neutral01] xAlign 0.5 yAlign 1 with movein direction right speed 300
james: You're my roommate's replacement, huh?
# show imagecontainer james [m01-body m01-eyes-grin m01-mouth-smile01]
james: Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you'll be fine!
# show imagecontainer james [m01-body m01-eyes-smile m01-mouth-grin00]
mc: ...

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    async () => {
        await showImage("bg", "bg01-hallway");
        await moveIn("james", {
            value: ["m01-body", "m01-eyes-smile", "m01-mouth-neutral01"],
            options: { xAlign: 0.5, yAlign: 1 }
        }, { direction: "right", speed: 300 })
        narration.dialogue = { character: james, text: `You're my roommate's replacement, huh?` }
    },
    async () => {
        await showImageContainer("james", ["m01-body", "m01-eyes-grin", "m01-mouth-smile01"])
        narration.dialogue = { character: james, text: `Don't worry, you don't have much to live up to. Just don't use heroin like the last guy, and you'll be fine!` }
    },
    async () => {
        await showImageContainer("james", ["m01-body", "m01-eyes-smile", "m01-mouth-grin00"])
        narration.dialogue = { character: mc, text: `...` }
    },
    // ...
]);
export default startLabel;
```

:::

## Creare un'animazione

Per rendere più dinamica la visual novel, è possibile utilizzare le animazioni. Puoi trovare maggiori informazioni su come utilizzare le animazioni [qui](/start/canvas-animations-effects.md) ([Utilizzo delle animazioni in _ink_](/ink/ink-canvas.md#use-the-effects-in-ink)).

Consiglio di utilizzare Typescript se è necessario impostare molte proprietà, in questo modo si ha un maggiore controllo sull'animazione, più funzionalità e feedback sul tipo.

Nel mio caso l'animazione rimuoverà Steph dalla scena e la reinserirà nel passaggio successivo. La specchierò anche sull'asse x per assicurarmi che sia rivolta nella direzione giusta.

Per far entrare/uscire Steph userò le funzioni `moveOut` e `moveIn`. Per l'effetto specchio userò il ticker `ZoomTicker`.

Una caratteristica importante delle transizioni è che mettono momentaneamente in pausa tutte le animazioni collegate a quel componente e le riprendono al termine della transizione.

Quindi, nel mio caso, userò prima della funzione `moveIn` la funzione `addTicker` per aggiungere il ticker `ZoomTicker`. In questo modo Steph verrà specchiato sull'asse x una volta completata la transizione.

Inoltre, poiché per questa animazione utilizzerò TypeScript, ho creato un'label per questa animazione. In modo che possa essere chiamato anche da altri linguaggi che non siano JS/TS.

```ts [labels/animation01.ts]
import { canvas, moveIn, newLabel, ZoomTicker } from "@drincs/pixi-vn";

export const animation01 = newLabel("animation_01", [
    async () => {
        canvas.addTicker(
            "steph",
            new ZoomTicker({ type: "zoom", limit: 1, speed: 70 })
        );

        await moveIn("steph", {
                value: ["fm02-body", "fm02-eyes-joy", "fm02-mouth-smile01"],
                options: { xAlign: 0.8, yAlign: 1, scale: { y: 1, x: -1 }, anchor: 0.5 },
            }, { direction: "right", speed: 300 }
        );
    },
]);
```

Ora posso chiamare questa etichetta `animation_01` dall'etichetta principale `start`. (Come spiegato [qui](/ink/ink-label.md#use-the-call-script) da _ink_ posso chiamare le etichette scritte in ts e viceversa.)

::: code-group

```ink [ink/start.ink]
=== start ===
// ...

# show imagecontainer james [m01-body m01-eyes-grin m01-mouth-grin00]
# show imagecontainer sly [fm01-body fm01-eyes-smile fm01-mouth-smile00]
# show imagecontainer steph [fm02-body fm02-eyes-upset fm02-mouth-nervous00]
# remove image steph with moveout direction left speed 300
[steph_fullname] goes through the opposite door,
# call animation_01
<> and returns with a HUGE tinfoil-covered platter.

// ...
-> DONE
```

```ts [labels/startLabel.ts]
const startLabel = newLabel("start", [
    // ...
    async () => {
        await showImageContainer("james", ["m01-body", "m01-eyes-grin", "m01-mouth-grin00"]);
        await showImageContainer("sly", ["fm01-body", "fm01-eyes-smile", "fm01-mouth-smile00"]);
        await showImageContainer("steph", ["fm02-body", "fm02-eyes-upset", "fm02-mouth-nervous00"]);
        moveOut("steph", { direction: "left", speed: 300 });
        narration.dialogue = `${steph_fullname} goes through the opposite door,`;
    },
    async (props) => {
        narration.dialogGlue = true;
        narration.dialogue = ` and returns with a HUGE tinfoil-covered platter.`;
        await narration.callLabel(animation01, props);
    },
    // ...
]);
export default startLabel;
```

:::

<!-- ## Use animations and effects or create your ticker

This page is under construction.

:::tabs

== ink example

```ink
```

== Typescript example

```ts
```

:::

## Add music and sound effects

This page is under construction.

:::tabs

== ink example

```ink
```

== Typescript example

```ts
```

::: -->

## Conclusione

Bene, ora sai come creare una visual novel con Pixi'VN. Da un grande potere derivano grandi responsabilità, quindi usalo saggiamente e crea una grande storia! 🚀

Here is an interactive example with a minimal UI (HTML). Scrolling down you can see the same result using a complete UI (React template).

:::tabs

\== ink example

::: sandbox {template=2r5f6v entry=/src/ink/start.ink}

\== Typescript example

::: sandbox {template=zfxsqq entry=/src/labels/startLabel.ts}

:::

<iframe src="https://pixi-vn-react-template.web.app/"
    title="Visual Novel - React"
    style="width:100%; height:400px; border:0; border-radius:4px; overflow:hidden;"
></iframe>
