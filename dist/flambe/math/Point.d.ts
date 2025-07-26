/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): Point;
    equals(other: Point): boolean;
    clone(): Point;
    add(other: Point): Point;
    subtract(other: Point): Point;
    multiply(scalar: number): Point;
    distance(other: Point): number;
    distanceSquared(other: Point): number;
    length(): number;
    lengthSquared(): number;
    normalize(): Point;
    toString(): string;
}
//# sourceMappingURL=Point.d.ts.map