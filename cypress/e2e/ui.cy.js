describe("Simple UI Tests", () => {

    beforeEach(() => {
      cy.visit("/");
    });
  
    it("changes heading text", () => {
      cy.get("#change-text").click();
      cy.get("#main-title").should("have.text", "Heading Updated!");
    });
  
    it("changes heading color", () => {
      cy.get("#change-color").click();
      cy.get("#main-title").should("have.css", "color", "rgb(0, 0, 255)");
    });
  
    it("shows message on click", () => {
      cy.get("#show-message").click();
      cy.get("#message-box").should("contain", "Button clicked!");
    });
  
  });
  