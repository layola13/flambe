/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Value } from '../util/Disposable';
export class AnimatedFloat extends Value {
    constructor(value, behavior) {
        super(value);
        this._behavior = null;
        if (behavior) {
            this._behavior = behavior;
        }
    }
    get behavior() {
        return this._behavior;
    }
    set behavior(behavior) {
        this._behavior = behavior;
    }
    update(dt) {
        if (this._behavior) {
            this._behavior.update(dt);
            if (this._behavior.isComplete()) {
                this._behavior = null;
            }
        }
    }
    animateTo(to, duration, ease) {
        this._behavior = new TweenBehavior(this, to, duration, ease);
        return this;
    }
    animateBy(by, duration, ease) {
        return this.animateTo(this._ + by, duration, ease);
    }
}
export class Behavior {
}
export class Ease {
    static linear(t) {
        return t;
    }
    static quadIn(t) {
        return t * t;
    }
    static quadOut(t) {
        return -t * (t - 2);
    }
    static quadInOut(t) {
        t *= 2;
        if (t < 1)
            return 0.5 * t * t;
        --t;
        return -0.5 * (t * (t - 2) - 1);
    }
    static cubeIn(t) {
        return t * t * t;
    }
    static cubeOut(t) {
        t--;
        return t * t * t + 1;
    }
    static cubeInOut(t) {
        t *= 2;
        if (t < 1)
            return 0.5 * t * t * t;
        t -= 2;
        return 0.5 * (t * t * t + 2);
    }
    static elasticOut(t) {
        if (t === 0)
            return 0;
        if (t === 1)
            return 1;
        const p = 0.3;
        return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    }
    static bounceOut(t) {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        }
        else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        }
        else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }
        else {
            t -= 2.625 / 2.75;
            return 7.5625 * t * t + 0.984375;
        }
    }
}
class TweenBehavior extends Behavior {
    constructor(target, to, duration, ease = Ease.quadOut) {
        super();
        this.elapsed = 0;
        this.target = target;
        this.from = target._;
        this.to = to;
        this.duration = duration;
        this.ease = ease;
    }
    update(dt) {
        this.elapsed += dt;
        const alpha = Math.min(this.elapsed / this.duration, 1);
        const easedAlpha = this.ease(alpha);
        this.target._ = this.from + (this.to - this.from) * easedAlpha;
    }
    isComplete() {
        return this.elapsed >= this.duration;
    }
}
//# sourceMappingURL=AnimatedFloat.js.map