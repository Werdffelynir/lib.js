import isNode from './isNode';
import typeOf from './typeOf';
import getDocument from './getDocument';

const doc = getDocument();

/**
 *
 * node = queryAll( '.sidebar' );
 * node = queryAll( '.sidebar', '.left' );
 * node = queryAll( '.sidebar', '.left', (elem) => {console.log(elem)} );
 * node = queryAll( '.sidebar', '.left', (elem) => {console.log(elem)}, DATA_OBJECT );
 *
 * @param {string|Element} selector
 * @param {string|Element} from
 * @param {function} callback
 * @param {object} thisInstance
 * @returns {*[]}
 */
const queryAll = function (selector, from, callback = null, thisInstance = null) {
    let elements = [];
    from = from || doc;

    if (isNode(selector))
        return [selector];

    if (typeOf(from, 'string'))
        from = doc.querySelector(from);
    if (from)
        elements = [].slice.call(from.querySelectorAll(selector));

    if (callback)
        elements.forEach((element) => {callback.call(thisInstance || {}, element)});

    return elements;
};

export default queryAll;
