const esbuild = require("esbuild");
const dotenv = require("dotenv");
const graphqlLoaderPlugin = require("@luckycatfactory/esbuild-graphql-loader");
const version = new Date().getTime();

dotenv.config({ silent: true });

const IS_DEV = process.argv.includes("--dev");

process.env.BUILD_TIME = version;

if (IS_DEV) {
  console.debug("⚡ esbuild is running in watch mode");
}

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
    minify: IS_DEV ? false : true,
    watch: IS_DEV ? true : false,
    splitting: true,
    sourcemap: true,
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
      "process.env.BUILD_TIME": process.env.BUILD_TIME,
      "process.env.TALKJS": process.env.TALKJS,
      "process.env.INTERCOM_APP_ID": process.env.INTERCOM_APP_ID,
      "process.env.NODE_ENV": process.env.NODE_ENV,
    },
  })
  .catch(() => {
    process.exit(1);
  });
