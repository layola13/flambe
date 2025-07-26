/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Component } from '../Component';
import { Signal0, Signal0Impl } from '../util/Disposable';

/**
 * Optional, extra functionality for scene entities that are added to a Director.
 */
export class Scene extends Component {
    /** Emitted by the Director when this scene becomes the top scene. */
    public readonly shown: Signal0;

    /** Emitted by the Director when this scene is no longer the top scene. */
    public readonly hidden: Signal0;

    /**
     * When true, hints that scenes below this one don't need to be rendered. Scenes that don't fill
     * the entire stage or have a transparent background should set this to false.
     */
    public readonly opaque: boolean;

    constructor(opaque = true) {
        super();
        this.opaque = opaque;
        this.shown = new Signal0Impl();
        this.hidden = new Signal0Impl();
    }
}
