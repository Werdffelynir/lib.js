

/**
 *
 * @param object1 base
 * @param object2
 * @returns {*}
 */
const merge = (object1, object2) => {
    for (let key in object2) {
        try {
            if ( object2[key].constructor === Object ) {
                object1[key] = merge(object1[key], object2[key]);
            } else {
                object1[key] = object2[key];
            }
        } catch(e) {
            object1[key] = object2[key];

        }
    }
    return object1;
};

export default merge;
