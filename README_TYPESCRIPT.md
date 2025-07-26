# Flambe TypeScript Port

This is a TypeScript port of the Haxe Flambe game engine, focusing on the HTML5/JavaScript platform.

## Original Flambe

Flambe was a cross-platform game engine written in Haxe that supported Flash and HTML5. This TypeScript port maintains the core architecture and API while targeting modern web browsers.

## Features Ported

- **Entity-Component-System**: Core entity hierarchy and component system
- **Asset Management**: Asset loading and manifest system
- **Display System**: Sprite rendering and display tree
- **Math Utilities**: Point, Rectangle, and math functions
- **Audio System**: Basic sound playback
- **Reactive Programming**: Signals and reactive values
- **Promise-based API**: Asynchronous asset loading

## Project Structure

```
src/
├── flambe/
│   ├── Entity.ts              # Entity hierarchy system
│   ├── Component.ts           # Component base class
│   ├── System.ts              # Main system and platform abstraction
│   ├── Log.ts                 # Logging system
│   ├── asset/                 # Asset loading and management
│   │   ├── AssetPack.ts
│   │   ├── Manifest.ts
│   │   └── File.ts
│   ├── display/               # Graphics and rendering
│   │   ├── Sprite.ts
│   │   └── Texture.ts
│   ├── math/                  # Mathematical utilities
│   │   ├── FMath.ts
│   │   ├── Point.ts
│   │   └── Rectangle.ts
│   ├── sound/                 # Audio system
│   │   └── Sound.ts
│   └── util/                  # Utilities
│       ├── Disposable.ts
│       └── Promise.ts
└── index.ts                   # Main exports
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Run the example:**
   ```bash
   npm run serve
   ```
   Then open http://localhost:8080/examples/basic/

## API Usage

### Basic Setup

```typescript
import { System, Entity } from 'flambe-ts';

// Initialize the engine
System.init();

// Create entities
const gameObject = new Entity();
System.root.addChild(gameObject);
```

### Asset Loading

```typescript
import { Manifest } from 'flambe-ts';

const manifest = Manifest.fromAssets("game-assets");
const loader = System.loadAssetPack(manifest);

loader.get((pack) => {
    const texture = pack.getTexture("player");
    const sound = pack.getSound("jump");
    // Use assets...
});
```

### Components

```typescript
import { Component, Entity } from 'flambe-ts';

class PlayerController extends Component {
    onUpdate(dt: number): void {
        // Update player logic
    }
}

const player = new Entity();
player.add(new PlayerController());
```

## Differences from Original Haxe Version

1. **Platform Focus**: Only supports HTML5/Canvas, no Flash support
2. **Type Safety**: Full TypeScript type checking
3. **Modern APIs**: Uses modern JavaScript APIs and ES modules
4. **Simplified**: Removed platform-specific code and build tools
5. **Browser Native**: Direct integration with HTML5 Canvas and Web Audio APIs

## Development

- **Watch mode**: `npm run watch` for continuous compilation
- **Testing**: `npm test` (Jest-based tests)
- **Clean**: `npm run clean` to remove build artifacts

## Migration from Haxe Flambe

The API is designed to be as similar as possible to the original Haxe version:

- Class names and method signatures are preserved
- Entity-Component pattern works the same way
- Asset loading API is nearly identical
- Math utilities have the same interface

## License

MIT License (same as original Flambe)

## Status

This is a basic port focusing on core functionality. Advanced features like:
- Complex animations
- Advanced rendering effects
- Mobile input handling
- Performance optimizations

May be added in future versions.
