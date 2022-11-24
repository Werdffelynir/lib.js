/**
 * 
 * @returns {{create: (function(*=, *=): any[])}}
 * @constructor
 */
function Arr () {

    return {
        create: function (items = 0, default_value = null) {
            return (new Array(items)).fill(default_value);
        },
    };
}

export default Arr;
