/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export class FMath {
    static max(a, b) {
        return Math.max(a, b);
    }
    static min(a, b) {
        return Math.min(a, b);
    }
    static abs(value) {
        return Math.abs(value);
    }
    static clamp(value, min, max) {
        return value < min ? min : (value > max ? max : value);
    }
    static sign(value) {
        return value > 0 ? 1 : (value < 0 ? -1 : 0);
    }
    static toRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    static toDegrees(radians) {
        return radians * 180 / Math.PI;
    }
    static random() {
        return Math.random();
    }
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    static lerp(from, to, alpha) {
        return from + alpha * (to - from);
    }
}
FMath.PI = Math.PI;
FMath.PI2 = Math.PI * 2;
FMath.FLOAT_MAX = Number.MAX_VALUE;
FMath.FLOAT_MIN = -Number.MAX_VALUE;
//# sourceMappingURL=FMath.js.map