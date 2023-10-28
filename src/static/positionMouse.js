

const positionMouse = function (event, from = null /* document.body */) {
    if (!(event instanceof MouseEvent)) {
        console.error('Error: argument is not type the MouseEvent!');
        return;
    }
    const rect = from instanceof HTMLElement
        ? from.getBoundingClientRect()
        : event.target.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

export default positionMouse;
