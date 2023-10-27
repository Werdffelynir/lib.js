import isNode from './isNode';
import typeOf from './typeOf';
import query from './query';

/**
 * Ex:
 * inject ( '.content', "lorem text"  )
 * inject ( '.content', ["text","text","text"]  )
 * inject ( '.content', Node  )
 * inject ( '.content', [Node,Node,Node]  )
 *
 *
 * @param selector
 * @param data
 * @param {boolean} append
 * @param from
 * @returns {null|Node|boolean}
 */
const inject = function (selector, data, append = false, from = null)
{
    if (typeOf(selector, 'array')) {
        selector.forEach((elem) => {
            inject(elem, data, append, from);
        });
        return null;
    }

    if (typeOf(selector, 'string'))
        selector = query(selector, from);

    if (!append)
        selector.textContent = '';

    if (isNode(selector)) {
        if (isNode(data)) {
            selector.appendChild(data);
        } else if (typeOf(data, 'array')) {
            let i;
            for (i = 0; i < data.length; i++)
                inject(selector, data[i], true, from);
        } else {
            selector.innerHTML = (!append) ? data : selector.innerHTML + data;
        }
        return selector;
    }
    return null;
};

export default inject;
