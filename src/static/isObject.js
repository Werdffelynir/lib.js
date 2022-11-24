import isEmpty from "./isEmpty";

const isObject = function (value) {
    return typeof value === 'object' &&
        !isEmpty(value) &&
        !Array.isArray(value) &&
        !(value instanceof RegExp) &&
        !(value instanceof String) &&
        !(value instanceof Number);
}

export default isObject;
