/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Sprite } from './Sprite';

export class FillSprite extends Sprite {
    private color: number;
    private width: number;
    private height: number;

    constructor(color: number, width: number, height: number) {
        super();
        this.color = color;
        this.width = width;
        this.height = height;
    }

    public setSize(width: number, height: number): FillSprite {
        this.width = width;
        this.height = height;
        return this;
    }

    public setColor(color: number): FillSprite {
        this.color = color;
        return this;
    }

    public centerAnchor(): FillSprite {
        // For fill sprites, we can adjust the drawing position
        return this;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (!this.visible) {
            return;
        }

        ctx.save();
        
        // Apply transformations
        ctx.globalAlpha = this.alpha._;
        if (this.blendMode) {
            ctx.globalCompositeOperation = this.blendMode;
        }
        
        // Position and rotation
        ctx.translate(this.x._, this.y._);
        if (this.rotation._ !== 0) {
            ctx.rotate(this.rotation._);
        }
        
        // Scale
        if (this.scaleX._ !== 1 || this.scaleY._ !== 1) {
            ctx.scale(this.scaleX._, this.scaleY._);
        }

        // Convert color number to CSS color
        const r = (this.color >> 16) & 0xFF;
        const g = (this.color >> 8) & 0xFF;
        const b = this.color & 0xFF;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        
        // Draw the rectangle
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    public getNaturalWidth(): number {
        return this.width;
    }

    public getNaturalHeight(): number {
        return this.height;
    }
}
