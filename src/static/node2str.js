

const node2str =  function (element) {
    const container = document.createElement("div");
    container.appendChild(element.cloneNode(true));
    return container.innerHTML;
};

export default node2str;
