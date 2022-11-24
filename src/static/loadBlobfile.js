
const loadBlobfile = function (src, onload, onerror) {
    fetch(src)
        .then(response => response.blob())
        .then(blob => onload(blob))
        .catch(error => typeof onerror === 'function' ? onerror(error) : null);
};

export default loadBlobfile;