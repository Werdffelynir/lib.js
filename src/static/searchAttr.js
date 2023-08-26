
function searchAttr(html, attr, stack = false) {
    let i = 0;
    const elems = Array.from(html.querySelectorAll('['+attr+']'));
    const elemsNamed = {};
    while (elems.length > i) {
        const a = elems[i].getAttribute(attr);
        if (a.length === 0) {
            if (stack) {
                if (!Array.isArray(elemsNamed[attr])) elemsNamed[attr] = [];
                elemsNamed[attr].push(elems[i]);
            } else {
                elemsNamed[attr] = elems[i];
            }
        } else {
            elemsNamed[a] = elems[i];
        }
        i ++;
    }
    return elemsNamed;
}

export default searchAttr;
