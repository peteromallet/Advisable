const esbuild = require("esbuild");
const dotenv = require("dotenv");
const version = require("./config/webpack/buildVersion");
const graphqlLoaderPlugin =
  require("@luckycatfactory/esbuild-graphql-loader").default;

dotenv.config({ silent: true });

process.env.BUILD_TIME = version;

esbuild
  .build({
    watch: {
      onRebuild(error) {
        if (error) {
          console.error("watch build failed:", error);
        } else {
          console.log("⚡️ Updated");
        }
      },
    },
    entryPoints: ["app/javascript/application.js"],
    bundle: true,
    sourcemap: true,
    outdir: "app/assets/builds",
    loader: {
      ".js": "jsx",
      ".png": "dataurl",
      ".svg": "dataurl",
      ".mp3": "file",
    },
    define: {
      "process.env.SENTRY_FRONTEND_DSN": process.env.SENTRY_FRONTEND_DSN,
      "process.env.SENTRY_ENVIRONMENT": process.env.SENTRY_ENVIRONMENT,
      "process.env.RELEASED_AT": process.env.RELEASED_AT,
      "process.env.BUILD_TIME": process.env.BUILD_TIME,
      "process.env.TALKJS": process.env.TALKJS,
      "process.env.INTERCOM_APP_ID": process.env.INTERCOM_APP_ID,
      "process.env.NODE_ENV": process.env.NODE_ENV,
    },
    plugins: [graphqlLoaderPlugin({ filterRegex: /\.gql|.graphql$/ })],
  })
  .then(() => console.log("⚡️ build complete. Watching for updates..."))
  .catch(() => process.exit(1));
