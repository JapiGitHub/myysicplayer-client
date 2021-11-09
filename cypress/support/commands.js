// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//OMAT LISÄYKSET :
Cypress.Commands.add("login", () => {
  cy.get("#sticky-nav").should("not.to.exist");
  cy.get("#username-input").type(Cypress.env().testuser);
  cy.get("#password-input").type(Cypress.env().testpass);
  cy.get("#sign-button").click();
  cy.get("#sticky-nav").should("be.visible");
});
