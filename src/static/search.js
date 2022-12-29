import isNode from './isNode';
import queryAll from './queryAll';
import query from './query';

/**
 * ```
 *  <div data-on="open">open</div>
 *  <div data-on="close">close</div>
 *
 *  const onNodes = search('[data-on]', 'data-on')
 *
 *  // onNodes
 *  {
 *      open: Node,
 *      close: Node
 *  }
 * ```
 *
 *
 * @param selector
 * @param attr
 * @param from
 * @param stacked
 * @return {{}}
 */
const search = function (selector, attr, from, stacked = false) {
    from = isNode(from) ? from : query(from);
    let i = 0,
        key,
        elements = {},
        query_elements = queryAll(selector, from || document.body);

    if (query_elements) {
        while (i < query_elements.length) {
            if (!attr)
                elements[i] = query_elements[i];
            else {
                if (query_elements[i].hasAttribute(attr)) {
                    key = query_elements[i].getAttribute(attr);

                    if (stacked && elements[key])
                        Array.isArray(elements[key])
                            ? elements[key].push(query_elements[i])
                            : elements[key] = [elements[key], query_elements[i]];
                    else
                        elements[key] = query_elements[i];
                }
            }
            i++;
        }
    }
    return elements;
};

export default search;
