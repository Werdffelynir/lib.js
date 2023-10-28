
const fixFloat = function (value, afterDot = 2) {
    if (!afterDot) return parseInt(value)
    return Number(value.toFixed(afterDot))
}

export default fixFloat;
