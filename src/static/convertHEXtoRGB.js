

/**
 * convertHEXtoRGB
 * @param hex
 * @returns {*}
 */
const convertHEXtoRGB = function (hex) {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) { return r + r + g + g + b + b });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : null;
};

export default convertHEXtoRGB;
