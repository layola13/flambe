/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export declare enum Key {
    A = "KeyA",
    B = "KeyB",
    C = "KeyC",
    D = "KeyD",
    E = "KeyE",
    F = "KeyF",
    G = "KeyG",
    H = "KeyH",
    I = "KeyI",
    J = "KeyJ",
    K = "KeyK",
    L = "KeyL",
    M = "KeyM",
    N = "KeyN",
    O = "KeyO",
    P = "KeyP",
    Q = "KeyQ",
    R = "KeyR",
    S = "KeyS",
    T = "KeyT",
    U = "KeyU",
    V = "KeyV",
    W = "KeyW",
    X = "KeyX",
    Y = "KeyY",
    Z = "KeyZ",
    Num0 = "Digit0",
    Num1 = "Digit1",
    Num2 = "Digit2",
    Num3 = "Digit3",
    Num4 = "Digit4",
    Num5 = "Digit5",
    Num6 = "Digit6",
    Num7 = "Digit7",
    Num8 = "Digit8",
    Num9 = "Digit9",
    Left = "ArrowLeft",
    Right = "ArrowRight",
    Up = "ArrowUp",
    Down = "ArrowDown",
    Space = "Space",
    Enter = "Enter",
    Escape = "Escape",
    Tab = "Tab",
    Shift = "ShiftLeft",
    Control = "ControlLeft",
    Alt = "AltLeft"
}
export declare enum MouseButton {
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
export declare class HTMLKeyboard implements KeyboardSystem {
    private pressedKeys;
    constructor();
    isDown(key: Key): boolean;
    private setupEventListeners;
}
export declare class HTMLMouse implements MouseSystem {
    private canvas;
    x: number;
    y: number;
    private pressedButtons;
    constructor(canvas: HTMLCanvasElement);
    isDown(button: MouseButton): boolean;
    private setupEventListeners;
}
//# sourceMappingURL=Input.d.ts.map