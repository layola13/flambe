/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export declare enum AssetFormat {
    PNG = "PNG",
    JPG = "JPG",
    GIF = "GIF",
    WEBP = "WEBP",
    JXR = "JXR",
    MP3 = "MP3",
    M4A = "M4A",
    OPUS = "OPUS",
    OGG = "OGG",
    WAV = "WAV",
    Data = "Data"
}
export interface AssetEntry {
    name: string;
    url: string;
    format: AssetFormat;
    bytes: number;
}
export declare class Manifest {
    private entries;
    private localBase;
    private remoteBase;
    private supportsCrossOrigin;
    constructor(manifest?: any);
    static fromAssets(name: string): Manifest;
    static fromObject(object: any): Manifest;
    private fromObject;
    private inferFormat;
    exists(name: string): boolean;
    get(name: string): AssetEntry[];
    getFullURL(entry: AssetEntry): string;
    setLocalBase(localBase: string): void;
    setRemoteBase(remoteBase: string): void;
    array(): AssetEntry[];
}
//# sourceMappingURL=Manifest.d.ts.map