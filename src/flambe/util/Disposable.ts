/**
 * Flambe - Rapid game development
 * TypeScript port of the Haxe Flambe engine
 */

export interface Disposable {
    dispose(): void;
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface Signal0 {
    connect(listener: () => void): SignalConnection;
    emit(): void;
}

export interface Signal1<T> {
    connect(listener: (value: T) => void): SignalConnection;
    emit(value: T): void;
}

export interface SignalConnection extends Disposable {
    dispose(): void;
}

export class Value<T> {
    private _value: T;
    private _changed: Signal1<T>;

    constructor(value: T) {
        this._value = value;
        this._changed = new Signal1Impl<T>();
    }

    get _(): T {
        return this._value;
    }

    set _(value: T) {
        if (this._value !== value) {
            const oldValue = this._value;
            this._value = value;
            this._changed.emit(value);
        }
    }

    get changed(): Signal1<T> {
        return this._changed;
    }

    watch(fn: (newValue: T, oldValue: T) => void): SignalConnection {
        return this._changed.connect((newValue) => {
            fn(newValue, this._value);
        });
    }
}

// Signal implementations
class Signal0Impl implements Signal0 {
    private listeners: (() => void)[] = [];

    connect(listener: () => void): SignalConnection {
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

    emit(): void {
        for (const listener of this.listeners) {
            listener();
        }
    }
}

class Signal1Impl<T> implements Signal1<T> {
    private listeners: ((value: T) => void)[] = [];

    connect(listener: (value: T) => void): SignalConnection {
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

    emit(value: T): void {
        for (const listener of this.listeners) {
            listener(value);
        }
    }
}

export { Signal0Impl, Signal1Impl };
