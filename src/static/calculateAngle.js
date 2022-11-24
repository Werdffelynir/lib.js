

/**
 * Calculate angle between two points. return object: {angle:, x:, y:}
 * @param p1
 * @param p2
 * @returns {{angle: number, x: number, y: number}}
 */
const calculateAngle = function (p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const angle = Math.atan2(dy, dx);

    return {
        angle: angle,
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
};

export default calculateAngle;
