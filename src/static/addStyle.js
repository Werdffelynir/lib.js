/**
 * Added styles to element as attributes
 *
 * <pre>
 * Example:
 *  const styleObject = {background: 'black', paddingTop: '10px' };
 *
 *  stylizer ( NodeElement,  styleObject );
 *
 * </pre>
 *
 * @param {HTMLElement|String} element
 * @param {CSSStyleDeclaration|{}} styles
 */

/**
 *
 * @param {String|HTMLElement|*} element
 * @param {CSSStyleDeclaration|{}} styles
 * @returns {*}
 */
function addStyle(element, styles)
{
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    Object.keys(styles).forEach((key) => {
        if (element.style[key] !== undefined) {
            element.style[key] = styles[key];
        }
    });

    return element;
}

export default addStyle;
