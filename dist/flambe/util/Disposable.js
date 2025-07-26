/**
 * Flambe - Rapid game development
 * TypeScript port of the Haxe Flambe engine
 */
export class Value {
    constructor(value) {
        this._value = value;
        this._changed = new Signal1Impl();
    }
    get _() {
        return this._value;
    }
    set _(value) {
        if (this._value !== value) {
            const oldValue = this._value;
            this._value = value;
            this._changed.emit(value);
        }
    }
    get changed() {
        return this._changed;
    }
    watch(fn) {
        return this._changed.connect((newValue) => {
            fn(newValue, this._value);
        });
    }
}
// Signal implementations
class Signal0Impl {
    constructor() {
        this.listeners = [];
    }
    connect(listener) {
        this.listeners.push(listener);
        return {
            dispose: () => {
                const index = this.listeners.indexOf(listener);
                if (index >= 0) {
                    this.listeners.splice(index, 1);
                }
            }
        };
    }
    emit() {
        for (const listener of this.listeners) {
            listener();
        }
    }
}
class Signal1Impl {
    constructor() {
        this.listeners = [];
    }
    connect(listener) {
        this.listeners.push(listener);
        return {
            dispose: () => {
                const index = this.listeners.indexOf(listener);
                if (index >= 0) {
                    this.listeners.splice(index, 1);
                }
            }
        };
    }
    emit(value) {
        for (const listener of this.listeners) {
            listener(value);
        }
    }
}
export { Signal0Impl, Signal1Impl };
//# sourceMappingURL=Disposable.js.map