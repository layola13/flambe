/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Component } from '../Component';
import { AnimatedFloat } from '../animation/AnimatedFloat';
import { Entity } from '../Entity';
import { Matrix } from '../math/Matrix';
import { Rectangle } from '../math/Rectangle';
import { Signal1 } from '../util/Disposable';
export declare enum BlendMode {
    Normal = "source-over",
    Add = "lighter",
    Multiply = "multiply",
    Screen = "screen",
    Overlay = "overlay",
    Darken = "darken",
    Lighten = "lighten"
}
export interface PointerEvent {
    viewX: number;
    viewY: number;
    localX: number;
    localY: number;
}
export declare abstract class Sprite extends Component {
    /** X position, in pixels. */
    x: AnimatedFloat;
    /** Y position, in pixels. */
    y: AnimatedFloat;
    /** Rotation angle, in degrees. */
    rotation: AnimatedFloat;
    /** Horizontal scale factor. */
    scaleX: AnimatedFloat;
    /** Vertical scale factor. */
    scaleY: AnimatedFloat;
    /** The X position of this sprite's anchor point. */
    anchorX: AnimatedFloat;
    /** The Y position of this sprite's anchor point. */
    anchorY: AnimatedFloat;
    /** The alpha (opacity) of this sprite, between 0 and 1. */
    alpha: AnimatedFloat;
    /** The blend mode used to draw this sprite. */
    blendMode: BlendMode | null;
    /** The scissor rectangle for clipping/masking. */
    scissor: Rectangle | null;
    private _flags;
    private _localMatrix;
    private _viewMatrix;
    private _pointerDown;
    private _pointerMove;
    private _pointerUp;
    private _pointerIn;
    private _pointerOut;
    private static _scratchPoint;
    constructor();
    /** Whether this sprite should be drawn. */
    get visible(): boolean;
    set visible(visible: boolean);
    /** Whether position will be rounded to nearest pixel. */
    get pixelSnapping(): boolean;
    set pixelSnapping(pixelSnapping: boolean);
    /** Whether this sprite should receive pointer events. */
    get pointerEnabled(): boolean;
    set pointerEnabled(pointerEnabled: boolean);
    get pointerDown(): Signal1<PointerEvent>;
    get pointerMove(): Signal1<PointerEvent>;
    get pointerUp(): Signal1<PointerEvent>;
    get pointerIn(): Signal1<PointerEvent>;
    get pointerOut(): Signal1<PointerEvent>;
    onUpdate(dt: number): void;
    /**
     * Search for a sprite under the given point in local coordinates.
     */
    static hitTest(entity: Entity, x: number, y: number): Sprite | null;
    private static hitTestBackwards;
    /**
     * Calculate the bounding box of an entity hierarchy.
     */
    static getBounds(entity: Entity, result?: Rectangle): Rectangle;
    private static getBoundsImpl;
    /**
     * The "natural" width of this sprite, without transformations.
     */
    abstract getNaturalWidth(): number;
    /**
     * The "natural" height of this sprite, without transformations.
     */
    abstract getNaturalHeight(): number;
    /**
     * Returns true if the given point (in viewport coordinates) lies inside this sprite.
     */
    contains(viewX: number, viewY: number): boolean;
    /**
     * Returns true if the given point (in local coordinates) lies inside this sprite.
     */
    containsLocal(localX: number, localY: number): boolean;
    /**
     * Returns the local transformation matrix, relative to the parent.
     */
    getLocalMatrix(): Matrix;
    /**
     * Returns the view transformation matrix, from local to viewport coordinates.
     */
    getViewMatrix(): Matrix;
    centerAnchor(): Sprite;
    setXY(x: number, y: number): Sprite;
    setScale(scale: number): Sprite;
    setAlpha(alpha: number): Sprite;
    setAnchor(anchorX: number, anchorY: number): Sprite;
    /**
     * Abstract method for drawing the sprite.
     */
    abstract draw(ctx: CanvasRenderingContext2D): void;
    dispose(): void;
}
//# sourceMappingURL=Sprite.d.ts.map