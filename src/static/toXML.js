
/**
 * @deprecated use `str2node` or `str2fragment`
 *
 * @param value
 * @returns {boolean|Element}
 */
const toXML = function (value) {
    if (value) {
        const type = 'text/xml';
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(value, type);

        if (xmlDoc.documentElement && xmlDoc.documentElement.tagName !== 'html') {
            return xmlDoc.documentElement;
        }
        return false;
    }
    return false;
}

export default toXML;
