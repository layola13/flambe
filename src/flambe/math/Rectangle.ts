/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export class Rectangle {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public set(x: number, y: number, width: number, height: number): Rectangle {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        return this;
    }

    public get right(): number {
        return this.x + this.width;
    }

    public get bottom(): number {
        return this.y + this.height;
    }

    public clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    public contains(x: number, y: number): boolean {
        return x >= this.x && x < this.right && y >= this.y && y < this.bottom;
    }

    public containsPoint(point: { x: number; y: number }): boolean {
        return this.contains(point.x, point.y);
    }

    public intersects(other: Rectangle): boolean {
        return !(other.x >= this.right || 
                other.right <= this.x || 
                other.y >= this.bottom || 
                other.bottom <= this.y);
    }

    public intersection(other: Rectangle): Rectangle | null {
        const x = Math.max(this.x, other.x);
        const y = Math.max(this.y, other.y);
        const right = Math.min(this.right, other.right);
        const bottom = Math.min(this.bottom, other.bottom);

        if (x < right && y < bottom) {
            return new Rectangle(x, y, right - x, bottom - y);
        }
        return null;
    }

    public isEmpty(): boolean {
        return this.width <= 0 || this.height <= 0;
    }

    public toString(): string {
        return `Rectangle(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
    }
}
