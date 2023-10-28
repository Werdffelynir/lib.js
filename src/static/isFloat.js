
const isFloat = function (val) {
    return Number(val) === val && val % 1 !== 0;
}

export default isFloat;
