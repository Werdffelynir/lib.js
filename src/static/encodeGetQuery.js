
const encodeGetQuery = function (params) {
    let result = '';
    Object.keys(params).forEach((key) => {
        result += ((result.length) ? '&' : '?') + key + '=' + encodeURIComponent(params[key]);
    });

    return result;
};

export default encodeGetQuery;
