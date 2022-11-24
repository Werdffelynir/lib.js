
const isNumber = function (value) {
    try {
        value = parseInt(value);
        return (typeof value === 'number' || value instanceof Number) && !isNaN(value);
    } catch (err) {
        return false;
    }
}
export default isNumber;
