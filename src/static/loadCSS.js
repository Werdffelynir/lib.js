import typeOf from "./typeOf";
import getDocument from "./getDocument";

const loadCSS = function (src, onload, onerror) {
    if (!src) return null;
    if (typeOf(src, 'array')) {
        for (let i = 0; i < src.length; i++) {
            loadCSS(src[i], onload, onerror);
        }
    } else {
        const doc = getDocument();
        const link = doc.createElement('link');
        const id = "src-" + Math.random().toString(32).slice(2);

        link.href = (src.substr(-4) === '.css') ? src : src + '.css';
        link.rel = 'stylesheet';
        link.id = id;
        link.onload = onload;
        link.onerror = onerror;

        doc.head.appendChild(link);
        return link
    }
};

export default loadCSS;
