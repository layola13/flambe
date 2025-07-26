/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export enum Key {
    A = "KeyA", B = "KeyB", C = "KeyC", D = "KeyD", E = "KeyE", F = "KeyF", G = "KeyG",
    H = "KeyH", I = "KeyI", J = "KeyJ", K = "KeyK", L = "KeyL", M = "KeyM", N = "KeyN",
    O = "KeyO", P = "KeyP", Q = "KeyQ", R = "KeyR", S = "KeyS", T = "KeyT", U = "KeyU",
    V = "KeyV", W = "KeyW", X = "KeyX", Y = "KeyY", Z = "KeyZ",
    
    Num0 = "Digit0", Num1 = "Digit1", Num2 = "Digit2", Num3 = "Digit3", Num4 = "Digit4",
    Num5 = "Digit5", Num6 = "Digit6", Num7 = "Digit7", Num8 = "Digit8", Num9 = "Digit9",
    
    Left = "ArrowLeft", Right = "ArrowRight", Up = "ArrowUp", Down = "ArrowDown",
    Space = "Space", Enter = "Enter", Escape = "Escape", Tab = "Tab",
    Shift = "ShiftLeft", Control = "ControlLeft", Alt = "AltLeft"
}

export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2
}

export interface KeyboardSystem {
    isDown(key: Key): boolean;
}

export interface MouseSystem {
    readonly x: number;
    readonly y: number;
    isDown(button: MouseButton): boolean;
}

export class HTMLKeyboard implements KeyboardSystem {
    private pressedKeys = new Set<string>();

    constructor() {
        this.setupEventListeners();
    }

    public isDown(key: Key): boolean {
        return this.pressedKeys.has(key);
    }

    private setupEventListeners(): void {
        document.addEventListener('keydown', (e) => {
            this.pressedKeys.add(e.code);
            e.preventDefault();
        });

        document.addEventListener('keyup', (e) => {
            this.pressedKeys.delete(e.code);
            e.preventDefault();
        });

        // Clear all keys when window loses focus
        window.addEventListener('blur', () => {
            this.pressedKeys.clear();
        });
    }
}

export class HTMLMouse implements MouseSystem {
    public x = 0;
    public y = 0;
    private pressedButtons = new Set<number>();

    constructor(private canvas: HTMLCanvasElement) {
        this.setupEventListeners();
    }

    public isDown(button: MouseButton): boolean {
        return this.pressedButtons.has(button);
    }

    private setupEventListeners(): void {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mousedown', (e) => {
            this.pressedButtons.add(e.button);
            e.preventDefault();
        });

        this.canvas.addEventListener('mouseup', (e) => {
            this.pressedButtons.delete(e.button);
            e.preventDefault();
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.pressedButtons.clear();
        });

        // Prevent context menu
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
}
