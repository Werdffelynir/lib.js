// import DOMParser from 'DOMParser';

const isHTMLString = function (value, truest = false) {

    if (truest) {
        const div = document.createElement('div');
        div.innerHTML = value;
        return !!div.childElementCount;
    }

    return value.trim().substring(0, 1) === '<';
};

export default isHTMLString;
