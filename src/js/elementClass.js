'use strict';

class Element {
    constructor(tagName, parent) {

        this.newElement = document.createElement(tagName);
        parent.appendChild(this.newElement);
    }

    addClass(...classList) {
        classList.forEach((classItem) => {
            this.newElement.classList.add(classItem);
        });
    }
    addContent(elementContent){
        this.newElement.innerHTML = elementContent;
    }
    addAttribute(nameAttr,valueAttr){
        this.newElement.setAttribute(nameAttr,valueAttr);
    }
}

