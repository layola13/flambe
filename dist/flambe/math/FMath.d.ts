/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export declare class FMath {
    static readonly PI: number;
    static readonly PI2: number;
    static readonly FLOAT_MAX: number;
    static readonly FLOAT_MIN: number;
    static max(a: number, b: number): number;
    static min(a: number, b: number): number;
    static abs(value: number): number;
    static clamp(value: number, min: number, max: number): number;
    static sign(value: number): number;
    static toRadians(degrees: number): number;
    static toDegrees(radians: number): number;
    static random(): number;
    static randomInt(min: number, max: number): number;
    static randomFloat(min: number, max: number): number;
    static lerp(from: number, to: number, alpha: number): number;
}
//# sourceMappingURL=FMath.d.ts.map