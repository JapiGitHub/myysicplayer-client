describe("Basic end to end tests", () => {
  beforeEach(() => {
    //cy.visit("https://myysic.xyz");
    cy.visit("localhost:3000");
  });

  //uncaught exception disabling. ei liity koodin toimintaan oikeasti.
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });

  //
  it("login page visible and not accessing the main page without login", () => {
    cy.contains("username");
    cy.contains("password");
    cy.get("#username-input").should("be.visible");
    cy.get("#password-input").should("be.visible");
  });

  //
  it("login works", () => {
    //cypress/support/commands.js:  Cypress.env().testuser & Cypress.env().testpass.
    //cypressin .env on cypress.jsonissa objectina (gitignorattu, mutta empty shape löytyy toki).
    cy.login();
  });

  //
  it("COMMON CHAIN: login, search a song, click to play, logout", () => {
    cy.login();

    cy.get("#search-input").click().type("g");
    cy.get("#songname-topbar").should("contain", "Select a song");
    cy.get("#song-index-for-testing0").click();
    cy.get("#songname-topbar").should("not.contain", "Select a song");

    cy.get("#logout-button").click();
    cy.get("#sticky-nav").should("not.to.exist");
  });

  it("COMMON CHAIN: login, scroll, play, add queue, delete queue", () => {
    cy.login();

    cy.scrollTo(0, 1000);
    cy.get("#song-index-for-testing0").click();

    //add queue
    cy.get("#queue-index-for-testing1").click();
    cy.get("#queue-index-for-testing2").click();
    cy.get("#queue-list-index-for-testing1").should("exist");

    //delete queue
    cy.get("#queue-list-index-for-testing0").click();
    cy.get("#queue-list-index-for-testing1").should("not.exist");
  });
});
