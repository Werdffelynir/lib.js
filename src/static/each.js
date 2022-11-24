import isNode from './isNode';
import query from './query';
import typeOf from "./typeOf";

/**
 *
 * each( array, (i, v, array) => {}, instance )
 *
 * @param list
 * @param callback
 * @param instance
 */
const each = function (list, callback, instance) {
    let type = typeOf(list);

    switch (type) {
        case 'array':
            list.forEach((i, v, a) => callback.call(instance, i, v, a));
            break;
        case 'object':
            if (isNode(list)) {
                if (list instanceof NodeList)
                    each(Array.from(list), callback, instance)
                else
                    each([list], callback, instance)
            } else
                Object.keys(list).forEach((key) => callback.call(instance, list[key], key, list));
            break;
        case 'string':
            each(list.split(""), callback, instance);
            break;
    }
};

each.parent = function (selector, filter, loops = 10) {
    const getParent = (elem) => elem && elem.parentNode ? elem.parentNode : false;
    let element = isNode(selector) ? selector : query(selector);
    while (loops > 0 && element) {
        loops--;
        if (element.parentNode && element.parentNode.querySelector(filter)) {
            return element
        }
        element = getParent(element);
    }
};

each.filter = function (selector, filter, callback, loops = 10) {
    const getParent = (elem) => elem && elem.parentNode ? elem.parentNode : false;
    let element = isNode(selector) ? selector : query(selector);
    while (loops > 0 && element) {
        loops--;
        if (element.parentNode && element.parentNode.querySelector(filter)) {
            callback(element);
            return element
        }
        element = getParent(element);
    }
    return element;
};

export default each;
