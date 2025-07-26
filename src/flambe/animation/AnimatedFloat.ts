/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Value, Signal0, Signal0Impl } from '../util/Disposable';

export class AnimatedFloat extends Value<number> {
    private _behavior: Behavior | null = null;

    constructor(value: number, behavior?: Behavior) {
        super(value);
        if (behavior) {
            this._behavior = behavior;
        }
    }

    public get behavior(): Behavior | null {
        return this._behavior;
    }

    public set behavior(behavior: Behavior | null) {
        this._behavior = behavior;
    }

    public update(dt: number): void {
        if (this._behavior) {
            this._behavior.update(dt);
            if (this._behavior.isComplete()) {
                this._behavior = null;
            }
        }
    }

    public animateTo(to: number, duration: number, ease?: EaseFunction): AnimatedFloat {
        this._behavior = new TweenBehavior(this, to, duration, ease);
        return this;
    }

    public animateBy(by: number, duration: number, ease?: EaseFunction): AnimatedFloat {
        return this.animateTo(this._ + by, duration, ease);
    }
}

export abstract class Behavior {
    public abstract update(dt: number): void;
    public abstract isComplete(): boolean;
}

export type EaseFunction = (t: number) => number;

export class Ease {
    public static linear(t: number): number {
        return t;
    }

    public static quadIn(t: number): number {
        return t * t;
    }

    public static quadOut(t: number): number {
        return -t * (t - 2);
    }

    public static quadInOut(t: number): number {
        t *= 2;
        if (t < 1) return 0.5 * t * t;
        --t;
        return -0.5 * (t * (t - 2) - 1);
    }

    public static cubeIn(t: number): number {
        return t * t * t;
    }

    public static cubeOut(t: number): number {
        t--;
        return t * t * t + 1;
    }

    public static cubeInOut(t: number): number {
        t *= 2;
        if (t < 1) return 0.5 * t * t * t;
        t -= 2;
        return 0.5 * (t * t * t + 2);
    }

    public static elasticOut(t: number): number {
        if (t === 0) return 0;
        if (t === 1) return 1;
        const p = 0.3;
        return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    }

    public static bounceOut(t: number): number {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        } else {
            t -= 2.625 / 2.75;
            return 7.5625 * t * t + 0.984375;
        }
    }
}

class TweenBehavior extends Behavior {
    private elapsed = 0;
    private from: number;
    private to: number;
    private duration: number;
    private ease: EaseFunction;
    private target: AnimatedFloat;

    constructor(target: AnimatedFloat, to: number, duration: number, ease: EaseFunction = Ease.quadOut) {
        super();
        this.target = target;
        this.from = target._;
        this.to = to;
        this.duration = duration;
        this.ease = ease;
    }

    public update(dt: number): void {
        this.elapsed += dt;
        const alpha = Math.min(this.elapsed / this.duration, 1);
        const easedAlpha = this.ease(alpha);
        this.target._ = this.from + (this.to - this.from) * easedAlpha;
    }

    public isComplete(): boolean {
        return this.elapsed >= this.duration;
    }
}
