/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Entity } from '../Entity';

/**
 * Represents a unit of execution that is called over time.
 */
export interface Action {
    /**
     * Called when the acting entity has been updated.
     *
     * @param dt The time elapsed since the last frame, in seconds.
     * @param actor The entity of the Script that this action was added to.
     * @returns The amount of time in seconds spent this frame to finish the action, which may be
     *   less than dt. Or -1 if the action is not yet finished.
     */
    update(dt: number, actor: Entity): number;
}
