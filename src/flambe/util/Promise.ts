/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Signal1, Signal1Impl } from './Disposable';

export class Promise<T> {
    private _result: T | null = null;
    private _error: Signal1<string> = new Signal1Impl<string>();
    private _success: Signal1<T> = new Signal1Impl<T>();
    private _progressChanged: Signal1<number> = new Signal1Impl<number>();
    private _progress = 0;
    private _total = 0;
    private _hasResult = false;

    public get result(): T | null {
        return this._result;
    }

    public set result(value: T) {
        if (!this._hasResult) {
            this._result = value;
            this._hasResult = true;
            this._success.emit(value);
        }
    }

    public get error(): Signal1<string> {
        return this._error;
    }

    public get success(): Signal1<T> {
        return this._success;
    }

    public get progress(): number {
        return this._progress;
    }

    public set progress(value: number) {
        this._progress = value;
        this._progressChanged.emit(value);
    }

    public get total(): number {
        return this._total;
    }

    public set total(value: number) {
        this._total = value;
    }

    public get progressChanged(): Signal1<number> {
        return this._progressChanged;
    }

    public get hasResult(): boolean {
        return this._hasResult;
    }

    public get(fn: (result: T) => void): void {
        if (this._hasResult && this._result !== null) {
            fn(this._result);
        } else {
            this._success.connect(fn);
        }
    }

    public then<U>(fn: (result: T) => U): Promise<U> {
        const promise = new Promise<U>();
        
        this.get((result) => {
            try {
                promise.result = fn(result);
            } catch (e) {
                promise._error.emit(e instanceof Error ? e.message : String(e));
            }
        });

        this._error.connect((error) => {
            promise._error.emit(error);
        });

        return promise;
    }

    public static resolve<T>(value: T): Promise<T> {
        const promise = new Promise<T>();
        promise.result = value;
        return promise;
    }

    public static reject<T>(error: string): Promise<T> {
        const promise = new Promise<T>();
        promise._error.emit(error);
        return promise;
    }
}
