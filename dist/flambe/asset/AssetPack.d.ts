/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Disposable } from '../util/Disposable';
import { Manifest } from './Manifest';
import { Texture } from '../display/Texture';
import { Sound } from '../sound/Sound';
import { File } from './File';
/**
 * Represents a collection of fully loaded assets.
 */
export interface AssetPack extends Disposable {
    /**
     * The manifest that was used to load this asset pack.
     */
    readonly manifest: Manifest;
    /**
     * Gets a texture by name from the asset pack. The name must NOT contain a filename extension.
     * Textures are cached, so it's safe to get the same texture multiple times.
     * @param required If true and the asset was not found, an error is thrown.
     */
    getTexture(name: string, required?: boolean): Texture | null;
    /**
     * Gets a sound by name from the asset pack. The name must NOT contain a filename extension.
     * Sounds are cached, so it's safe to get the same sound multiple times.
     * @param required If true and the asset was not found, an error is thrown.
     */
    getSound(name: string, required?: boolean): Sound | null;
    /**
     * Gets a file by name from the asset pack, returning its raw content. Files are cached, so it's
     * safe to get the same file multiple times.
     * @param required If true and the asset was not found, an error is thrown.
     */
    getFile(name: string, required?: boolean): File | null;
    /**
     * Disposes all the assets in this AssetPack. After calling this, any calls to getTexture,
     * getSound, or getFile will assert.
     */
    dispose(): void;
}
//# sourceMappingURL=AssetPack.d.ts.map