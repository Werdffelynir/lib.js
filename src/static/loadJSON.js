
const loadJSON = function (src, onload, onerror) {
    fetch(src)
        .then(response => response.json())
        .then(json => onload(json))
        .catch(error => typeof onerror === 'function' ? onerror(error) : null);
};

export default loadJSON;