// cypress/e2e/error.cy.js
describe('Error handling', () => {
    it('shows error when API fails', () => {
        cy.intercept('POST', '/api/users', { statusCode: 500 }).as('createUser');
        cy.visit('/register');
        cy.get('form').submit();
        cy.contains('Something went wrong').should('be.visible');
    });
});
