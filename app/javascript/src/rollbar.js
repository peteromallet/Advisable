import rollbar from "rollbar";
import clientConfig from "./clientConfig";

export default rollbar.init({
  accessToken: clientConfig.ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  payload: {
    environment: clientConfig.ROLLBAR_ENV,
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.CODE_VERSION,
        // Optionally have Rollbar guess which frames the error was thrown from
        // when the browser does not provide line and column numbers.
        guess_uncaught_frames: true,
      },
    },
  },
});
