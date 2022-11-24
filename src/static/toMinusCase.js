
const toMinusCase = function (characters) {
    return characters.replace(/[A-Z]/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
    });
};

export default toMinusCase;