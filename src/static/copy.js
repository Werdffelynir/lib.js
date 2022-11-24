import typeOf from "./typeOf";
import isNode from "./isNode";


const copy = function (src, instance)
{
    if (isNode(src))
        return src.cloneNode(true);

    if (Array.isArray(src))
        return src.slice();

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

    return src;
};

export default copy;
