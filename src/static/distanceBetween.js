

/**
 * Calculate distance between two Points
 * @param p1
 * @param p2
 * @returns {number}
 */
const distanceBetween = function (p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
};

export default distanceBetween;
