
const stylizer = function (element, styles) {
    Object.keys(styles).forEach((key) => {
        if (element.style[key] !== undefined) {
            element.style[key] = styles[key];
        }
    });
};

export default stylizer;
