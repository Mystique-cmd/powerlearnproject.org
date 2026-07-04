import 'cypress-image-snapshot/command';

Cypress.Commands.add('matchImageSnapshot', { threshold: 0.01 });
