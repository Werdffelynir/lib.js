
const definedIn = function (stack, value) {
    return stack && stack[value] !== undefined;
};

export default definedIn;
