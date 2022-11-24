import typeOf from './typeOf';
import isNode from './isNode';
import queryAll from './queryAll';

/**
 *
 * css( '.header', {color: 'red', 'font-size': '120%'} )
 * // or
 * css( '.header', 'color', 'red' )
 *
 * @param selector
 * @param properties
 * @returns {null|undefined}
 */
const css = function (selector, properties) {
    if (!selector || !properties) return;
    if (arguments.length === 3) {
        const prop = {};
        prop[properties] = arguments[2];
        return css(selector, prop);
    }

    let i, k, elements = null,
        typeSelector = typeOf(selector),
        typeProperties = typeOf(properties),
        parse = function (str) {
            let i, p1 = str.split(';'), p2, pn, ix, o = {};
            for (i = 0; i < p1.length; i++) {
                p2 = p1[i].split(':');
                pn = p2[0].trim();
                ix = pn.indexOf('-');
                if (ix !== -1)
                    pn = pn.substring(0, ix) + pn[ix + 1].toUpperCase() + pn.substring(ix + 2);
                if (p2.length === 2)
                    o[pn] = p2[1].trim()
            }
            return o;
        };


    switch (typeSelector) {
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

    if (elements) {

        if (typeProperties === 'string')
            properties = parse(properties);

        for (i in elements)
            for (k in properties)
                elements[i].style[k] = properties[k];
    }

    return elements
};

export default css;
