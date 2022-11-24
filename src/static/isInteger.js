
const isInteger = function (val) {
return typeof val === 'number' && isFinite(val) && Math.floor(val) === val;
}

export default isInteger;
