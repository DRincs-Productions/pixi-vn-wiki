# Canvas Components

Pixi’VN provides a set of canvas components. These components are based on [Pixi.js](https://pixijs.com/), a modern 2D rendering engine.

**What is a sprite?** In computer graphics, a sprite is a two-dimensional bitmap that is integrated into a larger scene, most often in a 2D video game.

## Base Components

The available components are:

* `Sprite` corresponds to the component [PixiJS.Sprite](https://pixijs.com/8.x/guides/components/sprites).
* `Container` corresponds to the component [PixiJS.Container](https://pixijs.com/8.x/guides/components/containers).
* `Text` corresponds to the component [PixiJS.Text](https://pixijs.com/8.x/guides/components/text).
* [ImageSprite](/start/canvas-images.md) is a conponent introduced by Pixi’VN.
* [ImageContainer](/start/canvas-image-container.md) is a conponent introduced by Pixi’VN.
* [VideoSprite](/start/canvas-videos.md) is a conponent introduced by Pixi’VN.

## Custom Components

You can create custom components by extending the base components. It is necessary use the decorator `@canvasComponentDecorator`.

`@canvasComponentDecorator` is a decorator that save the canvas component in memory. It have a optional parameter that is the id of the canvas component (must be unique). If you don't pass the id, the canvas component will be saved with the class name. ( [How enable the decorators in TypeScript?](/start/getting-started#how-enable-the-decorators-in-typescript) )

And is necessary to override the `memory` property to store the custom component properties.
In `get memory()` is very important to return the `className` property, this property must equal to the decorator parameter or the class name if the decorator parameter is not passed.

For example, you can create a `AlienTinting` class that extends the `Sprite` class to manage character sprites.

```typescript
@canvasComponentDecorator() // or @canvasComponentDecorator("AlienTintingTest")
class AlienTintingTest extends Sprite<IAlienTintingMemory> {
    override get memory() {
        return {
            ...super.memory,
            direction: this.direction,
            turningSpeed: this.turningSpeed,
            speed: this.speed,
            className: "AlienTintingTest",
        }
    }
    override set memory(memory: IAlienTintingMemory) {
        super.memory = memory as ICanvasSpriteMemory
        this.direction = memory.direction
        this.turningSpeed = memory.turningSpeed
        this.speed = memory.speed
    }
    direction: number = 0
    turningSpeed: number = 0
    speed: number = 0
    static override from(source: Texture | TextureSourceLike, skipCache?: boolean) {
        let sprite = Sprite.from(source, skipCache)
        let mySprite = new AlienTintingTest()
        mySprite.texture = sprite.texture
        return mySprite
    }
}
```
