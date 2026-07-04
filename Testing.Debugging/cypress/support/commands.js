// cypress/support/commands.js

// Example: custom login command
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
    cy.contains('Dashboard').should('be.visible');
});

// Example: reset database via API (optional)
Cypress.Commands.add('resetDb', () => {
    cy.request('POST', '/api/test/reset'); // assumes you expose a reset route in test env
});

// Example: create a user via API
Cypress.Commands.add('createUser', (user) => {
    cy.request('POST', '/api/users', user);
});
