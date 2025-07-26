/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { MouseButton, MouseEvent } from '../input/MouseEvent';
import { MouseCursor } from '../input/MouseCursor';
import { Signal1, Signal1Impl } from '../util/Disposable';

/**
 * Functions related to the environment's mouse.
 */
export interface MouseSystem {
    /**
     * True if the environment has a mouse.
     */
    readonly supported: boolean;

    /**
     * Emitted when a mouse button is pressed down.
     */
    readonly down: Signal1<MouseEvent>;

    /**
     * Emitted when the mouse cursor is moved while over the stage.
     */
    readonly move: Signal1<MouseEvent>;

    /**
     * Emitted when a mouse button is released.
     */
    readonly up: Signal1<MouseEvent>;

    /**
     * A velocity emitted when the mouse wheel or trackpad is scrolled. A positive value is an
     * upward scroll, negative is a downward scroll. Typically, each scroll wheel "click" equates to
     * 1 velocity.
     */
    readonly scroll: Signal1<number>;

    /**
     * The last recorded X coordinate of the mouse.
     */
    readonly x: number;

    /**
     * The last recorded Y coordinate of the mouse.
     */
    readonly y: number;

    /**
     * The style of the mouse cursor.
     */
    cursor: MouseCursor;

    /**
     * @returns True if the given button is currently being held down.
     */
    isDown(button: MouseButton): boolean;
}

/**
 * Basic HTML5 mouse system implementation
 */
export class HTMLMouseSystem implements MouseSystem {
    public readonly supported = true;
    public readonly down = new Signal1Impl<MouseEvent>();
    public readonly move = new Signal1Impl<MouseEvent>();
    public readonly up = new Signal1Impl<MouseEvent>();
    public readonly scroll = new Signal1Impl<number>();

    private _x = 0;
    private _y = 0;
    private _cursor = MouseCursor.Default;
    private _buttonsDown = new Set<MouseButton>();
    private _canvas: HTMLCanvasElement | null = null;

    constructor(canvas?: HTMLCanvasElement) {
        this._canvas = canvas || null;
        this.setupEventListeners();
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get cursor(): MouseCursor {
        return this._cursor;
    }

    public set cursor(value: MouseCursor) {
        this._cursor = value;
        if (this._canvas) {
            this._canvas.style.cursor = value;
        } else {
            document.body.style.cursor = value;
        }
    }

    public isDown(button: MouseButton): boolean {
        return this._buttonsDown.has(button);
    }

    private setupEventListeners(): void {
        const target = this._canvas || window;

        target.addEventListener('mousedown', (event) => {
            const mouseEvent = event as globalThis.MouseEvent;
            this.updatePosition(mouseEvent);
            const button = this.htmlButtonToFlambeButton(mouseEvent.button);
            if (button !== null) {
                this._buttonsDown.add(button);
                const flambeEvent = new MouseEvent(this._x, this._y, button);
                this.down.emit(flambeEvent);
            }
            event.preventDefault();
        });

        target.addEventListener('mousemove', (event) => {
            const mouseEvent = event as globalThis.MouseEvent;
            this.updatePosition(mouseEvent);
            const flambeEvent = new MouseEvent(this._x, this._y, MouseButton.Left);
            this.move.emit(flambeEvent);
        });

        target.addEventListener('mouseup', (event) => {
            const mouseEvent = event as globalThis.MouseEvent;
            this.updatePosition(mouseEvent);
            const button = this.htmlButtonToFlambeButton(mouseEvent.button);
            if (button !== null) {
                this._buttonsDown.delete(button);
                const flambeEvent = new MouseEvent(this._x, this._y, button);
                this.up.emit(flambeEvent);
            }
            event.preventDefault();
        });

        target.addEventListener('wheel', (event) => {
            const wheelEvent = event as WheelEvent;
            // Normalize wheel delta
            const delta = wheelEvent.deltaY > 0 ? -1 : 1;
            this.scroll.emit(delta);
            event.preventDefault();
        });
    }

    private updatePosition(event: globalThis.MouseEvent): void {
        if (this._canvas) {
            const rect = this._canvas.getBoundingClientRect();
            this._x = event.clientX - rect.left;
            this._y = event.clientY - rect.top;
        } else {
            this._x = event.clientX;
            this._y = event.clientY;
        }
    }

    private htmlButtonToFlambeButton(button: number): MouseButton | null {
        switch (button) {
            case 0: return MouseButton.Left;
            case 1: return MouseButton.Middle;
            case 2: return MouseButton.Right;
            default: return null;
        }
    }
}
