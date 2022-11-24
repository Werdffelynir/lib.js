
const isLowerCase = function (character) {
    return character === character.toLowerCase() /*&& character !== character.toUpperCase()*/;
};

const isLowerCase2 = function (character) {
    let code = character.charCodeAt(0);
    return code >= 97 && code <= 122;
};

export default isLowerCase;