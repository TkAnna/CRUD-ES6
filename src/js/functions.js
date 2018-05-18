'use strict';

function addClasses(element, classes) {
    classes.forEach((classItem) => {
        element.classList.add(classItem);
    });
}

function actionsButton(content, originClass, parent, clickEventHandler) {
    let btn = new Element('input', parent);
    btn.addClass('btn', originClass);
    btn.addAttribute('type', 'button');
    btn.addAttribute('value', content);
    btn.newElement.addEventListener('click', clickEventHandler);
}

function saveUsersIntoLocalStorage () {
    let serialUsers = JSON.stringify(users);
    localStorage.setItem('users', serialUsers);
}
