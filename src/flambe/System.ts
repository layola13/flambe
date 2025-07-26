/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Entity } from './Entity';
import { Component } from './Component';
import { AssetPack } from './asset/AssetPack';
import { Manifest } from './asset/Manifest';
import { Promise } from './util/Promise';
import { Logger, ConsoleLogHandler } from './Log';
import { Value, Signal1, Signal1Impl } from './util/Disposable';
import { MainLoop } from './platform/MainLoop';
import { HTMLKeyboard, HTMLMouse, KeyboardSystem, MouseSystem } from './input/Input';

export interface Platform {
    init(): void;
    loadAssetPack(manifest: Manifest): Promise<AssetPack>;
    getTime(): number;
    createLogHandler(tag: string): any;
}

export interface StageSystem {
    readonly width: number;
    readonly height: number;
}

/**
 * Provides access to all the different subsystems implemented on each platform.
 */
export class System {
    /**
     * The entity at the root of the hierarchy.
     */
    public static root: Entity = new Entity();

    /**
     * The Stage subsystem, for controlling the display viewport.
     */
    public static stage: StageSystem;

    /**
     * The Keyboard subsystem, for keyboard input.
     */
    public static keyboard: KeyboardSystem;

    /**
     * The Mouse subsystem, for mouse input.
     */
    public static mouse: MouseSystem;

    /**
     * Emitted when an uncaught exception occurs, if the platform supports it.
     */
    public static uncaughtError: Signal1<string> = new Signal1Impl<string>();

    /**
     * Emitted when the app is hidden, such as when minimized or placed in the background.
     */
    public static hidden: Value<boolean> = new Value(false);

    /**
     * The global volume applied to all sounds, defaults to 1.0.
     */
    public static volume: Value<number> = new Value(1.0);

    private static platform: Platform;
    private static calledInit = false;

    /**
     * Initialize the engine. This must be called before using any other system.
     */
    public static init(): void {
        if (System.calledInit) {
            return;
        }

        // Create HTML platform
        System.platform = new HTMLPlatform();
        System.platform.init();
        
        System.calledInit = true;
    }

    /**
     * Request to load an asset pack described by the given manifest.
     */
    public static loadAssetPack(manifest: Manifest): Promise<AssetPack> {
        System.assertCalledInit();
        return System.platform.loadAssetPack(manifest);
    }

    /**
     * Creates a Logger for printing debug messages.
     */
    public static createLogger(tag: string): Logger {
        return new Logger(new ConsoleLogHandler(tag));
    }

    /**
     * Gets the current time in seconds.
     */
    public static get time(): number {
        System.assertCalledInit();
        return System.platform.getTime();
    }

    private static assertCalledInit(): void {
        if (!System.calledInit) {
            throw new Error("You must call System.init() first");
        }
    }
}

// HTML Platform implementation
class HTMLPlatform implements Platform {
    private startTime = Date.now();
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private mainLoop = new MainLoop();

    public init(): void {
        // Create or find canvas
        this.canvas = document.getElementById('flambe-canvas') as HTMLCanvasElement || 
                     document.createElement('canvas');
        
        if (!this.canvas.parentElement) {
            this.canvas.id = 'flambe-canvas';
            this.canvas.width = 800;
            this.canvas.height = 600;
            document.body.appendChild(this.canvas);
        }

        this.ctx = this.canvas.getContext('2d')!;

        // Set up stage
        System.stage = {
            width: this.canvas.width,
            height: this.canvas.height
        };

        // Set up input systems
        System.keyboard = new HTMLKeyboard();
        System.mouse = new HTMLMouse(this.canvas);

        // Start the main loop
        this.startMainLoop();
    }

    public loadAssetPack(manifest: Manifest): Promise<AssetPack> {
        // Basic asset pack implementation
        return Promise.resolve(new BasicAssetPack(manifest));
    }

    public getTime(): number {
        return (Date.now() - this.startTime) / 1000;
    }

    public createLogHandler(tag: string): any {
        return new ConsoleLogHandler(tag);
    }

    private startMainLoop(): void {
        const update = (currentTime: number) => {
            // Update all entities and components
            this.mainLoop.update(currentTime);
            
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Render the root entity
            this.renderEntity(System.root);
            
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }

    private renderEntity(entity: Entity): void {
        // Render sprite components
        let component = entity.firstComponent;
        while (component) {
            // Check if component has a draw method (is a sprite)
            if ('draw' in component && typeof (component as any).draw === 'function') {
                (component as any).draw(this.ctx);
            }
            component = component.next;
        }

        // Render children
        let child = entity.firstChild;
        while (child) {
            this.renderEntity(child);
            child = child.next;
        }
    }
}

// Basic AssetPack implementation
class BasicAssetPack implements AssetPack {
    private disposed = false;

    constructor(public readonly manifest: Manifest) {
    }

    public getTexture(name: string, required = true): any {
        // Basic implementation
        return null;
    }

    public getSound(name: string, required = true): any {
        // Basic implementation  
        return null;
    }

    public getFile(name: string, required = true): any {
        // Basic implementation
        return null;
    }

    public dispose(): void {
        this.disposed = true;
    }
}
