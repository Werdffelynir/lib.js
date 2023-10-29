/**
 *
 * <pre>
 *     <div data-action="keep">...</div>
 *     <div data-action="load">...</div>
 *     <div data-action="load">...</div>
 *     <div data-action="exit">...</div>
 *
 *     searchAttr('data-action')
 *     searchAttr('data-action', '#root')
 *     searchAttr('data-action', document.querySelector('#root'))
 *     // result : { keep: HTMLElement, load: HTMLElement, exit: HTMLElement }
 *     // skips identical attribute values. subsequent elements after the first will be skipped
 *     // Use parameter "stack = true" for receive result in arrays
 *     searchAttr('data-action', document.querySelector('#root'), true)
 *     // result: {
 *         keep: [ HTMLElement ],
 *         load: [ HTMLElement, HTMLElement ],
 *         exit: [ HTMLElement ],
 *      }
 * </pre>
 *
 * @param {String} attr
 * @param {HTMLElement|string} from
 * @param {boolean} stack
 * @returns {{}}
 */
function searchAttr(attr, from = document.body, stack = false) {
    let i = 0;
    if (typeof from === 'string') from = document.querySelector(from);
    const elems = Array.from(from.querySelectorAll('['+attr+']'));
    const elems_stack = {};
    while (elems.length > i) {
        const a = elems[i].getAttribute(attr);
        if (a.length === 0) {
            if (stack) {
                if (!Array.isArray(elems_stack[attr])) elems_stack[attr] = [];
                elems_stack[attr].push(elems[i]);
            } else {
                elems_stack[attr] = elems[i];
            }
        } else {
            elems_stack[a] = elems[i];
        }
        i ++;
    }
    return elems_stack;
}

export default searchAttr;
