/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Component } from '../Component';
import { Entity } from '../Entity';
import { Scene } from './Scene';
import { Transition } from './Transition';

/**
 * Manages a stack of scenes. Only the front-most scene receives game updates.
 */
export class Director extends Component {
    /** The complete list of scenes managed by this director, from back to front. */
    public readonly scenes: Entity[] = [];

    /**
     * The scenes that are partially occluded by a transparent or transitioning scene, from back to
     * front. These scenes are not updated, but they're still drawn.
     */
    public readonly occludedScenes: Entity[] = [];

    private _root: Entity;
    private _transitor: Transitor | null = null;
    private _width: number = 0;
    private _height: number = 0;

    constructor() {
        super();
        this._root = new Entity();
    }

    /** The front-most scene. */
    public get topScene(): Entity | null {
        return this.scenes.length > 0 ? this.scenes[this.scenes.length - 1] : null;
    }

    /** Whether the director is currently transitioning between scenes. */
    public get transitioning(): boolean {
        return this._transitor !== null;
    }

    /** The ideal width of the director's scenes. Used by some transitions. */
    public get width(): number {
        return this._width || (this.owner && (this.owner as any).stage ? (this.owner as any).stage.width : 800);
    }

    /** The ideal height of the director's scenes. Used by some transitions. */
    public get height(): number {
        return this._height || (this.owner && (this.owner as any).stage ? (this.owner as any).stage.height : 600);
    }

    /**
     * Sets the ideal size of the scenes in this director.
     */
    public setSize(width: number, height: number): Director {
        this._width = width;
        this._height = height;
        return this;
    }

    public pushScene(scene: Entity, transition?: Transition): void {
        this.completeTransition();

        const oldTop = this.topScene;
        if (oldTop !== null) {
            this.playTransition(oldTop, scene, transition, () => {
                this.hide(oldTop);
            });
        } else {
            this.add(scene);
            this.invalidateVisibility();
        }
    }

    public popScene(transition?: Transition): void {
        this.completeTransition();

        const oldTop = this.topScene;
        if (oldTop !== null) {
            this.scenes.pop(); // Pop oldTop
            const newTop = this.topScene;
            if (newTop !== null) {
                this.playTransition(oldTop, newTop, transition, () => {
                    this.hideAndDispose(oldTop);
                });
            } else {
                this.hideAndDispose(oldTop);
                this.invalidateVisibility();
            }
        }
    }

    /**
     * Pops the scene stack until the given entity is the top scene, or adds the scene if the stack
     * becomes empty while popping.
     */
    public unwindToScene(scene: Entity, transition?: Transition): void {
        this.completeTransition();

        const oldTop = this.topScene;
        if (oldTop !== null) {
            if (oldTop === scene) {
                return; // We're already there
            }

            this.scenes.pop(); // Pop oldTop
            while (this.scenes.length > 0 && this.scenes[this.scenes.length - 1] !== scene) {
                const removed = this.scenes.pop();
                if (removed) {
                    removed.dispose(); // Don't emit a hide, just dispose them
                }
            }

            this.playTransition(oldTop, scene, transition, () => {
                this.hideAndDispose(oldTop);
            });

        } else {
            this.pushScene(scene, transition);
        }
    }

    public onAdded(): void {
        if (this.owner) {
            this.owner.addChild(this._root);
        }
    }

    public onRemoved(): void {
        this.completeTransition();

        for (const scene of this.scenes) {
            scene.dispose();
        }
        this.scenes.length = 0;
        this.occludedScenes.length = 0;

        this._root.dispose();
    }

    public onUpdate(dt: number): void {
        if (this._transitor && this._transitor.update(dt)) {
            this.completeTransition();
        }
    }

    private add(scene: Entity): void {
        const oldTop = this.topScene;
        if (oldTop !== null) {
            this._root.removeChild(oldTop);
        }

        // Remove scene if it already exists
        const index = this.scenes.indexOf(scene);
        if (index >= 0) {
            this.scenes.splice(index, 1);
        }

        this.scenes.push(scene);
        this._root.addChild(scene);
    }

    private hide(scene: Entity): void {
        // Find scene component
        let component = scene.firstComponent;
        while (component) {
            if (component instanceof Scene) {
                (component as Scene).hidden.emit();
                break;
            }
            component = component.next;
        }
    }

    private hideAndDispose(scene: Entity): void {
        this.hide(scene);
        scene.dispose();
    }

    private show(scene: Entity): void {
        // Find scene component
        let component = scene.firstComponent;
        while (component) {
            if (component instanceof Scene) {
                (component as Scene).shown.emit();
                break;
            }
            component = component.next;
        }
    }

    private invalidateVisibility(): void {
        // Find the last index of an opaque scene, or 0
        let ii = this.scenes.length;
        while (ii > 0) {
            const scene = this.scenes[--ii];
            let component = scene.firstComponent;
            let sceneComp: Scene | null = null;
            
            while (component) {
                if (component instanceof Scene) {
                    sceneComp = component as Scene;
                    break;
                }
                component = component.next;
            }

            if (sceneComp === null || sceneComp.opaque) {
                break;
            }
        }

        // All visible scenes up to, but not including, the top scene
        this.occludedScenes.length = 0;
        if (this.scenes.length > 0) {
            for (let i = ii; i < this.scenes.length - 1; i++) {
                this.occludedScenes.push(this.scenes[i]);
            }
        }

        const topScene = this.topScene;
        if (topScene) {
            this.show(topScene);
        }
    }

    private playTransition(from: Entity, to: Entity, transition?: Transition, onComplete?: () => void): void {
        this.add(to);

        if (transition) {
            this._transitor = new Transitor(from, to, transition, onComplete);
        } else {
            this.invalidateVisibility();
            if (onComplete) {
                onComplete();
            }
        }
    }

    private completeTransition(): void {
        if (this._transitor) {
            this._transitor.complete();
            this._transitor = null;
        }
    }
}

// Helper class for managing transitions
class Transitor {
    private _from: Entity;
    private _to: Entity;
    private _transition: Transition;
    private _onComplete?: () => void;

    constructor(from: Entity, to: Entity, transition: Transition, onComplete?: () => void) {
        this._from = from;
        this._to = to;
        this._transition = transition;
        this._onComplete = onComplete;
    }

    public update(dt: number): boolean {
        // TODO: Implement transition logic
        return true; // For now, complete immediately
    }

    public complete(): void {
        if (this._onComplete) {
            this._onComplete();
        }
    }
}
