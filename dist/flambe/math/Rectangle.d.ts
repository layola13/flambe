/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export declare class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    set(x: number, y: number, width: number, height: number): Rectangle;
    get right(): number;
    get bottom(): number;
    clone(): Rectangle;
    contains(x: number, y: number): boolean;
    containsPoint(point: {
        x: number;
        y: number;
    }): boolean;
    intersects(other: Rectangle): boolean;
    intersection(other: Rectangle): Rectangle | null;
    isEmpty(): boolean;
    toString(): string;
}
//# sourceMappingURL=Rectangle.d.ts.map