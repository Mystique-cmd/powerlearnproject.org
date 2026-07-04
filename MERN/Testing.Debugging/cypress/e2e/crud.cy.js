// cypress/e2e/crud.cy.js
describe('CRUD flow', () => {
    beforeEach(() => {
        cy.login('test@example.com', 'StrongPass123'); // custom command in support/commands.js
    });

    it('creates, reads, updates, deletes an item', () => {
        cy.visit('/items');
        cy.contains('Add Item').click();
        cy.get('input[name=name]').type('Test Item');
        cy.get('button[type=submit]').click();

        cy.contains('Test Item').should('be.visible');

        cy.contains('Edit').click();
        cy.get('input[name=name]').clear().type('Updated Item');
        cy.get('button[type=submit]').click();

        cy.contains('Updated Item').should('be.visible');

        cy.contains('Delete').click();
        cy.contains('Updated Item').should('not.exist');
    });
});
