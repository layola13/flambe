/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Disposable } from '../util/Disposable';
export declare abstract class Texture implements Disposable {
    abstract readonly width: number;
    abstract readonly height: number;
    abstract dispose(): void;
}
export declare class HTMLTexture extends Texture {
    readonly nativeTexture: HTMLImageElement | HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    constructor(nativeTexture: HTMLImageElement | HTMLCanvasElement);
    dispose(): void;
}
export declare class SubTexture extends Texture {
    readonly parent: Texture;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    constructor(parent: Texture, x: number, y: number, width: number, height: number);
    dispose(): void;
}
//# sourceMappingURL=Texture.d.ts.map