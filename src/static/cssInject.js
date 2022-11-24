
import createElement from "./createElement";
import hasLowerCase from "./hasLowerCase";
import toMinusCase from "./toMinusCase";

/**
 * cssInject({ '#canvas': { backgroundColor: '#171717',border: '3px solid #DDDDDD' } });
 *
 * @param object
 * @returns {*}
 */
const cssInject = function (object) {
    let cssString = '';
    Object.keys(object).forEach((selector)=>{
        cssString += `${selector} {\n`;
        Object.keys(object[selector]).forEach((prop)=>{
            const name = hasLowerCase(prop) ? toMinusCase(prop) : prop;
            const value = object[selector][prop];
            cssString += `\t${name}: ${value};\n`;
        });
        cssString += `}\n`;

    });
    const css = createElement('style', {}, cssString);
    if (document && document.head) {
        document.head.appendChild(css);
    }

    return css;
};

export default cssInject;
