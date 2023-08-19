/**
 *
 * @param value
 * @returns {boolean}
 */
const isNumber = (value) => !isNaN(+value) && typeof value == 'number';

export default isNumber;
