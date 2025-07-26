/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Entity } from '../Entity';
import { Action } from './Action';

/**
 * An action that simply waits for a certain amount of time to pass before finishing.
 */
export class Delay implements Action {
    private _duration: number;
    private _elapsed: number = 0;

    constructor(seconds: number) {
        this._duration = seconds;
    }

    public update(dt: number, actor: Entity): number {
        this._elapsed += dt;
        if (this._elapsed >= this._duration) {
            const overtime = this._elapsed - this._duration;
            this._elapsed = 0;
            return dt - overtime;
        }
        return -1;
    }
}
