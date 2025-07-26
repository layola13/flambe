/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Component } from '../Component';
import { Disposable } from '../util/Disposable';
import { Action } from './Action';

/**
 * Manages a set of actions that are updated over time. Scripts simplify writing composable
 * animations.
 */
export class Script extends Component {
    private _handles: Handle[] = [];

    constructor() {
        super();
        this.stopAll();
    }

    /**
     * Add an action to this Script.
     * @returns A handle that can be disposed to stop the action.
     */
    public run(action: Action): Disposable {
        const handle = new Handle(action);
        this._handles.push(handle);
        return handle;
    }

    /**
     * Remove all actions from this Script.
     */
    public stopAll(): void {
        this._handles = [];
    }

    public onUpdate(dt: number): void {
        let ii = 0;
        while (ii < this._handles.length) {
            const handle = this._handles[ii];
            if (handle.removed || (this.owner && handle.action.update(dt, this.owner) >= 0)) {
                this._handles.splice(ii, 1);
            } else {
                ++ii;
            }
        }
    }
}

class Handle implements Disposable {
    public removed = false;

    constructor(public readonly action: Action) {
    }

    public dispose(): void {
        this.removed = true;
    }
}
