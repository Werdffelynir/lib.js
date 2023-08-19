/**
 *
 * @param value
 * @returns {boolean}
 */
const isNumeric = (value) => {
    const n = parseFloat(value);
    return !isNaN(n) && typeof n == 'number';
};

export default isNumeric;
