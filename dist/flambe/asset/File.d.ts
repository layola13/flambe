/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Disposable } from '../util/Disposable';
export declare abstract class Asset implements Disposable {
    protected disposed: boolean;
    abstract dispose(): void;
}
export declare abstract class File extends Asset {
    abstract toString(): string;
    abstract toBytes(): ArrayBuffer;
}
export declare class StringFile extends File {
    private content;
    constructor(content: string);
    toString(): string;
    toBytes(): ArrayBuffer;
    dispose(): void;
}
export declare class BinaryFile extends File {
    private data;
    constructor(data: ArrayBuffer);
    toString(): string;
    toBytes(): ArrayBuffer;
    dispose(): void;
}
//# sourceMappingURL=File.d.ts.map