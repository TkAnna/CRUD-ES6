'use strict';

class Form {
    constructor() {
        this.form = document.forms.addForm;
        this.formElements = document.forms.addForm.elements;
        this.nameField = this.formElements.name;
        this.emailField = this.formElements.email;
        this.ageField = this.formElements.age;
        this.phoneNumberField = this.formElements.userPhoneNumber;
        this.bankCardNumberField = this.formElements.bankCardNumber;
        this.genderField = this.formElements.gender;
    }

    toogleAddBlock() {
        document.getElementById('addBlock').classList.toggle('hidden');
    }

    clearErrorAllFormFields() {
        Form.clearErrorMessage([this.nameField.parentNode,
            this.emailField.parentNode,
            this.ageField.parentNode,
            this.phoneNumberField.parentNode,
            this.bankCardNumberField.parentNode,
            document.getElementById('userGender')]);
    }

    static clearErrorMessage(parent) {
        for (let i = 0; i < parent.length; i++) {
            parent[i].classList.remove('error');
            if (parent[i].lastChild.className === 'error-msg') {
                parent[i].lastChild.remove();
            }
        }
    }

    isValidName(name) {
        let namePattern = /^[A-ZА-ЯЁ][a-zа-яё]+$/;
        return namePattern.test(name);
    }

    isValidEmail(email) {
        let emailPattern = /((\w+\.)*\w+)@((\w+\.)+\w+)/;
        return emailPattern.test(email);
    }

    isValidAge(age) {
        let agePattern = /^([1][8-9]|[2-9][0-9]|[1][0-2][0])$/;
        return agePattern.test(age);
    }

    isValidPhoneNumber(phoneNumber) {
        let phoneNumberPattern = /^\+(380)\d{9}$/;
        return phoneNumberPattern.test(phoneNumber);
    }

    isValidBankCardNumber(bankCardNumber) {
        let bankCardNumberPattern = /^(\d{4} ){3}\d{4}$/;
        return bankCardNumberPattern.test(bankCardNumber);
    }

    showError(parent, message) {
        parent.classList.add('error');
        let msgElement = new Element('div', parent);
        msgElement.addClass('error-msg');
        msgElement.addContent(message);
    }

    addNewDataToTable() {
        let newTable = new Table();
        newTable.generateTable();
    }

    clearFormElements(formElements) {

        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i] === 'gender') {
                for (let j = 0; j < this.form.gender.length; j++) {
                    this.form.gender[j].checked = false;
                }
            } else {
                this.form.elements[formElements[i]].value = '';
            }
        }
    }

    formValidation() {
        let parentGender = document.getElementById('userGender');

        if (!this.nameField.value) {
            this.showError(this.nameField.parentNode, 'Enter your name');
        } else if (!this.isValidName(this.nameField.value)) {
            this.showError(this.nameField.parentNode, 'Enter correct name');
        }

        if (!this.emailField.value) {
            this.showError(this.emailField.parentNode, 'Enter your email');
        } else if (!this.isValidEmail(this.emailField.value)) {
            this.showError(this.emailField.parentNode, 'Email address is incorrect');
        }

        if (!this.ageField.value) {
            this.showError(this.ageField.parentNode, 'Enter your age');
        }

        if (!this.phoneNumberField.value) {
            this.showError(this.phoneNumberField.parentNode, 'Enter your phone number');
        } else if (!this.isValidPhoneNumber(this.phoneNumberField.value)) {
            this.showError(this.phoneNumberField.parentNode, 'Enter correct phone number +380xxxxxxxxx');
        }

        if (!this.bankCardNumberField.value) {
            this.showError(this.bankCardNumberField.parentNode, 'Enter your credit card number');
        } else if (!this.isValidBankCardNumber(this.bankCardNumberField.value)) {
            this.showError(this.bankCardNumberField.parentNode, 'Enter correct credit card number xxxx xxxx xxxx xxxx');
        }

        if (!this.genderField.value) {
            this.showError(parentGender, 'Indicate your gender');
        }
    }


}
