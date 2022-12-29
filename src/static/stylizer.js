import typeOf from "./typeOf";
import isHTMLString from "./isHTMLString";
import str2node from "./str2node";
import query from "./query";

/**
 * Added styles to element as attributes
 *
 * <pre>
 * Example:
 *  const styleObject = {background: 'black', paddingTop: '10px' };
 *
 *  stylizer ( NodeElement,  styleObject );
 *  stylizer ( '.element',  styleObject );
 *  stylizer ( '<div>Hello my friend!</div>',  styleObject );
 *
 * </pre>
 *
 * @param element
 * @param styles
 */

const stylizer = function (element, styles)
{
    if (typeOf(element, 'string')) {
        if (isHTMLString(element)) element = str2node(element);
        else element = query(element);
    }

    Object.keys(styles).forEach((key) => {
        if (element.style[key] !== undefined) {
            element.style[key] = styles[key];
        }
    });

    return element;
};

export default stylizer;
