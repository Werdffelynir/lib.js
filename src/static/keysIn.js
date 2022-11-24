
const keysIn = function (object) {
    if (!object) { return []; }

    let keys = [], key;
    for (key in object) {
        keys.push(key);
    }

    return keys;
}


export default keysIn;
