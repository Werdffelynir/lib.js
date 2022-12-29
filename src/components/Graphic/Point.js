/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {Point}
 * @constructor
 */
function Point(x = 0, y = 0) {
    if (!(this instanceof Point)) {
        return new Point(x, y);
    }

    this.x = x;
    this.y = y;
    this.toString = () => '[Point]';
}


export default Point;
