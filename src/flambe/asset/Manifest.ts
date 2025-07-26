/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export enum AssetFormat {
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

export class Manifest {
    private entries: Map<string, AssetEntry[]> = new Map();
    private localBase: string | null = null;
    private remoteBase: string | null = null;
    private supportsCrossOrigin = true;

    constructor(manifest?: any) {
        if (manifest) {
            this.fromObject(manifest);
        }
    }

    public static fromAssets(name: string): Manifest {
        // This would be populated by a build tool in a real implementation
        // For now, return an empty manifest
        return new Manifest();
    }

    public static fromObject(object: any): Manifest {
        const manifest = new Manifest();
        manifest.fromObject(object);
        return manifest;
    }

    private fromObject(object: any): void {
        for (const packName in object) {
            const packEntries = object[packName];
            const entries: AssetEntry[] = [];
            
            for (const entry of packEntries) {
                entries.push({
                    name: entry.name,
                    url: entry.url || entry.name,
                    format: this.inferFormat(entry.name),
                    bytes: entry.bytes || 0
                });
            }
            
            this.entries.set(packName, entries);
        }
    }

    private inferFormat(filename: string): AssetFormat {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'png': return AssetFormat.PNG;
            case 'jpg': case 'jpeg': return AssetFormat.JPG;
            case 'gif': return AssetFormat.GIF;
            case 'webp': return AssetFormat.WEBP;
            case 'jxr': return AssetFormat.JXR;
            case 'mp3': return AssetFormat.MP3;
            case 'm4a': return AssetFormat.M4A;
            case 'opus': return AssetFormat.OPUS;
            case 'ogg': return AssetFormat.OGG;
            case 'wav': return AssetFormat.WAV;
            default: return AssetFormat.Data;
        }
    }

    public exists(name: string): boolean {
        for (const entries of this.entries.values()) {
            if (entries.some(entry => entry.name === name)) {
                return true;
            }
        }
        return false;
    }

    public get(name: string): AssetEntry[] {
        for (const entries of this.entries.values()) {
            const matches = entries.filter(entry => entry.name === name);
            if (matches.length > 0) {
                return matches;
            }
        }
        return [];
    }

    public getFullURL(entry: AssetEntry): string {
        const basePath = (this.remoteBase && this.supportsCrossOrigin) ? this.remoteBase : this.localBase;
        return basePath ? `${basePath}/${entry.url}` : entry.url;
    }

    public setLocalBase(localBase: string): void {
        this.localBase = localBase;
    }

    public setRemoteBase(remoteBase: string): void {
        this.remoteBase = remoteBase;
    }

    public array(): AssetEntry[] {
        const result: AssetEntry[] = [];
        for (const entries of this.entries.values()) {
            result.push(...entries);
        }
        return result;
    }
}
