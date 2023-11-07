import Roxy from "./Roxy";

/*
const rx = RoxyListener ({
    eventName () { /* handler .../ },
    eventName () { /* handler .../ },
})
rx.set();
rx.dispatch();

rx.action();
*/

/**
 * const rx = RoxyListener ({
 *     eventName () { /* handler .../ },
 *     eventName () { /* handler .../ },
 * })
 * rx.addListener();
 * rx.dispatch();
 *
 * rx.action();
 *
 * @deprecated
 * @param payload
 * @returns {{removeLoopListener(): boolean, readonly proxy: *, loopListener(*): void, dispatch(*, *): this, getProxy(): *, get(*): *, fill(*, *): this, getContext(): *, observe(*, *): this}} * @constructor
 * @constructor
 */
const RoxyListener = function (payload) {

    const actions = {
        __action__() {
        }
    };

    const actionsNames = {};

    Object.keys(payload).map(function (eventName, index) {
        actions[eventName] = payload[eventName];

        if (typeof payload[eventName] === 'function' && eventName !== actions.__action__.name) {
            actionsNames[eventName] = '';
        }
    });

    const rx = Roxy(actionsNames);
    //
    rx.actions = function () {
        return actionsNames
    };

    // observe
    rx.addListener((eventCursor, values) => {
        actions.__action__.call(actions, eventCursor, values);

        Object.keys(actions).map(function (eventName, index) {

            if (eventCursor === eventName && typeof actions[eventName] === 'function') {
                actions[eventName].call(actions, eventCursor, values);
            }
        })
    });

    return rx;
};

export default RoxyListener;
