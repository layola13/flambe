/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Point } from './Point';
export class Matrix {
    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0) {
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
    }
    set(m00, m01, m02, m10, m11, m12) {
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        return this;
    }
    clone() {
        return new Matrix(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12);
    }
    multMatrix(other) {
        const m00 = this.m00 * other.m00 + this.m01 * other.m10;
        const m01 = this.m00 * other.m01 + this.m01 * other.m11;
        const m02 = this.m00 * other.m02 + this.m01 * other.m12 + this.m02;
        const m10 = this.m10 * other.m00 + this.m11 * other.m10;
        const m11 = this.m10 * other.m01 + this.m11 * other.m11;
        const m12 = this.m10 * other.m02 + this.m11 * other.m12 + this.m12;
        return this.set(m00, m01, m02, m10, m11, m12);
    }
    translate(x, y) {
        this.m02 += this.m00 * x + this.m01 * y;
        this.m12 += this.m10 * x + this.m11 * y;
        return this;
    }
    scale(scaleX, scaleY) {
        this.m00 *= scaleX;
        this.m01 *= scaleY;
        this.m10 *= scaleX;
        this.m11 *= scaleY;
        return this;
    }
    rotate(radians) {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        const m00 = this.m00 * cos - this.m01 * sin;
        const m01 = this.m00 * sin + this.m01 * cos;
        const m10 = this.m10 * cos - this.m11 * sin;
        const m11 = this.m10 * sin + this.m11 * cos;
        this.m00 = m00;
        this.m01 = m01;
        this.m10 = m10;
        this.m11 = m11;
        return this;
    }
    transformX(x, y) {
        return this.m00 * x + this.m01 * y + this.m02;
    }
    transformY(x, y) {
        return this.m10 * x + this.m11 * y + this.m12;
    }
    transform(x, y, result) {
        if (!result) {
            result = new Point();
        }
        result.x = this.transformX(x, y);
        result.y = this.transformY(x, y);
        return result;
    }
    inverseTransform(x, y, result) {
        if (!result) {
            result = new Point();
        }
        const det = this.getDeterminant();
        if (Math.abs(det) < 1e-10) {
            return false; // Matrix is not invertible
        }
        const dx = x - this.m02;
        const dy = y - this.m12;
        result.x = (this.m11 * dx - this.m01 * dy) / det;
        result.y = (this.m00 * dy - this.m10 * dx) / det;
        return true;
    }
    getDeterminant() {
        return this.m00 * this.m11 - this.m01 * this.m10;
    }
    invert() {
        const det = this.getDeterminant();
        if (Math.abs(det) < 1e-10) {
            throw new Error("Matrix is not invertible");
        }
        const m00 = this.m11 / det;
        const m01 = -this.m01 / det;
        const m02 = (this.m01 * this.m12 - this.m11 * this.m02) / det;
        const m10 = -this.m10 / det;
        const m11 = this.m00 / det;
        const m12 = (this.m10 * this.m02 - this.m00 * this.m12) / det;
        return this.set(m00, m01, m02, m10, m11, m12);
    }
    identity() {
        return this.set(1, 0, 0, 0, 1, 0);
    }
    toString() {
        return `Matrix(${this.m00}, ${this.m01}, ${this.m02}, ${this.m10}, ${this.m11}, ${this.m12})`;
    }
}
//# sourceMappingURL=Matrix.js.map