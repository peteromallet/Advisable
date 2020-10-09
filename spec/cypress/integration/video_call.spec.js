context("A video call", () => {
  before(() => {
    cy.app("clean");
    cy.appScenario("video_call");
  });

  describe("when entering a call before the other participant joins", () => {
    beforeEach(() => {
      cy.visit(`/calls/vid_abcdefghijklmno`);
      cy.get("input[name=email]").type("videocall@test.com");
      cy.get("input[type=password]").type("testing123");
      cy.get("[data-testid=loginButton]").click();
      cy.get("[data-testid=joinCall]").click();

      cy.task("addParticipant", {
        url: "/calls/vid_abcdefghijklmno",
        email: "dwight@test.com",
        color: "blue",
      });
    });

    afterEach(() => {
      cy.leaveRoom();
    });

    it("they can see and hear the oter participant", function () {
      cy.getParticipant("Dwight").shouldBeColor("blue");
      cy.getParticipant("Dwight").shouldBeMakingSound();
    });

    it("should remove the participant when they leave", () => {
      cy.task("participantCloseBrowser", "dwight@test.com");
      cy.getParticipant("Dwight").should("not.exist");
    });
  });

  describe("when entering a call after the other participant joins", () => {
    beforeEach(() => {
      cy.task("addParticipant", {
        url: "/calls/vid_abcdefghijklmno",
        email: "dwight@test.com",
        color: "blue",
      });

      cy.visit(`/calls/vid_abcdefghijklmno`);
      cy.get("input[name=email]").type("videocall@test.com");
      cy.get("input[type=password]").type("testing123");
      cy.get("[data-testid=loginButton]").click();
      cy.get("[data-testid=joinCall]").click();
    });

    afterEach(() => {
      cy.leaveRoom();
    });

    it("they can see and hear the oter participant", function () {
      cy.getParticipant("Dwight").shouldBeColor("blue");
      cy.getParticipant("Dwight").shouldBeMakingSound();
    });
  });

  describe("With more than 2 participants", () => {
    beforeEach(() => {
      cy.task("addParticipant", {
        url: "/calls/vid_abcdefghijklmno",
        email: "dwight@test.com",
        color: "blue",
      });

      cy.visit(`/calls/vid_abcdefghijklmno`);
      cy.get("input[name=email]").type("videocall@test.com");
      cy.get("input[type=password]").type("testing123");
      cy.get("[data-testid=loginButton]").click();
      cy.get("[data-testid=joinCall]").click();

      cy.task("addParticipant", {
        url: "/calls/vid_abcdefghijklmno",
        email: "jim@test.com",
        color: "red",
      });
    });

    afterEach(() => {
      cy.leaveRoom();
    });

    it("they can see and hear the oter participants", function () {
      cy.getParticipant("Dwight").shouldBeColor("blue");
      cy.getParticipant("Jim").shouldBeColor("red");
      cy.getParticipant("Dwight").shouldBeMakingSound();
      cy.getParticipant("Jim").shouldBeMakingSound();
    });
  });
});
