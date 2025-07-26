/**
 * Flambe - Rapid game development
 * TypeScript port
 */
/**
 * A component that gets updated every frame.
 */
export interface Tickable {
    onUpdate(dt: number): void;
}
/**
 * Updates all components and renders.
 */
export declare class MainLoop {
    private lastTime;
    update(currentTime: number): void;
    render(renderer: any): void;
    private updateEntity;
}
//# sourceMappingURL=MainLoop.d.ts.map