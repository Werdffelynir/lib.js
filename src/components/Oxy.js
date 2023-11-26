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
 * @param onupdates
 * @returns {boolean|*}
 * @constructor
 */
function Oxy(target, onupdates) {
    return new Proxy(target, {
        get(target, prop, receiver) {
            return target[prop];
        },
        set(target, prop, value) {
            if (onupdates[prop] && typeof onupdates[prop] === "function") {
                let resetValue = onupdates[prop].call(target, prop, value);
                if (resetValue !== undefined) value = resetValue;
            }
            if (onupdates && typeof onupdates.every === "function") {
                let resetValue = onupdates.every.call(target, prop, value);
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