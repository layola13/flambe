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
export declare class Value<T> {
    private _value;
    private _changed;
    constructor(value: T);
    get _(): T;
    set _(value: T);
    get changed(): Signal1<T>;
    watch(fn: (newValue: T, oldValue: T) => void): SignalConnection;
}
declare class Signal0Impl implements Signal0 {
    private listeners;
    connect(listener: () => void): SignalConnection;
    emit(): void;
}
declare class Signal1Impl<T> implements Signal1<T> {
    private listeners;
    connect(listener: (value: T) => void): SignalConnection;
    emit(value: T): void;
}
export { Signal0Impl, Signal1Impl };
//# sourceMappingURL=Disposable.d.ts.map