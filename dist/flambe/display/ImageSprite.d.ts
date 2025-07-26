/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Sprite } from './Sprite';
import { Texture } from './Texture';
export declare class ImageSprite extends Sprite {
    private texture;
    constructor(texture?: Texture);
    setTexture(texture: Texture): ImageSprite;
    centerAnchor(): ImageSprite;
    setAnchor(x: number, y: number): ImageSprite;
    draw(ctx: CanvasRenderingContext2D): void;
    getNaturalWidth(): number;
    getNaturalHeight(): number;
}
//# sourceMappingURL=ImageSprite.d.ts.map