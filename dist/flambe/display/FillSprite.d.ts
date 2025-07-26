/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Sprite } from './Sprite';
export declare class FillSprite extends Sprite {
    private color;
    private width;
    private height;
    constructor(color: number, width: number, height: number);
    setSize(width: number, height: number): FillSprite;
    setColor(color: number): FillSprite;
    centerAnchor(): FillSprite;
    draw(ctx: CanvasRenderingContext2D): void;
    getNaturalWidth(): number;
    getNaturalHeight(): number;
}
//# sourceMappingURL=FillSprite.d.ts.map