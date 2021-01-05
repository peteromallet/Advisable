describe("Guild messaging", () => {
  before(() => {
    cy.app("clean");
    cy.appScenario("guild_chat");
  });

  it("viewer can send and receive messages", function () {
    cy.visit(`/guild/messages`);
    cy.get("input[name=email]").type("dwight@advisable.com");
    cy.get("input[type=password]").type("testing123");
    cy.get("[data-testid=loginButton]").click();
    cy.get("textarea[name=message]").type("Message from dwight");
    cy.get("[data-testid=sendMessage]").click();

    cy.task("sendMessage", {
      email: "jim@advisable.com",
      message: "Message from jim",
    });

    cy.contains("[data-message]", "Message from dwight");
    cy.contains("[data-message]", "Message from jim");
  });
});
