/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Entity } from '../Entity';
import { Action } from './Action';

/**
 * An action that calls a given function once and immediately completes.
 */
export class CallFunction implements Action {
    private _fn: () => void;

    constructor(fn: () => void) {
        this._fn = fn;
    }

    public update(dt: number, actor: Entity): number {
        this._fn();
        return 0;
    }
}
