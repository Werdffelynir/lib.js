/*
KeyboardEvent {isTrusted: true, key: 'w', code: 'KeyW', location: 0, ctrlKey: false, …}
    isTrusted: true
    altKey: false
    bubbles: true
    cancelBubble: false
    cancelable: true
    charCode: 0
    code: "KeyW"
    composed: true
    ctrlKey: false
    currentTarget: null
    defaultPrevented: false
    detail: 0
    eventPhase: 0
    isComposing: false
    key: "w"
    keyCode: 87
    location: 0
    metaKey: false
    path: (4) [body, html, document, Window]
    repeat: false
    returnValue: true
    shiftKey: false
    sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
    srcElement: body
    target: body
    timeStamp: 1356.300000000745
    type: "keydown"
    view: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    which: 87
*/

export const KeyboardKeyCode = {
    getCodeByName(name){
        return KeyboardKeyCode[name]
    },
    getNameByCode(code){
        let result = null;

        Object.keys(KeyboardKeyCode).forEach((key) => {
            if (code === KeyboardKeyCode[key]) {
                result = key
            }
        });

        return result;
    },
    getNames(){
        return Object.keys(KeyboardKeyCode);
    },
    code(key){
        return KeyboardKeyCode.reverse()[key] || false;
    },
    reverse(){
        let keys = {};
        for (const [key, value] of Object.entries(KeyboardKeyCode)) {
            keys[value] = key
        }
        return keys;
    },
    'Backspace': 8,
    'Tab': 9,
    'Enter': 13,
    'ShiftLeft': 16,
    'ShiftRight': 16,
    'ControlLeft': 17,
    'ControlRight': 17,
    'AltLeft': 18,
    'AltRight': 18,
    'Pause': 19,
    'Break': 19,
    'CapsLock': 20,
    'Escape': 27,
    'Space': 32,
    'PageUp': 33,
    'PageDown': 34,
    'End': 35,
    'Home': 36,
    'ArrowLeft': 37,
    'ArrowUp': 38,
    'ArrowRight': 39,
    'ArrowDown': 40,
    'PrintScreen': 44,
    'Insert': 45,
    'Delete': 46,
    'Digit0': 48,
    'Digit1': 49,
    'Digit2': 50,
    'Digit3': 51,
    'Digit4': 52,
    'Digit5': 53,
    'Digit6': 54,
    'Digit7': 55,
    'Digit8': 56,
    'Digit9': 57,
    'KeyA': 65,
    'KeyB': 66,
    'KeyC': 67,
    'KeyD': 68,
    'KeyE': 69,
    'KeyF': 70,
    'KeyG': 71,
    'KeyH': 72,
    'KeyI': 73,
    'KeyJ': 74,
    'KeyK': 75,
    'KeyL': 76,
    'KeyM': 77,
    'KeyN': 78,
    'KeyO': 79,
    'KeyP': 80,
    'KeyQ': 81,
    'KeyR': 82,
    'KeyS': 83,
    'KeyT': 84,
    'KeyU': 85,
    'KeyV': 86,
    'KeyW': 87,
    'KeyX': 88,
    'KeyY': 89,
    'KeyZ': 90,
    'MetaLeft': 91,
    'MetaRight': 92,
    'ContextMenu': 93,
    'Numpad0': 96,
    'Numpad1': 97,
    'Numpad2': 98,
    'Numpad3': 99,
    'Numpad4': 100,
    'Numpad5': 101,
    'Numpad6': 102,
    'Numpad7': 103,
    'Numpad8': 104,
    'Numpad9': 105,
    'NumpadMultiply': 106,
    'NumpadAdd': 107,
    'NumpadSubtract': 109,
    'NumpadDecimal': 110,
    'NumpadDivide': 111,
    'F1': 112,
    'F2': 113,
    'F3': 114,
    'F4': 115,
    'F5': 116,
    'F6': 117,
    'F7': 118,
    'F8': 119,
    'F9': 120,
    'F10': 121,
    'F11': 122,
    'F12': 123,
    'NumLock': 144,
    'ScrollLock': 145,
    'Semicolon': 186,
    'Equal': 187,
    'Comma': 188,
    'Minus': 189,
    'Period': 190,
    'Slash': 191,
    'Backquote': 192,
    'BracketLeft': 219,
    'Backslash': 220,
    'BracketRight': 221,
    'Quote': 222,
};

export const KeyboardEventName = {
    get 'keyup' () { return 'keyup' },
    get 'keydown' () { return 'keydown' },
    get 'keypress' () { return 'keypress' },
};

/*

const keyboard = KeyboardManager();

keyboard.add(KeyboardEventName.keypress, (event) => {
    // code: "KeyW"
    // key: "w"
    // keyCode: 87
    // ctrlKey: false
    // shiftKey: false
    // which: 87
    // type: "keydown"

    if (event.code === KeyboardKeyCode.code(KeyboardKeyCode.KeyW)) {

    }
});

keyboard.add(event, callback)
keyboard.remove(type)
keyboard.clear()
*/


/**
 *
 * @returns {{add(*, *): void, clear(): void, active: {left: boolean, up: boolean, right: boolean, down: boolean}, remove(*): void}}
 * @constructor
 */
const KeyboardManager = function ()
{
    const stack = {};
    const add = function (type, callback) {
        stack[type] = callback;
    };

    function addListener (type) {
        document.addEventListener(type, stack[type]);
    }

    function removeListener (type) {
        document.removeEventListener(type, stack[type]);
    }

    function removeListeners () {
        Object.keys(stack).map(function (type) {
            document.removeEventListener(type, stack[type]);
        })
    }

    return {
        active: {
            up: false,
            down: false,
            left: false,
            right: false,
        },
        add(type, callback) {
            add(type, callback);
            addListener(type);
        },

        remove(event) {
            removeListener(event);
        },

        clear() {
            removeListeners();
        },
    };
};

export default KeyboardManager;
