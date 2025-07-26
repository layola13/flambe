/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    distance(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    distanceSquared(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return dx * dx + dy * dy;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    normalize() {
        const length = this.length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }
    toString() {
        return `Point(${this.x}, ${this.y})`;
    }
}
//# sourceMappingURL=Point.js.map