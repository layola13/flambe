/**
 * Flambe - Rapid game development
 * TypeScript port
 */
import { Signal1Impl } from './Disposable';
export class Promise {
    constructor() {
        this._result = null;
        this._error = new Signal1Impl();
        this._success = new Signal1Impl();
        this._progressChanged = new Signal1Impl();
        this._progress = 0;
        this._total = 0;
        this._hasResult = false;
    }
    get result() {
        return this._result;
    }
    set result(value) {
        if (!this._hasResult) {
            this._result = value;
            this._hasResult = true;
            this._success.emit(value);
        }
    }
    get error() {
        return this._error;
    }
    get success() {
        return this._success;
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
        this._progress = value;
        this._progressChanged.emit(value);
    }
    get total() {
        return this._total;
    }
    set total(value) {
        this._total = value;
    }
    get progressChanged() {
        return this._progressChanged;
    }
    get hasResult() {
        return this._hasResult;
    }
    get(fn) {
        if (this._hasResult && this._result !== null) {
            fn(this._result);
        }
        else {
            this._success.connect(fn);
        }
    }
    then(fn) {
        const promise = new Promise();
        this.get((result) => {
            try {
                promise.result = fn(result);
            }
            catch (e) {
                promise._error.emit(e instanceof Error ? e.message : String(e));
            }
        });
        this._error.connect((error) => {
            promise._error.emit(error);
        });
        return promise;
    }
    static resolve(value) {
        const promise = new Promise();
        promise.result = value;
        return promise;
    }
    static reject(error) {
        const promise = new Promise();
        promise._error.emit(error);
        return promise;
    }
}
//# sourceMappingURL=Promise.js.map