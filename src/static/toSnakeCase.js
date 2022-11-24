
const toSnakeCase = function (characters) {
    return characters.replace(/[A-Z]/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : '_' + letter.toLowerCase();
    });
    /*        return characters.split('').map((character, index) => {
                if (character === character.toUpperCase()) {
                    return (index > 0 ? '_':'') + character.toLowerCase();
                } else {
                    return character;
                }
            }).join('');*/
};

export default toSnakeCase;