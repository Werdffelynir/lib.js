
const decodeGetQuery = function (query) {
    const result = {};
    const pairs = (query[0] === '?' ? query.substr(1) : query).split('&');
    pairs.forEach((item, i) => {
        let pair = pairs[i].split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    });
    return result;
};

export default decodeGetQuery;
