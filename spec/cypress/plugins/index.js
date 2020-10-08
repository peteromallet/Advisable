const puppeteer = require("puppeteer");
const { getDocument, queries, waitFor } = require("pptr-testing-library");
const participants = {};
const { getByRole, getByLabelText } = queries;

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const participantFunctions = {
    addParticipant: async ({ email, url, color }) => {
      const args = [
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream",
      ];

      if (color) {
        args.push(
          `--use-file-for-fake-video-capture=cypress/fixtures/${color}.y4m`,
        );
      }

      const browser = await puppeteer.launch({
        headless: true,
        args,
      });

      const page = await browser.newPage();
      await page.goto(config.baseUrl + url);
      const $document = await getDocument(page);
      await (await getByLabelText($document, "Email Address")).type(
        "dwight@test.com",
      );
      await (await getByLabelText($document, "Password")).type("testing123");
      await (await getByRole($document, "button", { name: /login/i })).click();
      await waitFor(() => getByRole($document, "button", { name: /join/i }));
      await (await getByRole($document, "button", { name: /join/i })).click();
      participants[email] = page;
      return Promise.resolve(null);
    },
    removeParticipant: async (email) => {
      const page = participants[email];
      await page.click("body");
      await page.click('[aria-label="Leave"]');
      await page.close();
      delete participants[email];
      return Promise.resolve(null);
    },
    removeAllParticipants: () => {
      return Promise.all(
        Object.keys(participants).map((email) =>
          participantFunctions.removeParticipant(email),
        ),
      ).then(() => null);
    },
    participantCloseBrowser: async (email) => {
      const page = participants[email];
      await page.close({ runBeforeUnload: true });
      delete participants[email];
      return Promise.resolve(null);
    },
  };
  on("task", participantFunctions);
};
