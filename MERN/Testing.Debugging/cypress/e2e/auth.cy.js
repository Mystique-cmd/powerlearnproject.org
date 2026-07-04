// cypress/e2e/auth.cy.js
describe('Auth flow', () => {
    it('registers and logs in a user', () => {
        cy.visit('/');
        cy.contains('Sign up').click();

        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('StrongPass123');
        cy.get('button[type=submit]').click();

        cy.contains(/welcome/i).should('be.visible');

        cy.contains('Log out').click();
        cy.contains('Log in').click();

        cy.get('input[name=email]').type('test@example.com');
        cy.get('input[name=password]').type('StrongPass123');
        cy.get('button[type=submit]').click();

        cy.contains('Dashboard').should('be.visible');
    });
});
