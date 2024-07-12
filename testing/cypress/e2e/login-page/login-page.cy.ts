/// <reference types="cypress" />

/// <reference types="cypress" />

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('should display the login form', () => {
        cy.get('form[aria-label="form"]').should('be.visible');
        cy.get('input[id="email"]').should('be.visible');
        cy.get('input[id="password"]').should('be.visible');
        cy.get('input[id="loginPageTrustDevice"]').should('be.visible');
        cy.get('button[type="submit"]')
            .should('be.visible')
            .and('have.text', 'Login');
    });

    it('should allow the user to fill out the email and password fields', () => {
        cy.get('input[id="email"]')
            .type('test@example.com')
            .should('have.value', 'test@example.com');
        cy.get('input[id="password"]')
            .type('password123')
            .should('have.value', 'password123');
    });

    it('should allow the user to check the "Trust this device" checkbox', () => {
        cy.get('input[id="loginPageTrustDevice"]').check().should('be.checked');
        cy.get('input[id="loginPageTrustDevice"]')
            .uncheck()
            .should('not.be.checked');
    });

    it('should enable the login button when the form is valid', () => {
        cy.get('input[id="email"]').type('test@example.com');
        cy.get('input[id="password"]').type('password123');
        cy.get('input[id="loginPageTrustDevice"]').check();
        cy.get('button[type="submit"]').should('not.be.disabled');
    });

    it('should display an error message when login fails', () => {
        cy.get('input[id="email"]').type('wrong@example.com');
        cy.get('input[id="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();
        cy.get('p[role="alert"]')
            .should('be.visible')
            .and('contain.text', 'No account found for the entered email.');
    });
});
