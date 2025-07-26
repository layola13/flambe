/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Sprite } from './Sprite';
import { HTMLTexture } from './Texture';
export class ImageSprite extends Sprite {
    constructor(texture) {
        super();
        this.texture = null;
        if (texture) {
            this.texture = texture;
        }
    }
    setTexture(texture) {
        this.texture = texture;
        return this;
    }
    centerAnchor() {
        if (this.texture) {
            this.anchorX._ = this.texture.width / 2;
            this.anchorY._ = this.texture.height / 2;
        }
        return this;
    }
    setAnchor(x, y) {
        this.anchorX._ = x;
        this.anchorY._ = y;
        return this;
    }
    draw(ctx) {
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
            ctx.drawImage(this.texture.nativeTexture, -this.anchorX._, -this.anchorY._, this.texture.width, this.texture.height);
        }
        ctx.restore();
    }
    getNaturalWidth() {
        return this.texture ? this.texture.width : 0;
    }
    getNaturalHeight() {
        return this.texture ? this.texture.height : 0;
    }
}
//# sourceMappingURL=ImageSprite.js.map