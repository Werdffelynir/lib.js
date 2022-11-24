
const getWindow = function () {

    if (typeof window !== 'undefined') {
        return window;
    } else {
        // return global ? global : {};
        throw new Error('window object not exist!');
    }
};

export default getWindow;
