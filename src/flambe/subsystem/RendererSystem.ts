/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Texture, HTMLTexture } from '../display/Texture';
import { Value } from '../util/Disposable';

export enum RendererType {
    WebGL = "webgl",
    Canvas = "canvas"
}

/**
 * Functions related to the device's renderer.
 */
export interface RendererSystem<NativeImage = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement> {
    /**
     * The type of this renderer.
     */
    readonly type: RendererType;

    /**
     * The maximum width and height of a Texture on this renderer, in pixels. Guaranteed to be at
     * least 1024.
     */
    readonly maxTextureSize: number;

    /**
     * Whether the renderer currently has a GPU context. In some renderers (WebGL) the
     * GPU and all its resources may be destroyed at any time by the system. On renderers that don't
     * need to worry about reclaiming GPU resources (Canvas) this is always true.
     *
     * When this becomes false, all Textures and Graphics objects are destroyed and become invalid.
     * When it returns to true, apps should reload its textures.
     */
    readonly hasGPU: Value<boolean>;

    /**
     * Creates a new blank texture, initialized to transparent black.
     *
     * @param width The width of the texture, in pixels.
     * @param height The height of the texture, in pixels.
     *
     * @returns The new texture, or null if the GPU context is currently unavailable.
     */
    createTexture(width: number, height: number): Texture | null;

    /**
     * Creates a new texture from native image data. Normally you should use
     * `System.loadAssetPack()` to load textures, but this can be useful for working with external
     * code that deals with native images.
     *
     * @param image The platform-specific image data. In HTML, this is an ImageElement, 
     * CanvasElement, or VideoElement.
     *
     * @returns The new texture, or null if the GPU context is currently unavailable.
     */
    createTextureFromImage(image: NativeImage): Texture | null;
}

/**
 * HTML5 Canvas renderer implementation
 */
export class HTMLCanvasRenderer implements RendererSystem<HTMLImageElement | HTMLCanvasElement | HTMLVideoElement> {
    public readonly type = RendererType.Canvas;
    public readonly maxTextureSize = 8192; // Most browsers support this
    public readonly hasGPU = new Value(true); // Canvas always has "GPU"
    
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d')!;
    }

    public createTexture(width: number, height: number): Texture | null {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Initialize to transparent black
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, width, height);
        
        return new HTMLTexture(canvas, width, height);
    }

    public createTextureFromImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Texture | null {
        let width: number;
        let height: number;
        
        if (image instanceof HTMLImageElement) {
            width = image.naturalWidth;
            height = image.naturalHeight;
        } else if (image instanceof HTMLCanvasElement) {
            width = image.width;
            height = image.height;
        } else if (image instanceof HTMLVideoElement) {
            width = image.videoWidth;
            height = image.videoHeight;
        } else {
            return null;
        }
        
        return new HTMLTexture(image as HTMLImageElement | HTMLCanvasElement);
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public get context(): CanvasRenderingContext2D {
        return this._ctx;
    }
}

/**
 * HTML5 WebGL renderer implementation
 */
export class HTMLWebGLRenderer implements RendererSystem<HTMLImageElement | HTMLCanvasElement | HTMLVideoElement> {
    public readonly type = RendererType.WebGL;
    public readonly hasGPU: Value<boolean>;
    
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext | null;
    private _maxTextureSize = 1024;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
        
        if (this._gl) {
            this._maxTextureSize = this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
            this.hasGPU = new Value(true);
            
            // Listen for context loss
            canvas.addEventListener('webglcontextlost', () => {
                this.hasGPU._ = false;
            });
            
            canvas.addEventListener('webglcontextrestored', () => {
                this._gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
                this.hasGPU._ = true;
            });
        } else {
            this.hasGPU = new Value(false);
        }
    }

    public get maxTextureSize(): number {
        return this._maxTextureSize;
    }

    public createTexture(width: number, height: number): Texture | null {
        if (!this._gl || !this.hasGPU._) {
            return null;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Initialize to transparent black
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, width, height);
        
        return new HTMLTexture(canvas);
    }

    public createTextureFromImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Texture | null {
        if (!this._gl || !this.hasGPU._) {
            return null;
        }

        let width: number;
        let height: number;
        
        if (image instanceof HTMLImageElement) {
            width = image.naturalWidth;
            height = image.naturalHeight;
        } else if (image instanceof HTMLCanvasElement) {
            width = image.width;
            height = image.height;
        } else if (image instanceof HTMLVideoElement) {
            width = image.videoWidth;
            height = image.videoHeight;
        } else {
            return null;
        }
        
        return new HTMLTexture(image as HTMLImageElement | HTMLCanvasElement);
    }

    public get gl(): WebGLRenderingContext | null {
        return this._gl;
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
}
