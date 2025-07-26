/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export class Point {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public set(x: number, y: number): Point {
        this.x = x;
        this.y = y;
        return this;
    }

    public equals(other: Point): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public add(other: Point): Point {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    public subtract(other: Point): Point {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    public multiply(scalar: number): Point {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    public distance(other: Point): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public distanceSquared(other: Point): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return dx * dx + dy * dy;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    public normalize(): Point {
        const length = this.length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    public toString(): string {
        return `Point(${this.x}, ${this.y})`;
    }
}
