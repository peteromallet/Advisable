import "@testing-library/cypress/add-commands";
import detectSound from "./detectSound";

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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getParticipant", (name) =>
  cy.get(`[data-cy-participant="${name}"]`),
);

Cypress.Commands.add(
  "shouldBeColor",
  { prevSubject: "element" },
  (subject, color) => {
    cy.wrap(subject)
      .find("video")
      .then(($video) => {
        cy.readFile(`cypress/fixtures/${color}.png`, "base64").should(
          "be.sameVideoFile",
          $video,
        );
      });
  },
);

Cypress.Commands.add("leaveRoom", () => {
  cy.wait(500);
  cy.get("body").click(); // Makes controls reappear
  cy.get('[aria-label="Leave"]').click();
  cy.task("removeAllParticipants");
});

function getParticipantAudioTrackName(name, window) {
  const participant = Array.from(window.twilioRoom.participants.values()).find(
    (participant) => participant.identity === name,
  );
  const audioTrack = Array.from(participant.audioTracks.values())[0].track;
  return audioTrack.name;
}

Cypress.Commands.add(
  "shouldBeMakingSound",
  { prevSubject: "element" },
  (subject) => {
    const resolveValue = ($el) =>
      detectSound($el[0]).then((value) => {
        return cy.verifyUpcomingAssertions(
          value,
          {},
          {
            onRetry: () => resolveValue($el),
          },
        );
      });

    cy.window()
      .then((win) => {
        const participantIdentity = subject.attr("data-cy-participant");
        const trackName = getParticipantAudioTrackName(
          participantIdentity,
          win,
        );
        return win.document.querySelector(
          `[data-cy-audio-track-name="${trackName}"]`,
        );
      })
      .then(resolveValue)
      .should("equal", true);
  },
);
