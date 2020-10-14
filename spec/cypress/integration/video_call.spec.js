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
      cy.getParticipant("spe_g7JQpZLA0heEGo3").shouldBeColor("blue");
      cy.getParticipant("spe_g7JQpZLA0heEGo3").shouldBeMakingSound();
    });

    it("should remove the participant when they leave", () => {
      cy.task("participantCloseBrowser", "dwight@test.com");
      cy.getParticipant("spe_g7JQpZLA0heEGo3").should("not.exist");
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
      cy.getParticipant("spe_g7JQpZLA0heEGo3").shouldBeColor("blue");
      cy.getParticipant("spe_g7JQpZLA0heEGo3").shouldBeMakingSound();
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
      cy.getParticipant("spe_g7JQpZLA0heEGo3").shouldBeColor("blue");
      cy.getParticipant("spe_4Fq89TaGiQ39Ehn").shouldBeColor("red");
      cy.getParticipant("spe_g7JQpZLA0heEGo3").shouldBeMakingSound();
      cy.getParticipant("spe_4Fq89TaGiQ39Ehn").shouldBeMakingSound();
    });
  });
});
