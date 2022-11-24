/**
 *
 * @param {object|array} list
 * @param {string|number} attr
 * @param {*} attrValue
 * @returns {*[]}
 */
const finds = function (list, attr, attrValue) {
    let i, tmp = [];
    if (list && typeof list === "object")
        list = Object.values(list);

    if (Array.isArray(list))
        for (i = 0; i < list.length; i++)
            if (list[i] && list[i][attr] !== undefined && list[i][attr] === attrValue)
                tmp.push(list[i]);

    return tmp ;
};

finds.many = function (values, attr, attrValue) {
    let tmp = finds(values, attr, attrValue);
    return tmp.length ? tmp : false;
};


finds.one = function (values, attr, attrValue) {
    let tmp = finds(values, attr, attrValue);
    return tmp.length ? tmp[0] : false;
};

export default finds;
