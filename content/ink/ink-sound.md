# Use sounds and music in *ink*

The ***ink* + Pixi’VN integration** introduces the a # script that allows you to use the [sounds and music](/start/sound.md).

The syntax is as follows:

`#` + `[operation]` + `sound` + `[alias]` + `[parameters]`

Where:

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[operation]`: It is the operation that you want to execute with the sound element. The available operations are:
  * `play`: Play a sound. (Read more [here](#play-a-sound-in-ink))
  * `pause`: Pause a sound. (Read more [here](#pause-a-sound-in-ink))
  * `resume`: Resume a sound. (Read more [here](#resume-a-sound-in-ink))
  * `stop`: Stop a sound. (Read more [here](#stop-a-sound-in-ink))
  * `volume`: Change the volume of a sound. (Read more [here](#change-the-volume-of-a-sound-in-ink))
* `[alias]` It is the alias of the sound. The alias is a string that identifies the sound.
  * If the alias includes spaces, you must use double quotes.
* `[parameters]` It is the parameters of the operation. The parameters depend on the operation.
  * If the parameters include spaces, you must use double quotes.
  * If the parameters is a object, you must use the JSON format and the first character must be `\{` and the last character must be `\}`. Example: `\{ "volume": 100, name: "Music" \}`

<sandbox
  template="nqflhd"
  entry="/src/ink/start.ink,/src/utils/assets-utility.ts"
/>

## Play a sound in *ink*

You can use the `play` to play a sound in ***ink***.

The syntax is as follows:

`#` + `play` + `sound` + `[alias]` + `[parameters]`

* `[parameters] (Optional)`: In the `parameters` you must include the properties of `SoundPlayOptions` that you want to set. The `parameters` must be set as follows: `parameterName` + `SPACE` + `value`. If the `value` is a string and includes spaces, you must use double quotes.

:::tabs
== start.ink

```ink
# play sound bird
Now the bird is singing.
# play sound bird volume 100
Now the bird is singing louder.
```

== assets-utility.ts

```ts
import { sound } from "@drincs/pixi-vn";

export async function defineAssets() {
    sound.add('bird', 'https://pixijs.io/sound/examples/resources/bird.mp3');
}
```

:::

## Pause a sound in *ink*

To pause a sound in ***ink***, you can use the `pause` operation.

The syntax is as follows:

`#` + `pause` + `sound` + `[alias]`

```ink
# pause sound bird
```

## Resume a sound in *ink*

To resume a sound in ***ink***, you can use the `resume` operation.

The syntax is as follows:

`#` + `resume` + `sound` + `[alias]`

```ink
# resume sound bird
```

## Stop a sound in *ink*

To remove a sound in ***ink***, you can use the `stop` operation.

The syntax is as follows:

`#` + `stop` + `sound` + `[alias]`

```ink
# stop sound bird
```

## Change the volume of a sound in *ink*

To change the volume of a sound in ***ink***, you can use the `volume` operation.

The syntax is as follows:

`#` + `volume` + `sound` + `[alias]` + `[number]`

* `[number]`: It is a number from 0 to 100 that corresponds to the volume you want to set.

```ink
# volume sound bird 100
```
