# phaser-ts-bun with webpack

To install dependencies:

```bash
bun install
```

To run, webpack and serve server.

```bash
bun start
```

This project was created using `bun init` in bun v1.1.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Architecture
This template uses a component-based architecture.

## Adding new components

Adding new components is farily easy, by creating a new folder, and new .ts file in the root/components folder we can easily import it into our index.ts
```ts
export class Component extends Phaser.Scene
```
^ The above, is needed to be able to import it in to our scenes in index.ts

### Index.ts

```ts
var config = {
    ... // rest of code
    scene: [StartScene, App, NewComponent]
}
```
