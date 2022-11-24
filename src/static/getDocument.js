
const getDocument = function () {
    if (document)
        return document;
    else
        throw new Error('document object not exist!');
};

export default getDocument;
