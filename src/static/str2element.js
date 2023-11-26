

const str2element = function (string) {
    return document.createRange().createContextualFragment(string).firstElementChild;;
};

export default str2element;
