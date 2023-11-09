import typeOf from './typeOf';
import isNode from './isNode';
import isObject from "./isObject";

/**
 *
 * @param tag
 * @param attrs
 * @param inner
 * @param styles
 * @return {HTMLElement,HTMLCanvasElement}
 */
const createElement = function (tag, attrs, inner, styles) {

    const
        element = document.createElement(tag),
        is_object = function (src) {
            return src !== null && typeof src === 'object' && !Array.isArray(src);
        },
        insert_html = function (src) {
            element.insertAdjacentHTML('beforeend', src);
        },
        insert_child = function (src) {
            element.appendChild(src);
        },
        insert = function (src) {
            if (typeof src === 'string')
                insert_html(src);
            else if (src && src.nodeType === Node.ELEMENT_NODE)
                insert_child(src);
            else if (Array.isArray(src))
                for (let i = 0; i < src.length; i++) insert(src[i]);
        };

    if (arguments.length === 2 && Array.isArray(attrs)) {
        inner = attrs;
        attrs = false;
    }
    console.log(attrs)
    if (attrs)
        Object.keys(attrs).forEach((key) => {
            if (key === 'style' && (attrs[key] && typeof attrs[key] === 'object')) {
                styles = styles ? {...styles, ...attrs[key]} : attrs[key];
            } else {
                element.setAttribute(key, attrs[key])
            }
        });

    if (styles)
        Object.keys(styles).forEach((key) => { element.style[key] = styles[key] });

    if (inner)
        insert(inner);

    return element;
};

export default createElement;
