/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';
import './commands';

declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable<void>;
            register(): Chainable<void>;
            shouldBeVisible(selector: string): Chainable<Element>;
        }
    }
}

Cypress.Commands.add('login', () => {
    cy.visit('/login');
});

Cypress.Commands.add('register', () => {
    cy.visit('/register');
});

Cypress.Commands.add('shouldBeVisible', (selector: string) => {
    cy.get(selector).should('be.visible');
});
