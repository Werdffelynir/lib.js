import queryAll from './queryAll';

/**
 *
 * @param selector
 * @param from
 * @param callback
 * @param thisInstance
 * @returns {Node|boolean}
 */
const query = function (selector, from, callback, thisInstance) {
    const elements = queryAll(selector, from, callback, thisInstance);
    return elements && elements[0] ? elements[0] : false;
};

export default query;
