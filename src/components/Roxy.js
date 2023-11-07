/*

let stage = {
    title: '',
    body: '',
    user: {email: '',name: '',},
};

const rx = Roxy(stagePrevious);
stage = rx.proxy;
stage = rx.getContext();
stage = rx.getProxy();

rx.observe('title', (key, values)=>{
    // key title
    // value 'new title'
});

rx.removeLoopListener();
rx.loopListener((key, value) => {
    // key title
    // value 'new title'
});

// rx.dispatch('title', 'new title');

stage.title = 'new  title'; // dispatch event




rx.addListener((key, values)=>{
    if (key === '') {}
    inject('#' + key, values);
});
rx.removeListener();

rx.proxy.title = 'First value';
rx.proxy.body = 'Test body text';

rx.fill({
    title: 'title',
});

rx.fill({
    email: 'value',
    name: 'value',
}, 'user');

Timer.timeout(() => {
    rx.dispatch('title', 'Hello friend');
    rx.dispatch('body', 'Do you happy now?');
}, 2000);

rx.get(key);                // return proxy object by key
rx.fill(payload, to);       // fill proxy by payload object, or to included object entries
rx.observe(key, callback);  // listener
rx.dispatch(key, payload);  // dispatcher
rx.proxy                    // getter, return all proxy objects
rx.getProxy();              // return ProxyConstructor

*/


import copy from "../static/copy";

/**
 *
 * @deprecated
 * @param payload
 * @returns {{removeLoopListener(): boolean, readonly proxy: *, loopListener(*): void, dispatch(*, *): this, getProxy(): *, get(*): *, fill(*, *): this, getContext(): *, observe(*, *): this}|*|boolean|null}
 * @constructor
 */
const Roxy = function (payload)
{
    let ___callbacklistener___ = false;
    let ___eventcallbacks___ = {
        default: null,
    };

    const proxy = new Proxy(payload, {
        get(obj, prop) {
            return prop in obj ? obj[prop] : null;
        },
        set(obj, prop, value) {

            obj[prop] = value;

            if (___callbacklistener___) {
                ___callbacklistener___.call({}, prop, value, copy(proxy));
            }

            if (___eventcallbacks___[prop] && typeof ___eventcallbacks___[prop] === "function") {
                ___eventcallbacks___[prop].call({}, prop, value, copy(proxy));
            }

            if (typeof ___eventcallbacks___.default === "function") {
                ___eventcallbacks___.default.call({}, prop, value, copy(proxy));
            }
            return true;
        }
    });

    return {
        get(key) {
            return key ? proxy[key] : copy(proxy);
        },
        get proxy() {
            return proxy;
        },
        getProxy() {
            return proxy;
        },
        getContext() {
            return proxy;
        },
        loopListener(callback) {
            ___callbacklistener___ = callback;
        },
        removeLoopListener() {
            return ___callbacklistener___ = false;
        },
        dispatch(key, payload)
        {
            let result;

            if (typeof key === "function" && !payload) {
                result = key.call({}, proxy);

                if (result) {
                    this.fill(result);
                }

            } else if (typeof payload === "function") {
                result = payload.call({}, proxy[key]);
                this.fill({[key]: result});

            } else {
                proxy[key] = payload;
            }

            return this;
        },
        observe(key, callback) {
            if (typeof key === "function" && !callback) {
                ___eventcallbacks___.default = key;
            } else {
                ___eventcallbacks___[key] = typeof callback === "function"
                    ? callback
                    : null;
            }

            return this;
        },

        fill(payload, to) {
            Object.keys(payload).forEach((key) => {
                if (to) {
                    if (!proxy[to]) { proxy[to] = {}; }
                    proxy[to][key] = payload[key];
                } else {
                    proxy[key] = payload[key];
                }
            });

            return this;
        },
    };
};


export default Roxy;
