import typeOf from "./typeOf";
import isNode from "./isNode";

/**
 *
 * @param src
 * @param instance
 * @returns {{}|ActiveX.IXMLDOMNode|Node|*[]|Date|*}
 */
const copy = function (src, instance = {})
{
    // Handle the 3 simple types, and null or undefined
    if (null == src || "object" != typeof src) return src;

    if (src instanceof Date) {
        let tmp;
        tmp = new Date();
        tmp.setTime(src.getTime());
        return tmp;
    }

    if (isNode(src))
        return src.cloneNode(true);

    if (Array.isArray(src)){
        // return src.slice();
        let tmp = [];
        for (let i = 0, len = src.length; i < len; i++) {
            tmp[i] = copy(src[i]);
        }
        return tmp;
    }

    if (typeof src === 'function')
        return src.bind(instance || {});

    if (typeOf(src, 'object')) {
        let result = {};
        Object.keys(src).forEach((key) => {
            let value = src[key];
            result[key] = copy(value, typeof value === "function" ? src : {});
        });
        return result;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

export default copy;
