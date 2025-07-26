/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export class Texture {
}
export class HTMLTexture extends Texture {
    constructor(nativeTexture) {
        super();
        this.nativeTexture = nativeTexture;
        this.width = nativeTexture.width;
        this.height = nativeTexture.height;
    }
    dispose() {
        // Textures are managed by the browser, no explicit cleanup needed
    }
}
export class SubTexture extends Texture {
    constructor(parent, x, y, width, height) {
        super();
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    dispose() {
        // SubTextures don't own the parent texture
    }
}
//# sourceMappingURL=Texture.js.map