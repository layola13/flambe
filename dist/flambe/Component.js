/**
 * Flambe - Rapid game development
 * TypeScript port
 */
/**
 * Components are bits of data and logic that can be added to entities.
 */
export class Component {
    constructor() {
        /** The entity this component is attached to, or null. */
        this.owner = null; // Will be Entity, avoiding circular import
        /** The owner's next component, for iteration. */
        this.next = null;
    }
    /**
     * The component's name, generated based on its class. Components with the same name replace
     * each other when added to an entity.
     */
    get name() {
        return this.constructor.name;
    }
    /**
     * Called after this component has been added to an entity.
     */
    onAdded() {
        // Override in subclasses
    }
    /**
     * Called just before this component has been removed from its entity.
     */
    onRemoved() {
        // Override in subclasses
    }
    /**
     * Called just before this component's first update after being added. This is the best place to
     * put initialization logic that requires accessing other components/entities, since it waits
     * until the rest of the entity hierarchy is accessible.
     */
    onStart() {
        // Override in subclasses
    }
    /**
     * Called every frame while this component is active.
     */
    onUpdate(dt) {
        // Override in subclasses
    }
    /**
     * Called when this component is disposed.
     */
    dispose() {
        // Override in subclasses
    }
}
//# sourceMappingURL=Component.js.map