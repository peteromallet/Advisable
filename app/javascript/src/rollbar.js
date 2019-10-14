import rollbar from "rollbar";

export default rollbar.init({
  accessToken: ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  payload: {
    environment: ROLLBAR_ENV,
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: CODE_VERSION,
        // Optionally have Rollbar guess which frames the error was thrown from
        // when the browser does not provide line and column numbers.
        guess_uncaught_frames: true,
      },
    },
  },
});
