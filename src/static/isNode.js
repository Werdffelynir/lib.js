

const isNode = function (value) {
    return value && (value.nodeType === Node.TEXT_NODE ||
        value.nodeType === Node.ELEMENT_NODE ||
        value.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
        value.nodeType === Node.DOCUMENT_NODE)
};

export default isNode;
