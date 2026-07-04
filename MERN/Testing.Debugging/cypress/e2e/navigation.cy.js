// cypress/e2e/navigation.cy.js
describe('Navigation', () => {
    it('redirects unauthenticated user to login', () => {
        cy.visit('/dashboard');
        cy.url().should('include', '/login');
    });
});
