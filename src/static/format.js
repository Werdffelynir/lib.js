
import isNode from "./isNode";
import defined from "./defined";
import node2str from "./node2str";


/**
 * Formatting of string, or maybe template builder
 *
 * Examples:
 * .format("Hello {0}, your code is {1}!", ['Jade', 'Prefect']);
 *
 * .format("Hello {name}, your code is {mean}!", {name:'Jade', mean: 'Prefect'});
 *
 * @param string    String
 * @param list  Array|Object
 * @returns string
 */
const format = function (string, list) {
    let reg;
    if (Array.isArray(list))
        reg = new RegExp(/{(\d+)}/g);
    else if (list && typeof list === 'object')
        reg = new RegExp(/{(\w+)}/g);

    return string.replace(reg, function (match, number) {
        if (defined(list[number]) && isNode(list[number]))
            list[number] = node2str(list[number]);

        return typeof list[number] !== undefined ? list[number] : match;
    });
};

export default format;
