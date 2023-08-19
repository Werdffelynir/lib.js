import isNumeric from "./isNumeric";

/**
 *
 * @param value
 * @returns {number|boolean}
 */
const toNumber = (value) => isNumeric(value) ? ~~value : false;

export default toNumber;
