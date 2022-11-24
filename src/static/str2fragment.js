
const str2fragment = function (string) {
    if (document.createRange)
        return document.createRange().createContextualFragment(string);
    else {
        let i,
            fragment = document.createDocumentFragment(),
            container = document.createElement("div");

        container.innerHTML = string;
        while (i = container.firstChild)
            fragment.appendChild(i);

        return fragment;
    }
};

export default str2fragment;
