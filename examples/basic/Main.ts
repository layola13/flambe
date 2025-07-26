/**
 * Flambe TypeScript Example
 */

import { System, Entity, Manifest, FillSprite } from '../../src/index';

class Main {
    private static main(): void {
        // Initialize the engine
        System.init();

        console.log("Flambe TypeScript engine initialized!");
        console.log(`Stage size: ${System.stage.width}x${System.stage.height}`);

        // Create a background
        const background = new Entity();
        const bgSprite = new FillSprite(0x202020, System.stage.width, System.stage.height);
        background.add(bgSprite);
        System.root.addChild(background);

        // Create a moving rectangle
        const player = new Entity();
        const playerSprite = new FillSprite(0x00ff00, 50, 50);
        playerSprite.setXY(100, 100);
        player.add(playerSprite);
        System.root.addChild(player);

        // Animate the player
        let time = 0;
        const animate = () => {
            time += 0.016; // ~60fps
            playerSprite.x._ = 100 + Math.sin(time * 2) * 200;
            playerSprite.y._ = 100 + Math.cos(time * 1.5) * 150;
            playerSprite.rotation._ = time;
            
            requestAnimationFrame(animate);
        };
        animate();

        // Load assets (basic implementation for demo)
        const manifest = Manifest.fromAssets("bootstrap");
        const loader = System.loadAssetPack(manifest);
        
        loader.get((pack) => {
            console.log("Assets loaded successfully!");
            Main.onAssetsLoaded();
        });

        loader.error.connect((error) => {
            console.error("Failed to load assets:", error);
            // Continue anyway for demo
            Main.onAssetsLoaded();
        });
    }

    private static onAssetsLoaded(): void {
        console.log("Game started!");
        console.log("Watch the green square move around the canvas!");
    }
}

// Start the application when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Main['main']());
} else {
    Main['main']();
}
