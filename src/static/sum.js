
const sum = function (arr) {
    const parse = v => isNaN(v) ? 0 : v;
    return arr.reduce((acc, value) => parse(acc) + parse(value), 0);
    // arr.reduce(function(acc, value) { return acc + value; }, 0)
}

export default sum;