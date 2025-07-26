/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export class FMath {
    public static readonly PI = Math.PI;
    public static readonly PI2 = Math.PI * 2;
    public static readonly FLOAT_MAX = Number.MAX_VALUE;
    public static readonly FLOAT_MIN = -Number.MAX_VALUE;

    public static max(a: number, b: number): number {
        return Math.max(a, b);
    }

    public static min(a: number, b: number): number {
        return Math.min(a, b);
    }

    public static abs(value: number): number {
        return Math.abs(value);
    }

    public static clamp(value: number, min: number, max: number): number {
        return value < min ? min : (value > max ? max : value);
    }

    public static sign(value: number): number {
        return value > 0 ? 1 : (value < 0 ? -1 : 0);
    }

    public static toRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    public static toDegrees(radians: number): number {
        return radians * 180 / Math.PI;
    }

    public static random(): number {
        return Math.random();
    }

    public static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static lerp(from: number, to: number, alpha: number): number {
        return from + alpha * (to - from);
    }
}
