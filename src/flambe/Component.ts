/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Disposable } from './util/Disposable';

/**
 * Components are bits of data and logic that can be added to entities.
 */
export abstract class Component implements Disposable {
    /** The entity this component is attached to, or null. */
    public owner: any = null; // Will be Entity, avoiding circular import

    /** The owner's next component, for iteration. */
    public next: Component | null = null;

    /**
     * The component's name, generated based on its class. Components with the same name replace
     * each other when added to an entity.
     */
    public get name(): string {
        return this.constructor.name;
    }

    /**
     * Called after this component has been added to an entity.
     */
    public onAdded(): void {
        // Override in subclasses
    }

    /**
     * Called just before this component has been removed from its entity.
     */
    public onRemoved(): void {
        // Override in subclasses
    }

    /**
     * Called just before this component's first update after being added. This is the best place to
     * put initialization logic that requires accessing other components/entities, since it waits
     * until the rest of the entity hierarchy is accessible.
     */
    public onStart(): void {
        // Override in subclasses
    }

    /**
     * Called every frame while this component is active.
     */
    public onUpdate(dt: number): void {
        // Override in subclasses
    }

    /**
     * Called when this component is disposed.
     */
    public dispose(): void {
        // Override in subclasses
    }
}
