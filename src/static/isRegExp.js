
const isRegExp = function (val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}

export default isRegExp;
