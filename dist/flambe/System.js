/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Entity } from './Entity';
import { Promise } from './util/Promise';
import { Logger, ConsoleLogHandler } from './Log';
import { Value, Signal1Impl } from './util/Disposable';
import { MainLoop } from './platform/MainLoop';
import { HTMLKeyboard, HTMLMouse } from './input/Input';
/**
 * Provides access to all the different subsystems implemented on each platform.
 */
export class System {
    /**
     * Initialize the engine. This must be called before using any other system.
     */
    static init() {
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
    static loadAssetPack(manifest) {
        System.assertCalledInit();
        return System.platform.loadAssetPack(manifest);
    }
    /**
     * Creates a Logger for printing debug messages.
     */
    static createLogger(tag) {
        return new Logger(new ConsoleLogHandler(tag));
    }
    /**
     * Gets the current time in seconds.
     */
    static get time() {
        System.assertCalledInit();
        return System.platform.getTime();
    }
    static assertCalledInit() {
        if (!System.calledInit) {
            throw new Error("You must call System.init() first");
        }
    }
}
/**
 * The entity at the root of the hierarchy.
 */
System.root = new Entity();
/**
 * Emitted when an uncaught exception occurs, if the platform supports it.
 */
System.uncaughtError = new Signal1Impl();
/**
 * Emitted when the app is hidden, such as when minimized or placed in the background.
 */
System.hidden = new Value(false);
/**
 * The global volume applied to all sounds, defaults to 1.0.
 */
System.volume = new Value(1.0);
System.calledInit = false;
// HTML Platform implementation
class HTMLPlatform {
    constructor() {
        this.startTime = Date.now();
        this.mainLoop = new MainLoop();
    }
    init() {
        // Create or find canvas
        this.canvas = document.getElementById('flambe-canvas') ||
            document.createElement('canvas');
        if (!this.canvas.parentElement) {
            this.canvas.id = 'flambe-canvas';
            this.canvas.width = 800;
            this.canvas.height = 600;
            document.body.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d');
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
    loadAssetPack(manifest) {
        // Basic asset pack implementation
        return Promise.resolve(new BasicAssetPack(manifest));
    }
    getTime() {
        return (Date.now() - this.startTime) / 1000;
    }
    createLogHandler(tag) {
        return new ConsoleLogHandler(tag);
    }
    startMainLoop() {
        const update = (currentTime) => {
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
    renderEntity(entity) {
        // Render sprite components
        let component = entity.firstComponent;
        while (component) {
            // Check if component has a draw method (is a sprite)
            if ('draw' in component && typeof component.draw === 'function') {
                component.draw(this.ctx);
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
class BasicAssetPack {
    constructor(manifest) {
        this.manifest = manifest;
        this.disposed = false;
    }
    getTexture(name, required = true) {
        // Basic implementation
        return null;
    }
    getSound(name, required = true) {
        // Basic implementation  
        return null;
    }
    getFile(name, required = true) {
        // Basic implementation
        return null;
    }
    dispose() {
        this.disposed = true;
    }
}
//# sourceMappingURL=System.js.map