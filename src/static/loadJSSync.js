
import typeOf from "./typeOf";
import createElement from "./createElement";

/**
 * Loads a script element with javascript source
 *
 * .loadJSSync ( {
 *      myscript1: '/path/to/myscript1',
 *      myscript2: '/path/to/myscript2',
 *    },
 *    function (list) {})
 *
 * .loadJSSync ( [
 *      '/path/to/myscript1',
 *      '/path/to/myscript2',
 *    ],
 *    function (list) {})
 *
 * @namespace NamespaceApplication.loadJSSync
 * @param srcs       Object, Array. items: key is ID, value is src
 * @param callback  Function called when all srcs is loaded
 * @param onerror   Function called when load is failed
 * @returns {*}
 */
const loadJSSync = function (srcs, callback, onerror) {
    if (typeOf(srcs, 'object') || typeOf(srcs, 'array')) {
        if (typeOf(srcs, 'array')) {
            const obj = {};
            srcs.forEach( (item, i) => {
                obj['resource-' + Math.random().toString(32).slice(2)] = item
            });
            srcs = obj;
        }
        let iterator = 0;
        const scripts = {};
        Object.keys(srcs).forEach((key) => {
            const src = srcs[key];
            const script = createElement('script', {
                src: (src.substr(-3) === '.js') ? src : src + '.js',
                type: 'application/javascript',
                id: key,
            });
            script.onerror = onerror;
            script.onload = function (e) {
                scripts[this.id] = this;
                iterator ++;
                if (iterator === length) {
                    callback.call({}, scripts);
                }
            };
            document.head.appendChild(script);
        })
    }
};

export default loadJSSync;
