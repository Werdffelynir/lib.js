import typeOf from "./typeOf";


const isEmpty = function (src) {
    if (typeOf(src, 'object') || typeOf(src, 'array')) {
        for (let key in src)
            if (src.hasOwnProperty(key))
                return false;
        return true;
    } else if (typeOf(src, 'string')) {
        src = src.replace(/\s/g, '');
        return src === "" || src === "0";
    } else {
        return (src === 0 || src === null || src === undefined || src === false || isNaN(src));
    }
};

export default isEmpty;
