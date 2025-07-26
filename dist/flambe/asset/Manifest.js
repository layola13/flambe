/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export var AssetFormat;
(function (AssetFormat) {
    AssetFormat["PNG"] = "PNG";
    AssetFormat["JPG"] = "JPG";
    AssetFormat["GIF"] = "GIF";
    AssetFormat["WEBP"] = "WEBP";
    AssetFormat["JXR"] = "JXR";
    AssetFormat["MP3"] = "MP3";
    AssetFormat["M4A"] = "M4A";
    AssetFormat["OPUS"] = "OPUS";
    AssetFormat["OGG"] = "OGG";
    AssetFormat["WAV"] = "WAV";
    AssetFormat["Data"] = "Data";
})(AssetFormat || (AssetFormat = {}));
export class Manifest {
    constructor(manifest) {
        this.entries = new Map();
        this.localBase = null;
        this.remoteBase = null;
        this.supportsCrossOrigin = true;
        if (manifest) {
            this.fromObject(manifest);
        }
    }
    static fromAssets(name) {
        // This would be populated by a build tool in a real implementation
        // For now, return an empty manifest
        return new Manifest();
    }
    static fromObject(object) {
        const manifest = new Manifest();
        manifest.fromObject(object);
        return manifest;
    }
    fromObject(object) {
        for (const packName in object) {
            const packEntries = object[packName];
            const entries = [];
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
    inferFormat(filename) {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'png': return AssetFormat.PNG;
            case 'jpg':
            case 'jpeg': return AssetFormat.JPG;
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
    exists(name) {
        for (const entries of this.entries.values()) {
            if (entries.some(entry => entry.name === name)) {
                return true;
            }
        }
        return false;
    }
    get(name) {
        for (const entries of this.entries.values()) {
            const matches = entries.filter(entry => entry.name === name);
            if (matches.length > 0) {
                return matches;
            }
        }
        return [];
    }
    getFullURL(entry) {
        const basePath = (this.remoteBase && this.supportsCrossOrigin) ? this.remoteBase : this.localBase;
        return basePath ? `${basePath}/${entry.url}` : entry.url;
    }
    setLocalBase(localBase) {
        this.localBase = localBase;
    }
    setRemoteBase(remoteBase) {
        this.remoteBase = remoteBase;
    }
    array() {
        const result = [];
        for (const entries of this.entries.values()) {
            result.push(...entries);
        }
        return result;
    }
}
//# sourceMappingURL=Manifest.js.map