
const toObject = function (value) {
    return (typeof value === 'object')
        ? JSON.parse(JSON.stringify(value))
        : {};
}

export default toObject;
