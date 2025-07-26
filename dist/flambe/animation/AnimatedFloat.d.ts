/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Value } from '../util/Disposable';
export declare class AnimatedFloat extends Value<number> {
    private _behavior;
    constructor(value: number, behavior?: Behavior);
    get behavior(): Behavior | null;
    set behavior(behavior: Behavior | null);
    update(dt: number): void;
    animateTo(to: number, duration: number, ease?: EaseFunction): AnimatedFloat;
    animateBy(by: number, duration: number, ease?: EaseFunction): AnimatedFloat;
}
export declare abstract class Behavior {
    abstract update(dt: number): void;
    abstract isComplete(): boolean;
}
export type EaseFunction = (t: number) => number;
export declare class Ease {
    static linear(t: number): number;
    static quadIn(t: number): number;
    static quadOut(t: number): number;
    static quadInOut(t: number): number;
    static cubeIn(t: number): number;
    static cubeOut(t: number): number;
    static cubeInOut(t: number): number;
    static elasticOut(t: number): number;
    static bounceOut(t: number): number;
}
//# sourceMappingURL=AnimatedFloat.d.ts.map