/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2,
    Unknown = -1
}

export class MouseEvent {
    /** The X position of the mouse, in view (stage) coordinates. */
    public viewX: number;

    /** The Y position of the mouse, in view (stage) coordinates. */
    public viewY: number;

    /** The mouse button that caused this event, or null for movement events. */
    public button: MouseButton | null;

    /** An incrementing ID unique to every dispatched mouse event. */
    public id: number;

    constructor(id = 0, viewX = 0, viewY = 0, button: MouseButton | null = null) {
        this.id = id;
        this.viewX = viewX;
        this.viewY = viewY;
        this.button = button;
    }

    public clone(): MouseEvent {
        return new MouseEvent(this.id, this.viewX, this.viewY, this.button);
    }
}
