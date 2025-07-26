/**
 * Flambe - Rapid game development
 * TypeScript port
 */
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
export class Entity {
    constructor() {
        /** This entity's parent. */
        this.parent = null;
        /** This entity's first child. */
        this.firstChild = null;
        /** This entity's next sibling, for iteration. */
        this.next = null;
        /** This entity's first component. */
        this.firstComponent = null;
        this.disposed = false;
    }
    /**
     * Add a component to this entity. Any previous component of this type will be replaced.
     * @returns This instance, for chaining calls.
     */
    add(component) {
        // Remove any existing component with the same name
        this.remove(component.constructor);
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
    remove(componentClass) {
        let prev = null;
        let component = this.firstComponent;
        while (component != null) {
            const next = component.next;
            if (component instanceof componentClass) {
                // Splice out the component
                if (prev != null) {
                    prev.next = next;
                }
                else {
                    this.firstComponent = next;
                }
                if (component.onRemoved) {
                    component.onRemoved();
                }
                component.owner = null;
                component.next = null;
                return component;
            }
            prev = component;
            component = next;
        }
        return null;
    }
    /**
     * Get a component of a given type from this entity.
     */
    get(componentClass) {
        let component = this.firstComponent;
        while (component != null) {
            if (component.constructor === componentClass) {
                return component;
            }
            component = component.next;
        }
        return null;
    }
    /**
     * Check if this entity has a component of the given type.
     */
    has(componentClass) {
        return this.get(componentClass) != null;
    }
    /**
     * Add a child to this entity.
     * @returns This instance, for chaining calls.
     */
    addChild(entity, append = true) {
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
            }
            else {
                this.firstChild = entity;
            }
        }
        else {
            // Prepend to the beginning
            entity.next = this.firstChild;
            this.firstChild = entity;
        }
        return this;
    }
    /**
     * Remove a child from this entity.
     */
    removeChild(entity) {
        let prev = null;
        let child = this.firstChild;
        while (child != null) {
            const next = child.next;
            if (child === entity) {
                // Splice out the child
                if (prev != null) {
                    prev.next = next;
                }
                else {
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
    dispose() {
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
    disposeComponents() {
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
//# sourceMappingURL=Entity.js.map