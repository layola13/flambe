/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Sprite } from './Sprite';
import { Texture, HTMLTexture } from './Texture';

export class ImageSprite extends Sprite {
    private texture: Texture | null = null;

    constructor(texture?: Texture) {
        super();
        if (texture) {
            this.texture = texture;
        }
    }

    public setTexture(texture: Texture): ImageSprite {
        this.texture = texture;
        return this;
    }

    public centerAnchor(): ImageSprite {
        if (this.texture) {
            this.anchorX._ = this.texture.width / 2;
            this.anchorY._ = this.texture.height / 2;
        }
        return this;
    }

    public setAnchor(x: number, y: number): ImageSprite {
        this.anchorX._ = x;
        this.anchorY._ = y;
        return this;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (!this.texture || !this.visible) {
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

        // Draw the texture
        if (this.texture instanceof HTMLTexture) {
            ctx.drawImage(
                this.texture.nativeTexture,
                -this.anchorX._,
                -this.anchorY._,
                this.texture.width,
                this.texture.height
            );
        }

        ctx.restore();
    }

    public getNaturalWidth(): number {
        return this.texture ? this.texture.width : 0;
    }

    public getNaturalHeight(): number {
        return this.texture ? this.texture.height : 0;
    }
}
