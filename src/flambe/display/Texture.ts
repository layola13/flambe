/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Disposable } from '../util/Disposable';

export abstract class Texture implements Disposable {
    public abstract readonly width: number;
    public abstract readonly height: number;

    public abstract dispose(): void;
}

export class HTMLTexture extends Texture {
    public readonly width: number;
    public readonly height: number;

    constructor(public readonly nativeTexture: HTMLImageElement | HTMLCanvasElement) {
        super();
        this.width = nativeTexture.width;
        this.height = nativeTexture.height;
    }

    public dispose(): void {
        // Textures are managed by the browser, no explicit cleanup needed
    }
}

export class SubTexture extends Texture {
    public readonly width: number;
    public readonly height: number;

    constructor(
        public readonly parent: Texture,
        public readonly x: number,
        public readonly y: number,
        width: number,
        height: number
    ) {
        super();
        this.width = width;
        this.height = height;
    }

    public dispose(): void {
        // SubTextures don't own the parent texture
    }
}
