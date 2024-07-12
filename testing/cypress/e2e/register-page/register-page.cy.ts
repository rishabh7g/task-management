/// <reference types="cypress" />

context('Registeration Page', () => {
    beforeEach(() => {
        cy.register();
        cy.fixture('login.json').as('loginData');
        cy.fixture('selector.json').as('selectorData');
    });
    it('should display the registration form', function () {
        cy.shouldBeVisible(this.selectorData.formSelector);
        cy.shouldBeVisible(this.selectorData.emailInputSelector);
        cy.shouldBeVisible(this.selectorData.passwordInputSelector);
        cy.shouldBeVisible(this.selectorData.confirmPasswordInputSelector);
        cy.shouldBeVisible(this.selectorData.loginButtonSelector).and(
            'have.text',
            'Register',
        );
    });

    it('should allow the user to fill out the registration form', function () {
        cy.get(this.selectorData.emailInputSelector)
            .type(this.loginData.username)
            .should('have.value', this.loginData.username);
        cy.get(this.selectorData.passwordInputSelector)
            .type(this.loginData.password)
            .should('have.value', this.loginData.password);
        cy.get(this.selectorData.confirmPasswordInputSelector)
            .type(this.loginData.password)
            .should('have.value', this.loginData.password);
    });

    it('should enable the register button when the form is valid', function () {
        cy.get(this.selectorData.emailInputSelector).type(
            this.loginData.username,
        );
        cy.get(this.selectorData.passwordInputSelector).type(
            this.loginData.password,
        );
        cy.get(this.selectorData.confirmPasswordInputSelector).type(
            this.loginData.password,
        );
        cy.get(this.selectorData.loginButtonSelector).should('not.be.disabled');
    });

});
