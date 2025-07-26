/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Point } from './Point';
export declare class Matrix {
    m00: number;
    m01: number;
    m02: number;
    m10: number;
    m11: number;
    m12: number;
    constructor(m00?: number, m01?: number, m02?: number, m10?: number, m11?: number, m12?: number);
    set(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number): Matrix;
    clone(): Matrix;
    multMatrix(other: Matrix): Matrix;
    translate(x: number, y: number): Matrix;
    scale(scaleX: number, scaleY: number): Matrix;
    rotate(radians: number): Matrix;
    transformX(x: number, y: number): number;
    transformY(x: number, y: number): number;
    transform(x: number, y: number, result?: Point): Point;
    inverseTransform(x: number, y: number, result?: Point): boolean;
    getDeterminant(): number;
    invert(): Matrix;
    identity(): Matrix;
    toString(): string;
}
//# sourceMappingURL=Matrix.d.ts.map