/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {Rectangle}
 * @constructor
 */
function Rectangle(x = 0, y = 0, width = 100, height = 100) {
    if (!(this instanceof Rectangle)) {
        return new Rectangle(x, y, width, height);
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.toString = () => '[Rectangle]';
}


export default Rectangle;
