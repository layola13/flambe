/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Disposable, Constructor } from './util/Disposable';
import { Component } from './Component';
/**
 * A node in the entity hierarchy, and a collection of components.
 *
 * To iterate over the hierarchy, use the parent, firstChild, next and firstComponent fields. For
 * example:
 *
 * ```typescript
 * // Iterate over entity's children
 * let child = entity.firstChild;
 * while (child != null) {
 *     const next = child.next; // Store in case the child is removed in process()
 *     process(child);
 *     child = next;
 * }
 * ```
 */
export declare class Entity implements Disposable {
    /** This entity's parent. */
    parent: Entity | null;
    /** This entity's first child. */
    firstChild: Entity | null;
    /** This entity's next sibling, for iteration. */
    next: Entity | null;
    /** This entity's first component. */
    firstComponent: Component | null;
    private disposed;
    constructor();
    /**
     * Add a component to this entity. Any previous component of this type will be replaced.
     * @returns This instance, for chaining calls.
     */
    add<T extends Component>(component: T): Entity;
    /**
     * Remove a component from this entity.
     * @returns The removed component, or null if not found.
     */
    remove<T extends Component>(componentClass: Constructor<T>): T | null;
    /**
     * Get a component of a given type from this entity.
     */
    get<T extends Component>(componentClass: Constructor<T>): T | null;
    /**
     * Check if this entity has a component of the given type.
     */
    has<T extends Component>(componentClass: Constructor<T>): boolean;
    /**
     * Add a child to this entity.
     * @returns This instance, for chaining calls.
     */
    addChild(entity: Entity, append?: boolean): Entity;
    /**
     * Remove a child from this entity.
     */
    removeChild(entity: Entity): void;
    /**
     * Dispose this entity, removing it from its parent and disposing all components.
     */
    dispose(): void;
    private disposeComponents;
}
//# sourceMappingURL=Entity.d.ts.map