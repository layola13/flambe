/**
 * Flambe - Rapid game development
 * TypeScript port
 */
/**
 * Updates all components and renders.
 */
export class MainLoop {
    constructor() {
        this.lastTime = 0;
    }
    update(currentTime) {
        const dt = this.lastTime > 0 ? (currentTime - this.lastTime) / 1000 : 0;
        this.lastTime = currentTime;
        if (dt <= 0) {
            return;
        }
        // Clamp deltaTime to prevent spiral of death
        const clampedDt = Math.min(dt, 1 / 15); // Max 15fps minimum
        this.updateEntity(System.root, clampedDt);
    }
    render(renderer) {
        // Rendering is handled by the platform-specific renderer
        if (renderer && renderer.render) {
            renderer.render();
        }
    }
    updateEntity(entity, dt) {
        // Update all components
        let component = entity.firstComponent;
        while (component) {
            const next = component.next;
            // Call onUpdate if the component implements it
            if ('onUpdate' in component && typeof component.onUpdate === 'function') {
                component.onUpdate(dt);
            }
            component = next;
        }
        // Update all children
        let child = entity.firstChild;
        while (child) {
            const next = child.next;
            this.updateEntity(child, dt);
            child = next;
        }
    }
}
// Import System here to avoid circular dependency
let System;
if (typeof window !== 'undefined') {
    // Defer the import until runtime
    import('../System').then(module => {
        System = module.System;
    });
}
//# sourceMappingURL=MainLoop.js.map