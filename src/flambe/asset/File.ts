/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Disposable } from '../util/Disposable';

export abstract class Asset implements Disposable {
    protected disposed = false;

    public abstract dispose(): void;
}

export abstract class File extends Asset {
    public abstract toString(): string;
    public abstract toBytes(): ArrayBuffer;
}

export class StringFile extends File {
    constructor(private content: string) {
        super();
    }

    public toString(): string {
        return this.content;
    }

    public toBytes(): ArrayBuffer {
        const encoder = new TextEncoder();
        return encoder.encode(this.content).buffer;
    }

    public dispose(): void {
        this.disposed = true;
    }
}

export class BinaryFile extends File {
    constructor(private data: ArrayBuffer) {
        super();
    }

    public toString(): string {
        const decoder = new TextDecoder();
        return decoder.decode(this.data);
    }

    public toBytes(): ArrayBuffer {
        return this.data;
    }

    public dispose(): void {
        this.disposed = true;
    }
}
