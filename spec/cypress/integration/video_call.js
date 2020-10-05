const { after } = require("lodash-es");

context("A video call", () => {
  beforeEach(() => {
    cy.app("clean");
    cy.appScenario("video_call");
  });

  describe("when entering a room before the other participant joins", () => {
    before(() => {
      cy.visit(`/calls/vid_abcdefghijklmno`);
      cy.findByLabelText("Email Address").type("videocall@test.com");
      cy.findByLabelText("Password").type("testing123");
      cy.findByRole("button", { name: /login/i }).click();
      cy.findByRole("button", { name: /join/i }).click();
    });

    it("they can see the oter participant", function () {
      cy.task("addParticipant", {
        url: "/calls/vid_abcdefghijklmno",
        email: "dwight@test.com",
        color: "red",
      });
    });
  });
});
