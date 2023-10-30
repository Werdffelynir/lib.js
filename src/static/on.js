import queryAll from './queryAll';
import typeOf from './typeOf';
import isNode from './isNode';

/**
 *
 * @param {*|string|Element} selector
 * @param {string} eventName
 * @param {function} callback
 * @param {boolean} bubble
 */
const on = function (selector, eventName, callback, bubble = false) {
    let i, elements = [];

    switch (typeOf(selector)) {
        case 'string':
            elements = queryAll(selector);
            break;
        case 'object':
            if (isNode(selector))
                elements = [selector];
            break;
        case 'array':
            elements = selector;
            break;
    }

    for (i = 0; i < elements.length; i++) {
        if (elements[i] && elements[i].addEventListener)
            elements[i].addEventListener(eventName, callback, !!bubble);
    }
};

export default on;
