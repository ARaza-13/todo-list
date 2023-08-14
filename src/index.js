// test to see if webpack is functioning properly
function component() {
    const element = document.createElement('div');

    element.innerHTML = 'Todo List!';

    return element;
}

document.body.appendChild(component());