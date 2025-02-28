# Make your first Visual Novel

This tutorial will guide you through the process of creating your first Visual Novel.

**What is a Visual Novel?** A visual novel (VN) is a form of digital interactive fiction. Visual novels are often associated with the medium of video games, but are not always labeled as such themselves. They combine a textual narrative with static or animated illustrations and a varying degree of interactivity. The format is more rarely referred to as novel game, a retranscription of the wasei-eigo term noberu gēmu (ノベルゲーム), which is more often used in Japanese.

For testing purposes, in this guide we will be recreating the visual novel [Breakdown](https://joshpowlison.itch.io/breakdown) using Pixi'VN. Breakdown is a short story that has all the features that a visual novel should have. Josh Powlison, the creator of Breakdown, has given us permission to use his narration for educational purposes❤️.

Since Pixi’VN gives you the ability to write your own narration by choosing one or more [available narrative languages](/start/narration.md), examples will be made for each currently available language at each development step.

## Create a new project

The first step is to create a new project. You can find more information on how to create a new project starting from a template [here](/start/getting-started.md#project-initialization). We will use the template "Visual Novel - React".

`Visual Novel -> React`

After the creation is complete, it is very important to read the `README.md` file that is in the root of the project. This file contains important information about the project and how to use it.

In our case, to start the project we will simply need to execute the following commands:

```bash
npm install
npm start
```

## Character creation

Now we will define the characters of this story. To do this, we will define in the `/values/characters.ts` file the characters that we will be using. For more information on how to create and use characters you can consult: [Characters](/start/character.md)

What does `mc` mean? `mc` is a common abbreviation for "Main Character". It is a common practice in visual novels to use `mc` as the main character's name.

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

## First draft of the narrative

Now we can start writing the "first draft" of the [narration](/start/narration.md) of the visual novel.
We will create the first ["label"](/start/labels.md) called `start`, which will be the beginning of the game.

After that we can write the [dialogues](/start/dialogue.md) that will follow in our visual novel. The template we have chosen supports the [markup language markdown](/start/markup-markdown.md) ([Markup language in _ink_](/ink/ink-markup.md)) so we will use it for our narration.

This is the example:

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

### Split the narrative into labels

It is not recommended to create very long labels (even for linear visual novels), but it is recommended to create many small labels and open them as needed with pixi's [features to control the flow of the game](/start/labels-flow.md) ([_ink_ knot (or label)](/ink/ink-label.md)).

For this reason, even if in our case our story is linear, it will be divided into two labels, the first will be the one we just created, while the second will be called `second_part`.

This is the example:

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

## Choice menus

Now we will ask the player if he wants to continue with the second part of the visual novel, in the last `start` step.

To do this, we will use the [choice menu](/start/choices.md).

This is the example:

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

## Edit character information and use it as a variable

Now I will give the player the ability to change the name of the `mc`.

To do this, I will ask the player to [complete an input box using Pixi'VN's features](/start/input.md) ([Use the input prompt in _ink_](/ink/ink-input.md)).

After getting the input value you can [set the character name](/start/character.md#edit-characters-in-the-game) using the obtained value ([Edit character name in _ink_](/ink/ink-character.md#edit-character-name-in-dialogues)).

This is the example:

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

Now we could use character names within dialogues ([Use character name in dialogues in _ink_](/ink/ink-character.md#use-character-name-in-dialogues)).

This is the example:

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

## Use the "glue" feature of dialogues

In visual novels it is often useful to paste text into the current dialogue, in the next step. For example, to pause a conversation and have it continue in a subsequent step. To do this, we can use the [glue functionality](/start/dialogue.md#dialogue-glue).

This is the example:

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

## Define assets and load them

One of the first steps is choosing where to save your visual novel assets. In this case, we will save the assets in the Firebase storage (a hosting service).

Before using an asset it is highly recommended to [initialize the asset matrix](/start/assets-management.md#initialize-the-asset-matrix-at-project-start).

This is the example:

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

## Add background and character images

Now it's time to think about the visual part too. We will add the background and character sprites to the visual novel canvas.

**What is a sprite?** In computer graphics, a sprite is a two-dimensional bitmap that is integrated into a larger scene, most often in a 2D video game.

In our case the character sprites are composed of 3 images: the body, the eyes and the mouth. Then we use [ImageContainer](/start/canvas-image-container.md) to compose the character.

You can find more information on how to add canvas components in [this documentation](/start/canvas-components.md) ([Use canvas components in _ink_](/ink/ink-canvas.md)).

This is the example:

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

## Smart asset loading

In our case we saved the game images on a hosting service (Firebase). For this reason the asset loading is not timely.

In order for the player not to perceive too many loadings we should group them in certain phases of the game. In my case I will load the most used images at the start of the label.

You can find more information on how to manage the loadings [here](/start/assets-management.md).

This is the example:

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

## Use transitions

To make the visual novel more dynamic, you can use transitions to show images. You can find more information about using transitions [here](/start/canvas-transition.md) ([Using transitions in _ink_](/ink/ink-canvas.md#show-a-canvas-component-with-transition-in-ink)).

This is the example:

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

## Building an animation

To make the visual novel more dynamic, you can use animations. You can find more information about how to use animations [here](/start/canvas-animations-effects.md) ([Using animations in _ink_](/ink/ink-canvas.md#use-the-effects-in-ink)).

I recommend using Typescript if you need to set a lot of properties, this way you have more control over the animation, more functionality and feedback with the types.

In my case my animation will take steph out of the scene and reinsert her in the next step. I will also mirror it on the x-axis to make sure it is facing the right way.

For taking steph out/in I will use the `moveOut` and `moveIn` functions. For the mirror effect I will use the `ZoomTicker` ticker.

An important feature of transitions is that they momentarily pause all animations connected to that component and resume them when the transition is complete.

So, in my case, I will use before the `moveIn` function the `addTicker` function to add the `ZoomTicker` ticker. This way steph will be mirrored on the x-axis after the transition is complete.

Also since I will use typescript for this animation, I created a special label for this animation. So that it can be called also from other languages ​​that are not JS/TS.

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

Now I can call this label `animation_01` from the main label `start`. (As explained [here](/ink/ink-label.md#use-the-call-script) from _ink_ I can call labels written in ts and vice versa.)

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

## Conclusion

Well, now you know how to create a visual novel with Pixi’VN. With great power comes great responsibility, so use it wisely and create a great story! 🚀

Here is an interactive example with a minimal template (HTML). Scrolling down you can see the same result using a complete UI (React template).

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
