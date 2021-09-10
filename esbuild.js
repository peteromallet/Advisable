const esbuild = require("esbuild");
const dotenv = require("dotenv");
const version = require("./config/webpack/buildVersion");
const graphqlLoaderPlugin = require("@luckycatfactory/esbuild-graphql-loader");

dotenv.config({ silent: true });

// process.env.RELEASED_AT = new Date().toISOString();
process.env.BUILD_TIME = version;

esbuild
  .build({
    entryPoints: [
      "./app/javascript/packs/frontend.js",
      "./app/javascript/packs/toby.js",
      "./app/javascript/packs/internal.js",
      "./app/javascript/packs/guild.js",
    ],
    outdir: "./app/assets/builds",
    bundle: true,
    minify: true,
    splitting: true,
    format: "esm",
    plugins: [
      graphqlLoaderPlugin.default({
        filterRegex: /\.graphql|gql$/,
      }),
    ],
    loader: {
      ".js": "jsx",
      ".png": "dataurl",
      ".jpg": "dataurl",
      ".svg": "dataurl",
      ".mp3": "dataurl",
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
  })
  .catch(() => {
    process.exit(1);
  });
