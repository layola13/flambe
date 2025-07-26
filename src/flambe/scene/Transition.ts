/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Entity } from '../Entity';

/**
 * A transition between two scenes.
 */
export abstract class Transition {
    protected _director: any; // Director reference
    protected _from: Entity | null = null;
    protected _to: Entity | null = null;

    /**
     * Called by the Director to start the transition.
     */
    public init(director: any, from: Entity, to: Entity): void {
        this._director = director;
        this._from = from;
        this._to = to;
    }

    /**
     * Called by the Director to update the transition.
     * @returns True if the transition is complete.
     */
    public abstract update(dt: number): boolean;

    /**
     * Called when the transition is complete to clean up.
     */
    public complete(): void {
        // Override in subclasses if needed
    }
}
