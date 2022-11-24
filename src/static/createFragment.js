import isNode from "./isNode";
import typeOf from "./typeOf";
import str2node from "./str2node";


const createFragment = function (append) {
    const fragment = document.createDocumentFragment();

    if (isNode(append))
        fragment.appendChild(append);

    if (typeOf(append, 'string'))
        fragment.appendChild(str2node(append));

    return fragment
};

export default createFragment;
