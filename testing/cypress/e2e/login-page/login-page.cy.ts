/// <reference types="cypress" />

describe('Login Page', () => {
    beforeEach(() => {
        cy.login();
        cy.fixture('login.json').as('loginData');
        cy.fixture('selector.json').as('selectorData');
    });

    it('should display the login form', function () {
        cy.shouldBeVisible(this.selectorData.formSelector);
        cy.shouldBeVisible(this.selectorData.emailInputSelector);
        cy.shouldBeVisible(this.selectorData.passwordInputSelector);
        cy.shouldBeVisible(this.selectorData.trustDeviceCheckboxSelector);
        cy.shouldBeVisible(this.selectorData.loginButtonSelector).and(
            'have.text',
            'Login',
        );
    });

    it('should allow the user to fill out the email and password fields', function () {
        cy.get(this.selectorData.emailInputSelector)
            .type(this.loginData.username)
            .should('have.value', this.loginData.username);
        cy.get(this.selectorData.passwordInputSelector)
            .type(this.loginData.password)
            .should('have.value', this.loginData.password);
    });

    it('should allow the user to check the "Trust this device" checkbox', function () {
        cy.get(this.selectorData.trustDeviceCheckboxSelector)
            .check()
            .should('be.checked');
        cy.get(this.selectorData.trustDeviceCheckboxSelector)
            .uncheck()
            .should('not.be.checked');
    });

    it('should enable the login button when the form is valid', function () {
        cy.get(this.selectorData.emailInputSelector).type(
            this.loginData.username,
        );
        cy.get(this.selectorData.passwordInputSelector).type(
            this.loginData.password,
        );
        cy.get(this.selectorData.trustDeviceCheckboxSelector).check();
        cy.get(this.selectorData.loginButtonSelector).should('not.be.disabled');
    });

    it('should display an error message when login fails', function () {
        cy.get(this.selectorData.emailInputSelector).type(
            this.loginData.username,
        );
        cy.get(this.selectorData.passwordInputSelector).type(
            this.loginData.password,
        );
        cy.get(this.selectorData.loginButtonSelector).click();
        cy.shouldBeVisible(this.selectorData.errorMessageSelector).and(
            'contain.text',
            'No account found for the entered email.',
        );
    });
});
