import getDocument from "./getDocument";


const domLoaded = function (callback) {
    const doc = getDocument();
    if (doc.querySelector('body'))
        callback.call();
    else
        doc.addEventListener('DOMContentLoaded', function () {
            callback.call()
        }, false);
};

export default domLoaded;
