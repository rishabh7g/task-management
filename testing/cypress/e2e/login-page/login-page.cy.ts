/// <reference types="cypress" />

describe('Login Page', () => {
    beforeEach(() => {
        cy.fixture('login').then((data) => (this.loginData = data));
        cy.fixture('selectors').then((data) => (this.selectorsData = data));
        cy.login();
    });

    it('should display the login form', () => {
        cy.shouldBeVisible(this.selectorsData.formSelector);
        cy.shouldBeVisible(this.selectorsData.emailInputSelector);
        cy.shouldBeVisible(this.selectorsData.passwordInputSelector);
        cy.shouldBeVisible(this.selectorsData.trustDeviceCheckboxSelector);
        cy.shouldBeVisible(this.selectorsData.loginButtonSelector).and(
            'have.text',
            'Login',
        );
    });

    it('should allow the user to fill out the email and password fields', () => {
        cy.get(this.selectorsData.emailInputSelector)
            .type(this.loginData.username)
            .should('have.value', this.loginData.username);
        cy.get(this.selectorsData.passwordInputSelector)
            .type(this.loginData.password)
            .should('have.value', this.loginData.password);
    });

    it('should allow the user to check the "Trust this device" checkbox', () => {
        cy.get(this.selectorsData.trustDeviceCheckboxSelector)
            .check()
            .should('be.checked');
        cy.get(this.selectorsData.trustDeviceCheckboxSelector)
            .uncheck()
            .should('not.be.checked');
    });

    it('should enable the login button when the form is valid', () => {
        cy.get(this.selectorsData.emailInputSelector).type(
            this.loginData.username,
        );
        cy.get(this.selectorsData.passwordInputSelector).type(
            this.loginData.password,
        );
        cy.get(this.selectorsData.trustDeviceCheckboxSelector).check();
        cy.get(this.selectorsData.loginButtonSelector).should(
            'not.be.disabled',
        );
    });

    it('should display an error message when login fails', () => {
        cy.get(this.selectorsData.emailInputSelector).type(
            this.loginData.username,
        );
        cy.get(this.selectorsData.passwordInputSelector).type(
            this.loginData.password,
        );
        cy.get(this.selectorsData.loginButtonSelector).click();
        cy.shouldBeVisible(this.selectorsData.errorMessageSelector).and(
            'contain.text',
            'No account found for the entered email.',
        );
    });
});
