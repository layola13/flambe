/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Component } from '../Component';
import { AnimatedFloat } from '../animation/AnimatedFloat';
import { Entity } from '../Entity';
import { Matrix } from '../math/Matrix';
import { Point } from '../math/Point';
import { Rectangle } from '../math/Rectangle';
import { FMath } from '../math/FMath';
import { Signal1, Signal1Impl, SignalConnection } from '../util/Disposable';

export enum BlendMode {
    Normal = "source-over",
    Add = "lighter",
    Multiply = "multiply",
    Screen = "screen",
    Overlay = "overlay",
    Darken = "darken",
    Lighten = "lighten"
}

// Flags for tracking sprite state
const enum SpriteFlags {
    VISIBLE = 1 << 0,
    POINTER_ENABLED = 1 << 1,
    VIEW_MATRIX_DIRTY = 1 << 2,
    PIXEL_SNAPPING = 1 << 3,
    ROTATION_DIRTY = 1 << 4,
    LOCAL_MATRIX_DIRTY = 1 << 5
}

export interface PointerEvent {
    viewX: number;
    viewY: number;
    localX: number;
    localY: number;
}

export abstract class Sprite extends Component {
    /** X position, in pixels. */
    public x: AnimatedFloat;

    /** Y position, in pixels. */
    public y: AnimatedFloat;

    /** Rotation angle, in degrees. */
    public rotation: AnimatedFloat;

    /** Horizontal scale factor. */
    public scaleX: AnimatedFloat;

    /** Vertical scale factor. */
    public scaleY: AnimatedFloat;

    /** The X position of this sprite's anchor point. */
    public anchorX: AnimatedFloat;

    /** The Y position of this sprite's anchor point. */
    public anchorY: AnimatedFloat;

    /** The alpha (opacity) of this sprite, between 0 and 1. */
    public alpha: AnimatedFloat;

    /** The blend mode used to draw this sprite. */
    public blendMode: BlendMode | null = null;

    /** The scissor rectangle for clipping/masking. */
    public scissor: Rectangle | null = null;

    // Internal state
    private _flags: number;
    private _localMatrix: Matrix;
    private _viewMatrix: Matrix | null = null;

    // Pointer events
    private _pointerDown: Signal1<PointerEvent> | null = null;
    private _pointerMove: Signal1<PointerEvent> | null = null;
    private _pointerUp: Signal1<PointerEvent> | null = null;
    private _pointerIn: Signal1<PointerEvent> | null = null;
    private _pointerOut: Signal1<PointerEvent> | null = null;

    // Static scratch variables
    private static _scratchPoint = new Point();

    constructor() {
        super();
        this._flags = SpriteFlags.VISIBLE | SpriteFlags.POINTER_ENABLED | 
                     SpriteFlags.VIEW_MATRIX_DIRTY | SpriteFlags.PIXEL_SNAPPING | 
                     SpriteFlags.ROTATION_DIRTY;
        this._localMatrix = new Matrix();

        const dirtyMatrix = () => {
            this._flags |= SpriteFlags.LOCAL_MATRIX_DIRTY | SpriteFlags.VIEW_MATRIX_DIRTY;
        };

        this.x = new AnimatedFloat(0);
        this.x.changed.connect(dirtyMatrix);
        
        this.y = new AnimatedFloat(0);
        this.y.changed.connect(dirtyMatrix);
        
        this.rotation = new AnimatedFloat(0);
        this.rotation.changed.connect(() => {
            this._flags |= SpriteFlags.LOCAL_MATRIX_DIRTY | SpriteFlags.VIEW_MATRIX_DIRTY | SpriteFlags.ROTATION_DIRTY;
        });
        
        this.scaleX = new AnimatedFloat(1);
        this.scaleX.changed.connect(dirtyMatrix);
        
        this.scaleY = new AnimatedFloat(1);
        this.scaleY.changed.connect(dirtyMatrix);
        
        this.anchorX = new AnimatedFloat(0);
        this.anchorX.changed.connect(dirtyMatrix);
        
        this.anchorY = new AnimatedFloat(0);
        this.anchorY.changed.connect(dirtyMatrix);

        this.alpha = new AnimatedFloat(1);
    }

    /** Whether this sprite should be drawn. */
    public get visible(): boolean {
        return (this._flags & SpriteFlags.VISIBLE) !== 0;
    }

    public set visible(visible: boolean) {
        if (visible) {
            this._flags |= SpriteFlags.VISIBLE;
        } else {
            this._flags &= ~SpriteFlags.VISIBLE;
        }
    }

    /** Whether position will be rounded to nearest pixel. */
    public get pixelSnapping(): boolean {
        return (this._flags & SpriteFlags.PIXEL_SNAPPING) !== 0;
    }

    public set pixelSnapping(pixelSnapping: boolean) {
        if (pixelSnapping) {
            this._flags |= SpriteFlags.PIXEL_SNAPPING;
        } else {
            this._flags &= ~SpriteFlags.PIXEL_SNAPPING;
        }
    }

    /** Whether this sprite should receive pointer events. */
    public get pointerEnabled(): boolean {
        return (this._flags & SpriteFlags.POINTER_ENABLED) !== 0;
    }

    public set pointerEnabled(pointerEnabled: boolean) {
        if (pointerEnabled) {
            this._flags |= SpriteFlags.POINTER_ENABLED;
        } else {
            this._flags &= ~SpriteFlags.POINTER_ENABLED;
        }
    }

    // Pointer event signals
    public get pointerDown(): Signal1<PointerEvent> {
        if (!this._pointerDown) {
            this._pointerDown = new Signal1Impl<PointerEvent>();
        }
        return this._pointerDown;
    }

    public get pointerMove(): Signal1<PointerEvent> {
        if (!this._pointerMove) {
            this._pointerMove = new Signal1Impl<PointerEvent>();
        }
        return this._pointerMove;
    }

    public get pointerUp(): Signal1<PointerEvent> {
        if (!this._pointerUp) {
            this._pointerUp = new Signal1Impl<PointerEvent>();
        }
        return this._pointerUp;
    }

    public get pointerIn(): Signal1<PointerEvent> {
        if (!this._pointerIn) {
            this._pointerIn = new Signal1Impl<PointerEvent>();
        }
        return this._pointerIn;
    }

    public get pointerOut(): Signal1<PointerEvent> {
        if (!this._pointerOut) {
            this._pointerOut = new Signal1Impl<PointerEvent>();
        }
        return this._pointerOut;
    }

    public onUpdate(dt: number): void {
        // Update animations
        this.x.update(dt);
        this.y.update(dt);
        this.rotation.update(dt);
        this.scaleX.update(dt);
        this.scaleY.update(dt);
        this.alpha.update(dt);
        this.anchorX.update(dt);
        this.anchorY.update(dt);
    }

    /**
     * Search for a sprite under the given point in local coordinates.
     */
    public static hitTest(entity: Entity, x: number, y: number): Sprite | null {
        // Find any sprite component (we'll check if it's actually a Sprite)
        let component = entity.firstComponent;
        let sprite: Sprite | null = null;
        
        while (component != null) {
            if (component instanceof Sprite) {
                sprite = component;
                break;
            }
            component = component.next;
        }

        if (sprite != null) {
            if (!sprite.visible || !sprite.pointerEnabled) {
                return null; // Prune invisible or non-interactive subtrees
            }
            
            const localMatrix = sprite.getLocalMatrix();
            if (localMatrix.inverseTransform(x, y, Sprite._scratchPoint)) {
                x = Sprite._scratchPoint.x;
                y = Sprite._scratchPoint.y;
            }

            const scissor = sprite.scissor;
            if (scissor != null && !scissor.contains(x, y)) {
                return null; // Outside scissor rectangle
            }
        }

        // Hit test children, front to back
        const result = Sprite.hitTestBackwards(entity.firstChild, x, y);
        if (result != null) {
            return result;
        }

        // Finally hit test the sprite itself
        return (sprite != null && sprite.containsLocal(x, y)) ? sprite : null;
    }

    private static hitTestBackwards(entity: Entity | null, x: number, y: number): Sprite | null {
        if (entity == null) {
            return null;
        }

        // First test the last child (which renders on top)
        const result = Sprite.hitTestBackwards(entity.next, x, y);
        if (result != null) {
            return result;
        }

        // Then test this entity
        return Sprite.hitTest(entity, x, y);
    }

    /**
     * Calculate the bounding box of an entity hierarchy.
     */
    public static getBounds(entity: Entity, result?: Rectangle): Rectangle {
        if (!result) {
            result = new Rectangle();
        }

        // Hijack width/height to store bottom right corner initially
        result.set(FMath.FLOAT_MAX, FMath.FLOAT_MAX, FMath.FLOAT_MIN, FMath.FLOAT_MIN);
        Sprite.getBoundsImpl(entity, null, result);

        // Convert back to true width and height
        result.width -= result.x;
        result.height -= result.y;
        return result;
    }

    private static getBoundsImpl(entity: Entity, matrix: Matrix | null, result: Rectangle): void {
        // Find sprite component
        let component = entity.firstComponent;
        let sprite: Sprite | null = null;
        
        while (component != null) {
            if (component instanceof Sprite) {
                sprite = component;
                break;
            }
            component = component.next;
        }

        let childMatrix = matrix;

        if (sprite != null && sprite.visible) {
            if (matrix != null) {
                childMatrix = matrix.clone().multMatrix(sprite.getLocalMatrix());
            } else {
                childMatrix = sprite.getLocalMatrix();
            }

            const naturalWidth = sprite.getNaturalWidth();
            const naturalHeight = sprite.getNaturalHeight();

            if (naturalWidth > 0 && naturalHeight > 0) {
                // Transform the four corners
                const x1 = 0, y1 = 0;
                const x2 = naturalWidth, y2 = 0;
                const x3 = 0, y3 = naturalHeight;
                const x4 = naturalWidth, y4 = naturalHeight;

                const points = [
                    childMatrix.transformX(x1, y1), childMatrix.transformY(x1, y1),
                    childMatrix.transformX(x2, y2), childMatrix.transformY(x2, y2),
                    childMatrix.transformX(x3, y3), childMatrix.transformY(x3, y3),
                    childMatrix.transformX(x4, y4), childMatrix.transformY(x4, y4)
                ];

                for (let i = 0; i < points.length; i += 2) {
                    const x = points[i];
                    const y = points[i + 1];

                    if (x < result.x) result.x = x;
                    if (y < result.y) result.y = y;
                    if (x > result.width) result.width = x;
                    if (y > result.height) result.height = y;
                }
            }
        }

        // Recurse through children
        let child = entity.firstChild;
        while (child != null) {
            Sprite.getBoundsImpl(child, childMatrix, result);
            child = child.next;
        }
    }

    /**
     * The "natural" width of this sprite, without transformations.
     */
    public abstract getNaturalWidth(): number;

    /**
     * The "natural" height of this sprite, without transformations.
     */
    public abstract getNaturalHeight(): number;

    /**
     * Returns true if the given point (in viewport coordinates) lies inside this sprite.
     */
    public contains(viewX: number, viewY: number): boolean {
        const viewMatrix = this.getViewMatrix();
        return viewMatrix.inverseTransform(viewX, viewY, Sprite._scratchPoint) &&
               this.containsLocal(Sprite._scratchPoint.x, Sprite._scratchPoint.y);
    }

    /**
     * Returns true if the given point (in local coordinates) lies inside this sprite.
     */
    public containsLocal(localX: number, localY: number): boolean {
        return localX >= 0 && localX < this.getNaturalWidth() &&
               localY >= 0 && localY < this.getNaturalHeight();
    }

    /**
     * Returns the local transformation matrix, relative to the parent.
     */
    public getLocalMatrix(): Matrix {
        if ((this._flags & SpriteFlags.LOCAL_MATRIX_DIRTY) !== 0) {
            this._flags &= ~SpriteFlags.LOCAL_MATRIX_DIRTY;

            const matrix = this._localMatrix;
            const x = this.x._;
            const y = this.y._;
            const anchorX = this.anchorX._;
            const anchorY = this.anchorY._;

            if ((this._flags & SpriteFlags.ROTATION_DIRTY) !== 0) {
                this._flags &= ~SpriteFlags.ROTATION_DIRTY;
                
                const rotation = FMath.toRadians(this.rotation._);
                const sin = Math.sin(rotation);
                const cos = Math.cos(rotation);
                const scaleX = this.scaleX._;
                const scaleY = this.scaleY._;

                matrix.set(scaleX * cos, scaleX * sin, -scaleY * sin, scaleY * cos,
                          x - anchorX * cos + anchorY * sin,
                          y - anchorX * sin - anchorY * cos);
            } else {
                // No rotation, use simpler math
                matrix.set(this.scaleX._, 0, 0, this.scaleY._,
                          x - anchorX * this.scaleX._,
                          y - anchorY * this.scaleY._);
            }
        }
        return this._localMatrix;
    }

    /**
     * Returns the view transformation matrix, from local to viewport coordinates.
     */
    public getViewMatrix(): Matrix {
        if ((this._flags & SpriteFlags.VIEW_MATRIX_DIRTY) !== 0) {
            this._flags &= ~SpriteFlags.VIEW_MATRIX_DIRTY;

            const entity = this.owner;
            if (entity && entity.parent) {
                // Find parent sprite
                let parentComponent = entity.parent.firstComponent;
                let parentSprite: Sprite | null = null;
                
                while (parentComponent != null) {
                    if (parentComponent instanceof Sprite) {
                        parentSprite = parentComponent;
                        break;
                    }
                    parentComponent = parentComponent.next;
                }

                if (parentSprite) {
                    if (!this._viewMatrix) {
                        this._viewMatrix = new Matrix();
                    }
                    const parentMatrix = parentSprite.getViewMatrix();
                    this._viewMatrix.set(
                        parentMatrix.m00, parentMatrix.m01, parentMatrix.m02,
                        parentMatrix.m10, parentMatrix.m11, parentMatrix.m12
                    ).multMatrix(this.getLocalMatrix());
                } else {
                    this._viewMatrix = this.getLocalMatrix();
                }
            } else {
                this._viewMatrix = this.getLocalMatrix();
            }
        }
        return this._viewMatrix || this.getLocalMatrix();
    }

    public centerAnchor(): Sprite {
        this.anchorX._ = this.getNaturalWidth() / 2;
        this.anchorY._ = this.getNaturalHeight() / 2;
        return this;
    }

    public setXY(x: number, y: number): Sprite {
        this.x._ = x;
        this.y._ = y;
        return this;
    }

    public setScale(scale: number): Sprite {
        this.scaleX._ = scale;
        this.scaleY._ = scale;
        return this;
    }

    public setAlpha(alpha: number): Sprite {
        this.alpha._ = alpha;
        return this;
    }

    public setAnchor(anchorX: number, anchorY: number): Sprite {
        this.anchorX._ = anchorX;
        this.anchorY._ = anchorY;
        return this;
    }

    /**
     * Abstract method for drawing the sprite.
     */
    public abstract draw(ctx: CanvasRenderingContext2D): void;

    public dispose(): void {
        super.dispose();
        if (this._pointerDown) this._pointerDown = null;
        if (this._pointerMove) this._pointerMove = null;
        if (this._pointerUp) this._pointerUp = null;
        if (this._pointerIn) this._pointerIn = null;
        if (this._pointerOut) this._pointerOut = null;
    }
}
