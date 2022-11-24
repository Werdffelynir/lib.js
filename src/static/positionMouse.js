

const positionMouse = function (event) {
    if (!(event instanceof MouseEvent)) {
        console.error('Error: argument is not type the MouseEvent!');
        return;
    }
    const rect = document.body.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

export default positionMouse;
