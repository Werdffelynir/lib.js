import typeOf from "./typeOf";
import getDocument from "./getDocument";

const documentElement = getDocument();
const loadJS = function (src, onload, onerror) {
    if (!src) return null;
    if (typeOf(src, 'array')) {
        for (let i = 0; i < src.length; i++) {
            loadJS(src[i], onload, onerror);
        }
    } else {
        const script = documentElement.createElement('script');
        const id = 'resource-' + Math.random().toString(32).slice(2);

        script.src = (src.substr(-3) === '.js') ? src : src + '.js';
        script.type = 'application/javascript';
        script.id = id;
        script.onload = onload;
        script.onerror = onerror;

        documentElement.head.appendChild(script);
        return script
    }
};

export default loadJS;