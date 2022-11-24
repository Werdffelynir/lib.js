

/**
 * wait({}, (resolve, reject) => resolve() );
 *
 * @param args
 * @param callback
 * @returns {Promise<any>}
 */
const wait = function (args, callback) {
    return new Promise((resolve, reject) => {
        callback.bind(args)(resolve, reject);
    })
};

export default wait;
