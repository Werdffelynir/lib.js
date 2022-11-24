import str2fragment from "./str2fragment";

const str2node = function (string) {
    let result;
    let fragment = str2fragment(string);

    switch (fragment.childElementCount) {
        case 0: break;
        case 1:
            result = fragment.firstElementChild;
            break;
        default:
            let container = document.createElement("span");
            container.appendChild(fragment);
            result = container;
    }
    return result;
};

export default str2node;
