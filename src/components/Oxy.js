/**
 *
 * <pre>
 * let store = new Oxy({
 *     credits: 0,
 *     fuel: 0,
 *     gold: 0,
 * }, {
 *     // called every change store
 *     every(prop, value){
 *         if (prop === 'fuel' && elements[prop]) elements[prop].innerHTML = value;
 *     },
 *     // called when change credits property
 *     credits(value) {
 *         elements.innerHTML = value;
 *     },
 * });
 * store.credits = 100;
 * store.fuel = 50;
 * </pre>
 *
 * @param target
 * @param {{ onSetter: function(prop: string|symbol, value:*), onGetter: function(prop: string|symbol), every: function }|*} options
 * @returns {boolean|*}
 * @constructor
 */
function Oxy(target, options) {
    return new Proxy(target, {
        get(target, prop, receiver) {
            if (options && typeof options.onGetter === "function") {
                options.onGetter.call(target, prop, receiver);
            }
            return target[prop];
        },
        set(target, prop, value) {
            if (options[prop] && typeof options[prop] === "function") {
                let resetValue = options[prop].call(target, prop, value);
                if (resetValue !== undefined) value = resetValue;
            }
            if (options && typeof options.every === "function") {
                let resetValue = options.every.call(target, prop, value);
                if (resetValue !== undefined) value = resetValue;
            }
            if (options && typeof options.onSetter === "function") {
                let resetValue = options.onSetter.call(target, prop, value);
                if (resetValue !== undefined) value = resetValue;
            }
            target[prop] = value;
            return true;
        },
        apply(target, thisArg, args) {
            target.apply(thisArg, args);
        },
        has(target, prop) {
            return !!target[prop];
        }
    });
}

export default Oxy;