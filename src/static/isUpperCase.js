
const isUpperCase = function (character) {
    return character === character.toUpperCase() /*&& character !== character.toLowerCase()*/;
};

const isUpperCase2 = function (character) {
    let code = character.charCodeAt(0);
    return code >= 65 && code <= 90;
};

export default isUpperCase;