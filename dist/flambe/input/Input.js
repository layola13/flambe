/**
 * Flambe - Rapid game development
 * TypeScript port
 */
export var Key;
(function (Key) {
    Key["A"] = "KeyA";
    Key["B"] = "KeyB";
    Key["C"] = "KeyC";
    Key["D"] = "KeyD";
    Key["E"] = "KeyE";
    Key["F"] = "KeyF";
    Key["G"] = "KeyG";
    Key["H"] = "KeyH";
    Key["I"] = "KeyI";
    Key["J"] = "KeyJ";
    Key["K"] = "KeyK";
    Key["L"] = "KeyL";
    Key["M"] = "KeyM";
    Key["N"] = "KeyN";
    Key["O"] = "KeyO";
    Key["P"] = "KeyP";
    Key["Q"] = "KeyQ";
    Key["R"] = "KeyR";
    Key["S"] = "KeyS";
    Key["T"] = "KeyT";
    Key["U"] = "KeyU";
    Key["V"] = "KeyV";
    Key["W"] = "KeyW";
    Key["X"] = "KeyX";
    Key["Y"] = "KeyY";
    Key["Z"] = "KeyZ";
    Key["Num0"] = "Digit0";
    Key["Num1"] = "Digit1";
    Key["Num2"] = "Digit2";
    Key["Num3"] = "Digit3";
    Key["Num4"] = "Digit4";
    Key["Num5"] = "Digit5";
    Key["Num6"] = "Digit6";
    Key["Num7"] = "Digit7";
    Key["Num8"] = "Digit8";
    Key["Num9"] = "Digit9";
    Key["Left"] = "ArrowLeft";
    Key["Right"] = "ArrowRight";
    Key["Up"] = "ArrowUp";
    Key["Down"] = "ArrowDown";
    Key["Space"] = "Space";
    Key["Enter"] = "Enter";
    Key["Escape"] = "Escape";
    Key["Tab"] = "Tab";
    Key["Shift"] = "ShiftLeft";
    Key["Control"] = "ControlLeft";
    Key["Alt"] = "AltLeft";
})(Key || (Key = {}));
export var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Left"] = 0] = "Left";
    MouseButton[MouseButton["Middle"] = 1] = "Middle";
    MouseButton[MouseButton["Right"] = 2] = "Right";
})(MouseButton || (MouseButton = {}));
export class HTMLKeyboard {
    constructor() {
        this.pressedKeys = new Set();
        this.setupEventListeners();
    }
    isDown(key) {
        return this.pressedKeys.has(key);
    }
    setupEventListeners() {
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
export class HTMLMouse {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.pressedButtons = new Set();
        this.setupEventListeners();
    }
    isDown(button) {
        return this.pressedButtons.has(button);
    }
    setupEventListeners() {
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
//# sourceMappingURL=Input.js.map