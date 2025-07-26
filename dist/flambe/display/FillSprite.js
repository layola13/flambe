/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Sprite } from './Sprite';
export class FillSprite extends Sprite {
    constructor(color, width, height) {
        super();
        this.color = color;
        this.width = width;
        this.height = height;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    centerAnchor() {
        // For fill sprites, we can adjust the drawing position
        return this;
    }
    draw(ctx) {
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
    getNaturalWidth() {
        return this.width;
    }
    getNaturalHeight() {
        return this.height;
    }
}
//# sourceMappingURL=FillSprite.js.map