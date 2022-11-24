
const toCamelCase = function (characters) {
    const indexes = [];
    let string = characters.replace(/[_]/g, function (letter, index) {
        indexes.push(index - indexes.length);
        return '';
    });
    indexes.forEach((index)=>{
        const start = string.substring(0, index);
        const replace = string.substr(index,1).toUpperCase();
        const end = string.substring(index + 1);
        string = start + replace + end;
    });
    return string;
};

export default toCamelCase;