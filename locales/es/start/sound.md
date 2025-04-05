# Sounds and Music

The sound module is a wrapper around the [PixiJS Sound](https://github.com/pixijs/sound) library. It provides a simple interface for playing sounds and saves the current state at each [step](/start/labels.md).

## Add and Playing

Creation of a sound is simple. You can also use the PIXI.sound library methods (`add`, `play`) for adding and playing a sound as well.

```typescript
import { sound } from '@drincs/pixi-vn'

// In this case, you create a simple sound, and play it with loop
sound.add('bird', 'resources/bird.mp3');
sound.play('bird', {
    loop: true,
});

// This case is the same as above, but you can use the sound object
let s = sound.add('bird', 'resources/bird.mp3');
s.play({
    loop: true,
});

// In this case, you create a loop sound, and play it
let s = sound.add('bird', {
    url: 'resources/bird.mp3',
    loop: true,
});
s.play();
```

## Pause and Resume

You can pause and resume a sound.

```typescript
import { sound } from '@drincs/pixi-vn'

let s = sound.add('bird', 'resources/bird.mp3');
s.play();
s.pause();
s.resume();
```

## Stop

You can stop a sound.

```typescript
import { sound } from '@drincs/pixi-vn'

let s = sound.add('bird', 'resources/bird.mp3');
s.play();
s.stop();
```

## Volume

Volume can be set initially by using the object constructor

```typescript
import { sound } from '@drincs/pixi-vn'

let s = sound.add('bird', {
    url: 'resources/bird.mp3',
    volume: 0.5,
});
s.play();
```

Volume can also be set by changing the `volume` property.

```typescript
import { sound } from '@drincs/pixi-vn'

let s = sound.add('bird', 'resources/bird.mp3');
s.volume = 0.5;
s.play();
```

## Filters

You can add filters to a sound.

```typescript
import { sound, filters } from '@drincs/pixi-vn'

let s = sound.add('bird', 'resources/bird.mp3');
s.filters =  [
    new filters.StereoFilter(),
    new filters.ReverbFilter(9, 2)
]
s.play();
```
