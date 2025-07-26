/**
 * Flambe - Rapid game development
 * TypeScript port
 */

import { Key } from '../input/Key';
import { Signal0, Signal1, Signal0Impl, Signal1Impl } from '../util/Disposable';

/**
 * A keyboard event containing the key that triggered it
 */
export class KeyboardEvent {
    constructor(public readonly key: Key) {}
}

/**
 * Functions related to the environment's physical keyboard.
 */
export interface KeyboardSystem {
    /**
     * Whether the environment has a physical keyboard. Phones and tablets will generally return
     * false here.
     */
    readonly supported: boolean;

    /**
     * Emitted when a key is pressed down.
     */
    readonly down: Signal1<KeyboardEvent>;

    /**
     * Emitted when a key is released.
     */
    readonly up: Signal1<KeyboardEvent>;

    /**
     * Emitted when a hardware back button is pressed. If no listeners are connected to this signal
     * when the back button is pressed, the platform's default action will be taken (which is
     * usually to close the app). Only supported on Android.
     */
    readonly backButton: Signal0;

    /**
     * @returns True if the given key is currently being held down.
     */
    isDown(key: Key): boolean;
}

/**
 * Basic HTML5 keyboard system implementation
 */
export class HTMLKeyboardSystem implements KeyboardSystem {
    public readonly supported = true;
    public readonly down = new Signal1Impl<KeyboardEvent>();
    public readonly up = new Signal1Impl<KeyboardEvent>();
    public readonly backButton = new Signal0Impl();

    private _keysDown = new Set<Key>();

    constructor() {
        this.setupEventListeners();
    }

    public isDown(key: Key): boolean {
        return this._keysDown.has(key);
    }

    private setupEventListeners(): void {
        window.addEventListener('keydown', (event) => {
            const key = this.htmlKeyToFlambeKey(event.code);
            if (key !== null) {
                this._keysDown.add(key);
                const keyboardEvent = new KeyboardEvent(key);
                this.down.emit(keyboardEvent);
            }
        });

        window.addEventListener('keyup', (event) => {
            const key = this.htmlKeyToFlambeKey(event.code);
            if (key !== null) {
                this._keysDown.delete(key);
                const keyboardEvent = new KeyboardEvent(key);
                this.up.emit(keyboardEvent);
            }
        });
    }

    private htmlKeyToFlambeKey(code: string): Key | null {
        // Map HTML key codes to Flambe keys
        switch (code) {
            case 'KeyA': return Key.A;
            case 'KeyB': return Key.B;
            case 'KeyC': return Key.C;
            case 'KeyD': return Key.D;
            case 'KeyE': return Key.E;
            case 'KeyF': return Key.F;
            case 'KeyG': return Key.G;
            case 'KeyH': return Key.H;
            case 'KeyI': return Key.I;
            case 'KeyJ': return Key.J;
            case 'KeyK': return Key.K;
            case 'KeyL': return Key.L;
            case 'KeyM': return Key.M;
            case 'KeyN': return Key.N;
            case 'KeyO': return Key.O;
            case 'KeyP': return Key.P;
            case 'KeyQ': return Key.Q;
            case 'KeyR': return Key.R;
            case 'KeyS': return Key.S;
            case 'KeyT': return Key.T;
            case 'KeyU': return Key.U;
            case 'KeyV': return Key.V;
            case 'KeyW': return Key.W;
            case 'KeyX': return Key.X;
            case 'KeyY': return Key.Y;
            case 'KeyZ': return Key.Z;
            
            case 'Digit0': return Key.Number0;
            case 'Digit1': return Key.Number1;
            case 'Digit2': return Key.Number2;
            case 'Digit3': return Key.Number3;
            case 'Digit4': return Key.Number4;
            case 'Digit5': return Key.Number5;
            case 'Digit6': return Key.Number6;
            case 'Digit7': return Key.Number7;
            case 'Digit8': return Key.Number8;
            case 'Digit9': return Key.Number9;
            
            case 'F1': return Key.F1;
            case 'F2': return Key.F2;
            case 'F3': return Key.F3;
            case 'F4': return Key.F4;
            case 'F5': return Key.F5;
            case 'F6': return Key.F6;
            case 'F7': return Key.F7;
            case 'F8': return Key.F8;
            case 'F9': return Key.F9;
            case 'F10': return Key.F10;
            case 'F11': return Key.F11;
            case 'F12': return Key.F12;
            
            case 'ArrowUp': return Key.Up;
            case 'ArrowDown': return Key.Down;
            case 'ArrowLeft': return Key.Left;
            case 'ArrowRight': return Key.Right;
            
            case 'Space': return Key.Space;
            case 'Enter': return Key.Enter;
            case 'Escape': return Key.Escape;
            case 'Backspace': return Key.Backspace;
            case 'Tab': return Key.Tab;
            case 'ShiftLeft':
            case 'ShiftRight': return Key.Shift;
            case 'ControlLeft':
            case 'ControlRight': return Key.Control;
            case 'AltLeft':
            case 'AltRight': return Key.Alt;
            
            default: return null;
        }
    }
}
