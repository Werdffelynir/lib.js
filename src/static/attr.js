import query from './query';
import typeOf from './typeOf';
import isNode from './isNode';


const attr = function (element, name, value) {
    const type_element = typeOf(element);
    if (type_element === 'string') {
        element = query(element);
    }

    if (isNode(element) && arguments.length === 2) {
        if (typeOf(name, 'object')) {
            for (let key in name)
                attr(element, key, name[key]);
        } else
            return element.getAttribute(name);
    }
    else if (isNode(element) && arguments.length === 3) {
        if (value === false) element.removeAttribute(name);
        else element.setAttribute(name, value);
    }
};

export default attr;
