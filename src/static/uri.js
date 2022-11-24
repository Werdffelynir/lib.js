import getLocation from "./getLocation";


const uri = function (uri) {
    const loc = getLocation();
    uri = uri || loc.pathname;
    uri = uri.replace(/\/+/ig, '/');
    return uri.length > 1 && uri.slice(0, 1) !== '/' ? '/' + uri : uri;
};

export default uri;
