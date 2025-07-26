/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export class Asset {
    constructor() {
        this.disposed = false;
    }
}
export class File extends Asset {
}
export class StringFile extends File {
    constructor(content) {
        super();
        this.content = content;
    }
    toString() {
        return this.content;
    }
    toBytes() {
        const encoder = new TextEncoder();
        return encoder.encode(this.content).buffer;
    }
    dispose() {
        this.disposed = true;
    }
}
export class BinaryFile extends File {
    constructor(data) {
        super();
        this.data = data;
    }
    toString() {
        const decoder = new TextDecoder();
        return decoder.decode(this.data);
    }
    toBytes() {
        return this.data;
    }
    dispose() {
        this.disposed = true;
    }
}
//# sourceMappingURL=File.js.map