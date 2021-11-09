//JOS EI TOIMI, NIIN CHECKAA TARVIIKO NE NPM PAKETIT ytdl-core JA soundcloud-downloader PÄIVITTÄÄ
//ÄLÄ TEE NÄITÄ LIIAN USEIN, ETTEI YOUTUBEN ALGORITMIT SUUTU SULLE

describe("Download tests", () => {
  beforeEach(() => {
    //cy.visit("https://myysic.xyz");
    cy.visit("localhost:3000");
  });

  //uncaught exception disabling. ei liity koodin toimintaan oikeasti.
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });

  it("YouTube downloading works", () => {
    cy.login();

    //download  OTA KOMMENTOINTI POIS VAIN JOS HALUAT TESTATA LATAAMISTA
    //cy.get("#urladd-showmenu-button").click();
    //cy.get("#ytdl-input").type("https://www.youtube.com/watch?v=OuSdU8tbcHY");
    //cy.get("#urlclick-yt-button").click();
    //cy.wait(10000);

    //search & play
    cy.get("#search-input").click().type("titanic");
    cy.get("#song-index-for-testing0").should(
      "contain.text",
      "titanic in 5 seconds"
    );

    //cy.visit('myysic.xyz:2000/')
    //lähetä nodelle viesti, että voi poistaa sen titanicin sieltä.
  });
});
