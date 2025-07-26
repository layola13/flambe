/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Disposable } from './util/Disposable';
/**
 * Components are bits of data and logic that can be added to entities.
 */
export declare abstract class Component implements Disposable {
    /** The entity this component is attached to, or null. */
    owner: any;
    /** The owner's next component, for iteration. */
    next: Component | null;
    /**
     * The component's name, generated based on its class. Components with the same name replace
     * each other when added to an entity.
     */
    get name(): string;
    /**
     * Called after this component has been added to an entity.
     */
    onAdded(): void;
    /**
     * Called just before this component has been removed from its entity.
     */
    onRemoved(): void;
    /**
     * Called just before this component's first update after being added. This is the best place to
     * put initialization logic that requires accessing other components/entities, since it waits
     * until the rest of the entity hierarchy is accessible.
     */
    onStart(): void;
    /**
     * Called every frame while this component is active.
     */
    onUpdate(dt: number): void;
    /**
     * Called when this component is disposed.
     */
    dispose(): void;
}
//# sourceMappingURL=Component.d.ts.map