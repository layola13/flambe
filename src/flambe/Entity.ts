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
export class Entity implements Disposable {
    /** This entity's parent. */
    public parent: Entity | null = null;

    /** This entity's first child. */
    public firstChild: Entity | null = null;

    /** This entity's next sibling, for iteration. */
    public next: Entity | null = null;

    /** This entity's first component. */
    public firstComponent: Component | null = null;

    private disposed = false;

    constructor() {
    }

    /**
     * Add a component to this entity. Any previous component of this type will be replaced.
     * @returns This instance, for chaining calls.
     */
    public add<T extends Component>(component: T): Entity {
        // Remove any existing component with the same name
        this.remove(component.constructor as Constructor<Component>);

        component.owner = this;
        component.next = this.firstComponent;
        this.firstComponent = component;

        if (component.onAdded) {
            component.onAdded();
        }

        return this;
    }

    /**
     * Remove a component from this entity.
     * @returns The removed component, or null if not found.
     */
    public remove<T extends Component>(componentClass: Constructor<T>): T | null {
        let prev: Component | null = null;
        let component = this.firstComponent;

        while (component != null) {
            const next = component.next;
            if (component instanceof componentClass) {
                // Splice out the component
                if (prev != null) {
                    prev.next = next;
                } else {
                    this.firstComponent = next;
                }

                if (component.onRemoved) {
                    component.onRemoved();
                }
                component.owner = null;
                component.next = null;
                return component as T;
            }
            prev = component;
            component = next;
        }
        return null;
    }

    /**
     * Get a component of a given type from this entity.
     */
    public get<T extends Component>(componentClass: Constructor<T>): T | null {
        let component = this.firstComponent;
        while (component != null) {
            if (component.constructor === componentClass) {
                return component as T;
            }
            component = component.next;
        }
        return null;
    }

    /**
     * Check if this entity has a component of the given type.
     */
    public has<T extends Component>(componentClass: Constructor<T>): boolean {
        return this.get(componentClass) != null;
    }

    /**
     * Add a child to this entity.
     * @returns This instance, for chaining calls.
     */
    public addChild(entity: Entity, append = true): Entity {
        if (entity.parent != null) {
            entity.parent.removeChild(entity);
        }
        entity.parent = this;

        if (append) {
            // Append to the end of the child list
            let tail = this.firstChild;
            if (tail != null) {
                while (tail.next != null) {
                    tail = tail.next;
                }
                tail.next = entity;
            } else {
                this.firstChild = entity;
            }
        } else {
            // Prepend to the beginning
            entity.next = this.firstChild;
            this.firstChild = entity;
        }

        return this;
    }

    /**
     * Remove a child from this entity.
     */
    public removeChild(entity: Entity): void {
        let prev: Entity | null = null;
        let child = this.firstChild;

        while (child != null) {
            const next = child.next;
            if (child === entity) {
                // Splice out the child
                if (prev != null) {
                    prev.next = next;
                } else {
                    this.firstChild = next;
                }
                child.parent = null;
                child.next = null;
                return;
            }
            prev = child;
            child = next;
        }
    }

    /**
     * Dispose this entity, removing it from its parent and disposing all components.
     */
    public dispose(): void {
        if (this.disposed) {
            return;
        }

        if (this.parent != null) {
            this.parent.removeChild(this);
        }

        // Dispose all children
        while (this.firstChild != null) {
            this.firstChild.dispose();
        }

        // Dispose all components
        this.disposeComponents();

        this.disposed = true;
    }

    private disposeComponents(): void {
        while (this.firstComponent != null) {
            const component = this.firstComponent;
            this.firstComponent = component.next;

            if (component.onRemoved) {
                component.onRemoved();
            }
            component.dispose();
        }
    }
}
