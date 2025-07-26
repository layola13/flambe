/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Value, Signal0 } from '../util/Disposable';

export enum Orientation {
    Portrait = "portrait",
    Landscape = "landscape"
}

/**
 * Functions related to the environment's display viewport.
 */
export interface StageSystem {
    /** The width of the stage viewport, in pixels. */
    readonly width: number;

    /** The height of the stage viewport, in pixels. */
    readonly height: number;

    /** The current screen orientation. */
    readonly orientation: Value<Orientation>;

    /** Whether this environment supports fullscreen mode. */
    readonly fullscreenSupported: boolean;

    /** Whether fullscreen mode is currently enabled. */
    readonly fullscreen: Value<boolean>;

    /** Emitted when the stage is resized. */
    readonly resize: Signal0;

    /**
     * Locks the orientation to the given value on mobile devices.
     */
    lockOrientation(orientation: Orientation): void;

    /**
     * Unlocks the orientation, allowing it to rotate freely.
     */
    unlockOrientation(): void;

    /**
     * Requests that the stage be resized to the given dimensions.
     */
    requestResize(width: number, height: number): void;

    /**
     * Requests fullscreen mode be enabled or disabled.
     */
    requestFullscreen(enable: boolean): void;
}
