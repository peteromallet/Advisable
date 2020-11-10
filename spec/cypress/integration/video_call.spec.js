const nano = require("nanoid"); // eslint-disable-line no-undef
const uid = nano.customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  15,
);

context("A video call", () => {
  const CALL_ID = `vid_${uid()}`;
  const MICHAEL_ID = `use_${uid()}`;
  const DWIGHT_ID = `spe_${uid()}`;
  const JIM_ID = `spe_${uid()}`;

  before(() => {
    cy.app("clean");

    cy.appFactories([
      [
        "create",
        "account",
        {
          email: "videocall@test.com",
          first_name: "Michael",
          last_name: "Scott",
          password: "testing123",
        },
      ],
    ]).then((accounts) => {
      cy.appFactories([
        ["create", "user", { uid: MICHAEL_ID, account_id: accounts[0].id }],
      ]);
    });

    cy.appFactories([
      [
        "create",
        "account",
        {
          email: "dwight@test.com",
          first_name: "Dwight",
          last_name: "Schrute",
          password: "testing123",
        },
      ],
    ]).then((accounts) => {
      cy.appFactories([
        [
          "create",
          "specialist",
          { uid: DWIGHT_ID, account_id: accounts[0].id },
        ],
      ]);
    });

    cy.appFactories([
      [
        "create",
        "account",
        {
          email: "jim@test.com",
          first_name: "Jim",
          last_name: "Halpert",
          password: "testing123",
        },
      ],
    ]).then((accounts) => {
      cy.appFactories([
        ["create", "specialist", { uid: JIM_ID, account_id: accounts[0].id }],
      ]);
    });

    cy.appFactories([["create", "video_call", { uid: CALL_ID }]]);
  });

  describe("when entering a call before the other participant joins", () => {
    beforeEach(() => {
      cy.visit(`/calls/${CALL_ID}`);
      cy.get("input[name=email]").type("videocall@test.com");
      cy.get("input[type=password]").type("testing123");
      cy.get("[data-testid=loginButton]").click();
      cy.get("[data-testid=joinCall]").click();

      cy.task("addParticipant", {
        url: `/calls/${CALL_ID}`,
        email: "dwight@test.com",
        color: "blue",
      });
    });

    afterEach(() => {
      cy.leaveRoom();
    });

    it("they can see and hear the oter participant", function () {
      cy.getParticipant(DWIGHT_ID).shouldBeColor("blue");
      cy.getParticipant(DWIGHT_ID).shouldBeMakingSound();
    });

    it("should remove the participant when they leave", () => {
      cy.task("participantCloseBrowser", "dwight@test.com");
      cy.getParticipant(DWIGHT_ID).should("not.exist");
    });
  });

  describe("when entering a call after the other participant joins", () => {
    beforeEach(() => {
      cy.task("addParticipant", {
        url: `/calls/${CALL_ID}`,
        email: "dwight@test.com",
        color: "blue",
      });

      cy.visit(`/calls/${CALL_ID}`);
      cy.get("input[name=email]").type("videocall@test.com");
      cy.get("input[type=password]").type("testing123");
      cy.get("[data-testid=loginButton]").click();
      cy.get("[data-testid=joinCall]").click();
    });

    afterEach(() => {
      cy.leaveRoom();
    });

    it("they can see and hear the oter participant", function () {
      cy.getParticipant(DWIGHT_ID).shouldBeColor("blue");
      cy.getParticipant(DWIGHT_ID).shouldBeMakingSound();
    });
  });

  describe("With more than 2 participants", () => {
    beforeEach(() => {
      cy.task("addParticipant", {
        url: `/calls/${CALL_ID}`,
        email: "dwight@test.com",
        color: "blue",
      });

      cy.visit(`/calls/${CALL_ID}`);
      cy.get("input[name=email]").type("videocall@test.com");
      cy.get("input[type=password]").type("testing123");
      cy.get("[data-testid=loginButton]").click();
      cy.get("[data-testid=joinCall]").click();

      cy.task("addParticipant", {
        url: `/calls/${CALL_ID}`,
        email: "jim@test.com",
        color: "red",
      });
    });

    afterEach(() => {
      cy.leaveRoom();
    });

    it("they can see and hear the oter participants", function () {
      cy.getParticipant(DWIGHT_ID).shouldBeColor("blue");
      cy.getParticipant(JIM_ID).shouldBeColor("red");
      cy.getParticipant(DWIGHT_ID).shouldBeMakingSound();
      cy.getParticipant(JIM_ID).shouldBeMakingSound();
    });
  });
});
