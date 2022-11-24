/**
 * Examples:
 * .sprintf("Hello {0} my friend, i am {1}", "Mr.Morrison", "John")
 * @param string
 * @param args
 * @returns {void|*}
 */
const sprintf = function (string, ...args) {
    return string.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

export default sprintf;
