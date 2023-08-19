/**
 * <pre>
 * keyPress()                              (out loop use) return info about this method
 * keyPress('ArrowUp')                     (in loop use) return bool. true - when press 'ArrowUp'
 * keyPress('ArrowUp', function(){})       (in loop use) execute function when press 'ArrowUp'
 * keyPress(function(){})                  (out loop use) execute function every time when press any key
 * keyPress(function(){}, function(){})    (out loop use) combine executes functions for press and up keys
 *
 * function onKeyUp(event){}
 * function onKeyDown(event){}
 *
 *
 * </pre>
 *
 * @param key
 * @param callback
 * @returns {string|boolean}
 */
const keyPress = function (key, callback) {

    if (keyPress._global_event_keys === null)
        keyPress._global_event_key_press_listener();

    if (arguments.length === 0) {

        return keyPress.info();
    }

    if (typeof key === 'string' && typeof callback === 'function') {
        if (keyPress._global_event_keys[arguments[0]])
            callback.call(null, keyPress._global_event_keys[arguments[0]]);

        return !!keyPress._global_event_keys[arguments[0]];
    }

    if (typeof key === 'function') {
        keyPress._global_event_key_press_keydown_callbacks.push(key);
    }

    if (typeof callback === 'function') {
        keyPress._global_event_key_press_keyup_callbacks.push(callback);
    }
};


keyPress.info = function () {
    const codes = "" +
        "Event keydown/keyup                                      \n" +
        "key         code        keyCode     Key pressed          \n" +
        "_________________________________________________________\n" +
        "Backspace   Backspace   8           Backspace\n" +
        "Tab         Tab         9           Tab\n" +
        "Enter       Enter       13          Enter\n" +
        "Shift       ShiftLeft   16          Shift\n" +
        "Control     ControlLeft 17          Ctrl\n" +
        "Alt         AltLeft     18          Alt\n" +
        "Pause       Pause       19          Pause, Break\n" +
        "            CapsLock    20          CapsLock\n" +
        "Escape      Escape      27          Esc\n" +
        "' '         Space       32          Space\n" +
        "PageUp      PageUp      33          Page Up\n" +
        "PageDown    PageDown    34          Page Down\n" +
        "End         End         35          End\n" +
        "Home        Home        36          Home\n" +
        "ArrowLeft   ArrowLeft   37          Left arrow\n" +
        "ArrowUp     ArrowUp     38          Up arrow\n" +
        "ArrowRight  ArrowRight  39          Right arrow\n" +
        "ArrowDown   ArrowDown   40          Down arrow\n" +
        "                        44          PrntScrn\n" +
        "                        45          Insert\n" +
        "                        46          Delete\n" +
        "1           Digit1      48-57       0 to 9\n" +
        "a           KeyA        65-90       A to Z\n" +
        "                        91          WIN Key (Start)\n" +
        "                        93          WIN Menu\n" +
        "                        112-123     F1 to F12\n" +
        "                        144         NumLock\n" +
        "                        145         ScrollLock\n" +
        "                        188         , <\n" +
        "                        190         . >\n" +
        "                        191         / ?\n" +
        "`           Backquote   192         ` ~\n" +
        "                        219         [ {\n" +
        "                        220         \ |\n" +
        "                        221         ] }\n" +
        "                        222         ' \"\n";

    console.info(codes);
    
    return codes;
};


/** @type {null|Object} */
keyPress._global_event_keys = null;

/** @type {Array} */
keyPress._global_event_key_press_keyup_callbacks = [];

/** @type {Array} */
keyPress._global_event_key_press_keydown_callbacks = [];

keyPress._global_event_key_press_listener = function () {
    if (this._global_event_keys) return;
    this._global_event_keys = {};

    window.addEventListener('keydown', (event) => {
        if (event.defaultPrevented) {
            return;
        }

        let i = 0;

        for (i; i < keyPress._global_event_key_press_keydown_callbacks.length; i++) {
            if (typeof keyPress._global_event_key_press_keydown_callbacks[i] === 'function') {
                keyPress._global_event_key_press_keydown_callbacks[i](event);
            }
        }

        keyPress._global_event_keys[event.keyCode] = event;

        if (event.key)
            keyPress._global_event_keys[event.key]  = keyPress._global_event_keys[event.keyCode];

        if (event.code)
            keyPress._global_event_keys[event.code] = keyPress._global_event_keys[event.keyCode];
    });

    window.addEventListener('keyup', (event) => {
        if (event.defaultPrevented) {
            return;
        }

        let i = 0;

        for (i; i < keyPress._global_event_key_press_keyup_callbacks.length; i++) {
            if (typeof keyPress._global_event_key_press_keyup_callbacks[i] === 'function') {
                keyPress._global_event_key_press_keyup_callbacks[i](event);
            }
        }

        delete keyPress._global_event_keys[event.key];
        delete keyPress._global_event_keys[event.code];
        delete keyPress._global_event_keys[event.keyCode];
    });
}

/*
pressed key "d"
KeyboardEvent:
    isTrusted: true
    altKey: false
    bubbles: true
    cancelBubble: false
    cancelable: true
    charCode: 0
    code: "KeyD"
    composed: true
    ctrlKey: false
    currentTarget: null
    defaultPrevented: false
    detail: 0
    eventPhase: 0
    isComposing: false
    key: "d"
    keyCode: 68
    location: 0
    metaKey: false
    repeat: false
    returnValue: true
    shiftKey: false
    sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
    srcElement: input#question_area
    target: input#question_area
    timeStamp: 2190.899999999907
    type: "keydown"
    view: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    which: 68

*/

export default keyPress;
