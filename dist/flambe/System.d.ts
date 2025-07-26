/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Entity } from './Entity';
import { AssetPack } from './asset/AssetPack';
import { Manifest } from './asset/Manifest';
import { Promise } from './util/Promise';
import { Logger } from './Log';
import { Value, Signal1 } from './util/Disposable';
import { KeyboardSystem, MouseSystem } from './input/Input';
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
export declare class System {
    /**
     * The entity at the root of the hierarchy.
     */
    static root: Entity;
    /**
     * The Stage subsystem, for controlling the display viewport.
     */
    static stage: StageSystem;
    /**
     * The Keyboard subsystem, for keyboard input.
     */
    static keyboard: KeyboardSystem;
    /**
     * The Mouse subsystem, for mouse input.
     */
    static mouse: MouseSystem;
    /**
     * Emitted when an uncaught exception occurs, if the platform supports it.
     */
    static uncaughtError: Signal1<string>;
    /**
     * Emitted when the app is hidden, such as when minimized or placed in the background.
     */
    static hidden: Value<boolean>;
    /**
     * The global volume applied to all sounds, defaults to 1.0.
     */
    static volume: Value<number>;
    private static platform;
    private static calledInit;
    /**
     * Initialize the engine. This must be called before using any other system.
     */
    static init(): void;
    /**
     * Request to load an asset pack described by the given manifest.
     */
    static loadAssetPack(manifest: Manifest): Promise<AssetPack>;
    /**
     * Creates a Logger for printing debug messages.
     */
    static createLogger(tag: string): Logger;
    /**
     * Gets the current time in seconds.
     */
    static get time(): number;
    private static assertCalledInit;
}
//# sourceMappingURL=System.d.ts.map