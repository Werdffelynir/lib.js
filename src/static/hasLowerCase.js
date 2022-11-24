
const hasLowerCase = function (character) {
    const lowers = character.split('').filter((char)=>{
        let code = char.charCodeAt(0);
        return code >= 65 && code <= 90;
    });

    return lowers.length > 0;
};

export default hasLowerCase;
