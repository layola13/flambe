/**
 * Flambe - Rapid game development
 * TypeScript port
 */

export enum Key {
    // Letters
    A = "KeyA", B = "KeyB", C = "KeyC", D = "KeyD", E = "KeyE", F = "KeyF", G = "KeyG", 
    H = "KeyH", I = "KeyI", J = "KeyJ", K = "KeyK", L = "KeyL", M = "KeyM", N = "KeyN", 
    O = "KeyO", P = "KeyP", Q = "KeyQ", R = "KeyR", S = "KeyS", T = "KeyT", U = "KeyU", 
    V = "KeyV", W = "KeyW", X = "KeyX", Y = "KeyY", Z = "KeyZ",

    // Numbers
    Number0 = "Digit0", Number1 = "Digit1", Number2 = "Digit2", Number3 = "Digit3", 
    Number4 = "Digit4", Number5 = "Digit5", Number6 = "Digit6", Number7 = "Digit7", 
    Number8 = "Digit8", Number9 = "Digit9",

    // Numpad
    Numpad0 = "Numpad0", Numpad1 = "Numpad1", Numpad2 = "Numpad2", Numpad3 = "Numpad3", 
    Numpad4 = "Numpad4", Numpad5 = "Numpad5", Numpad6 = "Numpad6", Numpad7 = "Numpad7", 
    Numpad8 = "Numpad8", Numpad9 = "Numpad9", NumpadAdd = "NumpadAdd", 
    NumpadDecimal = "NumpadDecimal", NumpadDivide = "NumpadDivide", 
    NumpadEnter = "NumpadEnter", NumpadMultiply = "NumpadMultiply", 
    NumpadSubtract = "NumpadSubtract",

    // Function keys
    F1 = "F1", F2 = "F2", F3 = "F3", F4 = "F4", F5 = "F5", F6 = "F6", F7 = "F7", 
    F8 = "F8", F9 = "F9", F10 = "F10", F11 = "F11", F12 = "F12", F13 = "F13", 
    F14 = "F14", F15 = "F15",

    // Arrow keys
    Left = "ArrowLeft", Up = "ArrowUp", Right = "ArrowRight", Down = "ArrowDown",

    // Special keys
    Alt = "AltLeft", Backquote = "Backquote", Backslash = "Backslash", 
    Backspace = "Backspace", CapsLock = "CapsLock", Comma = "Comma", 
    Command = "MetaLeft", Control = "ControlLeft", Delete = "Delete", 
    End = "End", Enter = "Enter", Equals = "Equal", Escape = "Escape", 
    Home = "Home", Insert = "Insert", LeftBracket = "BracketLeft", 
    Minus = "Minus", PageDown = "PageDown", PageUp = "PageUp", 
    Period = "Period", Quote = "Quote", RightBracket = "BracketRight", 
    Semicolon = "Semicolon", Shift = "ShiftLeft", Slash = "Slash", 
    Space = "Space", Tab = "Tab",

    // Mobile/Android keys
    Menu = "ContextMenu", Search = "BrowserSearch",

    // Unknown key
    Unknown = "Unknown"
}

export class KeyboardEvent {
    /** The key that was pressed. */
    public key: Key;

    /** An incrementing ID unique to every dispatched keyboard event. */
    public id: number;

    constructor(id = 0, key = Key.Unknown) {
        this.id = id;
        this.key = key;
    }

    public clone(): KeyboardEvent {
        return new KeyboardEvent(this.id, this.key);
    }
}
