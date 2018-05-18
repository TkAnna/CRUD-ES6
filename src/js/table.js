'use strict';

class Table {

    constructor() {

    }

    generateTable() {
        Table.clearTable();
        let table = document.getElementById('table');
        addClasses(table, ['col-md-8', 'col-sm-12', 'mx-auto', 'm-3', 'border-top']);
        Table.generateTableHeader(table);
        Table.generateUserRows(table);
        Table.createAddButton(table);
    }

    static clearTable() {
        document.getElementById('table').innerHTML = '';
    }

    static generateTableHeader(parent) {

        let headerRow = new Element('div', parent);
        headerRow.addClass('row', 'p-2');

        headerElement('Name', headerRow.newElement);
        headerElement('Email', headerRow.newElement);
        headerElement('', headerRow.newElement);

        function headerElement(title, parent) {

            let headerElem = new Element('div', parent);
            headerElem.addClass('col', 'text-center');
            headerElem.addContent(title);
        }
    }

    static generateUserRows(parent) {
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }

        users.forEach((user, i) => {

            let row = new Element('div', parent);
            row.addClass('row');

            // getting user's name
            tableElement(user.name, row.newElement);

            // getting user's email
            tableElement(user.email, row.newElement);

            let userActions = new Element('div', row.newElement);
            userActions.addClass('col', 'text-center', 'border-top', 'd-flex', 'justify-content-around', 'p-1');
            userActions.addAttribute('data-index', i);

            actionsButton('View', 'btn-outline-info', userActions.newElement, clickViewBtnHandler);
            actionsButton('Edit', 'btn-outline-success', userActions.newElement, clickEditBtnHandler);
            actionsButton('Delete', 'btn-outline-danger', userActions.newElement, clickDeleteBtnHandler);

        });

        function tableElement(content, parent) {
            let tableElem = new Element('div', parent);
            tableElem.addClass('col', 'text-center', 'border-top', 'p-1');
            tableElem.addContent(content);
        }

        /*******************************************************************/

        function clickViewBtnHandler() {
            let parent = document.getElementById('viewBlock');

            addClasses(parent, ['hidden']);
            parent.innerHTML = '';

            parent.classList.toggle('hidden');

            let index = getIndex(this);

            getUserData('Name', 'name', index, parent);
            getUserData('Email', 'email', index, parent);
            getUserData('Gender', 'gender', index, parent, true);
            getUserData('Age', 'age', index, parent);
            getUserData('Phone number', 'phoneNumber', index, parent);

            actionsButton('Close', 'btn-info', parent, clickCloseBtnHandler);

        }

        /*******************************************************************/

        function clickEditBtnHandler() {
            document.getElementById('viewBlock').classList.add('hidden');

            let index = getIndex(this);

            let newForm = new Form();
            newForm.nameField.value = users[index].name;
            newForm.emailField.value = users[index].email;
            newForm.ageField.value = users[index].age;
            newForm.phoneNumberField.value = users[index].phoneNumber;
            newForm.bankCardNumberField.value = users[index].bankCardNumber;

            let genderValue = users[index].gender;
            for (let i = 0; i < newForm.genderField.length; i++) {
                if (newForm.genderField[i].value === genderValue) {
                    newForm.genderField[i].checked = true;
                }
            }

            newForm.toogleAddBlock();

            document.getElementById('saveBtn').onclick = () => {

                newForm.clearErrorAllFormFields();

                if (newForm.isValidName(newForm.nameField.value)) {
                    users[index].name = newForm.nameField.value;
                } else {
                    newForm.showError(newForm.nameField.parentNode, 'Enter correct name');
                }

                if (newForm.isValidEmail(newForm.emailField.value)) {
                    users[index].email = newForm.emailField.value;
                } else {
                    newForm.showError(newForm.emailField.parentNode, 'Enter correct email address');
                }

                if (newForm.isValidAge(newForm.ageField.value)) {
                    users[index].age = newForm.ageField.value;
                } else {
                    newForm.showError(newForm.ageField.parentNode, 'Enter correct age');
                }

                if (newForm.isValidPhoneNumber(newForm.phoneNumberField.value)) {
                    users[index].phoneNumber = newForm.phoneNumberField.value;
                } else {
                    newForm.showError(newForm.phoneNumberField.parentNode, 'Enter correct phone number +380xxxxxxxxx');
                }

                if (newForm.isValidBankCardNumber(newForm.bankCardNumberField.value)) {
                    users[index].bankCardNumber = newForm.bankCardNumberField.value;
                } else {
                    newForm.showError(newForm.bankCardNumberField.parentNode, 'Enter correct credit card number xxxx xxxx xxxx xxxx');
                }

                for (let i = 0; i < newForm.genderField.length; i++) {
                    if (newForm.genderField[i].checked) {
                        users[index].gender = newForm.genderField[i].value;
                    }
                }

                if (newForm.isValidName(newForm.nameField.value) &&
                    newForm.isValidEmail(newForm.emailField.value) &&
                    newForm.isValidAge(newForm.ageField.value) &&
                    newForm.isValidPhoneNumber(newForm.phoneNumberField.value) &&
                    newForm.isValidBankCardNumber(newForm.bankCardNumberField.value)) {

                    newForm.toogleAddBlock();
                    saveUsersIntoLocalStorage();
                    newForm.addNewDataToTable();
                }
            };
        }

        /*******************************************************************/

        function clickDeleteBtnHandler() {
            let confirmMessage = confirm('Do you really want to delete the user?');

            let index = getIndex(this);
            if (confirmMessage) {
                users.splice(index, 1);
                saveUsersIntoLocalStorage();
                let newForm = new Form();
                newForm.addNewDataToTable();
            }
        }

        /*******************************************************************/

        function getIndex(elem) {
            return elem.parentNode.getAttribute('data-index');
        }

        function getUserData(text, field, index, parent, genderParam) {
            let fieldElement = new Element('div', parent);
            if (genderParam) {
                let genderValue = genders[users[index][field]];
                fieldElement.addContent(`${text} ${genderValue}`);

            } else {
                fieldElement.addContent(`${text} ${users[index][field]}`);
            }
        }

        function clickCloseBtnHandler() {
            this.parentNode.classList.add('hidden');
        }
    }

    static createAddButton(parent) {
        let addBtnArea = new Element('div', parent);
        addBtnArea.addClass('row', 'd-flex', 'justify-content-end', 'border-top', 'p-3');

        actionsButton('Add user', 'btn-secondary', addBtnArea.newElement, clickAddBtnHandler);

        /*******************************************************************/
        function clickAddBtnHandler() {
            if (!document.getElementById('viewBlock').classList.contains('hidden')) {
                document.getElementById('viewBlock').classList.add('hidden');
            }

            let newForm = new Form();
            newForm.clearFormElements(['name', 'email', 'age', 'userPhoneNumber', 'bankCardNumber', 'gender']);
            newForm.toogleAddBlock();
            newForm.clearErrorAllFormFields();

            document.getElementById('saveBtn').onclick = () => {
                newForm.clearErrorAllFormFields();
                newForm.formValidation();

                if (newForm.isValidName(newForm.nameField.value) &&
                    newForm.isValidEmail(newForm.emailField.value) &&
                    newForm.isValidAge(newForm.ageField.value) &&
                    newForm.isValidPhoneNumber(newForm.phoneNumberField.value) &&
                    newForm.isValidBankCardNumber(newForm.bankCardNumberField.value) &&
                    newForm.genderField.value) {
                    let newUser = new User(newForm.nameField.value,
                        newForm.ageField.value,
                        newForm.emailField.value,
                        newForm.phoneNumberField.value,
                        newForm.bankCardNumberField.value,
                        newForm.genderField.value);

                    users.push(newUser);
                    newForm.toogleAddBlock();
                    let serialUsers = JSON.stringify(users);
                    localStorage.setItem('users', serialUsers);

                    newForm.addNewDataToTable();
                    newForm.clearFormElements(['name', 'email', 'age', 'userPhoneNumber', 'bankCardNumber', 'gender']);
                }
            };


        }

        /*******************************************************************/
    };
}


