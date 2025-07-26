/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    set(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        return this;
    }
    get right() {
        return this.x + this.width;
    }
    get bottom() {
        return this.y + this.height;
    }
    clone() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }
    contains(x, y) {
        return x >= this.x && x < this.right && y >= this.y && y < this.bottom;
    }
    containsPoint(point) {
        return this.contains(point.x, point.y);
    }
    intersects(other) {
        return !(other.x >= this.right ||
            other.right <= this.x ||
            other.y >= this.bottom ||
            other.bottom <= this.y);
    }
    intersection(other) {
        const x = Math.max(this.x, other.x);
        const y = Math.max(this.y, other.y);
        const right = Math.min(this.right, other.right);
        const bottom = Math.min(this.bottom, other.bottom);
        if (x < right && y < bottom) {
            return new Rectangle(x, y, right - x, bottom - y);
        }
        return null;
    }
    isEmpty() {
        return this.width <= 0 || this.height <= 0;
    }
    toString() {
        return `Rectangle(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
    }
}
//# sourceMappingURL=Rectangle.js.map