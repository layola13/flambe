/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Signal1 } from './Disposable';
export declare class Promise<T> {
    private _result;
    private _error;
    private _success;
    private _progressChanged;
    private _progress;
    private _total;
    private _hasResult;
    get result(): T | null;
    set result(value: T);
    get error(): Signal1<string>;
    get success(): Signal1<T>;
    get progress(): number;
    set progress(value: number);
    get total(): number;
    set total(value: number);
    get progressChanged(): Signal1<number>;
    get hasResult(): boolean;
    get(fn: (result: T) => void): void;
    then<U>(fn: (result: T) => U): Promise<U>;
    static resolve<T>(value: T): Promise<T>;
    static reject<T>(error: string): Promise<T>;
}
//# sourceMappingURL=Promise.d.ts.map