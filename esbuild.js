const esbuild = require("esbuild");
const graphqlLoaderPlugin = require("@luckycatfactory/esbuild-graphql-loader");

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
      "process.env.SENTRY_FRONTEND_DSN": null,
      "process.env.SENTRY_ENVIRONMENT": null,
      "process.env.RELEASED_AT": null,
      "process.env.BUILD_TIME": null,
      "process.env.TALKJS": null,
      "process.env.INTERCOM_APP_ID": null,
      "process.env.NODE_ENV": null,
    },
  })
  .catch(() => {
    process.exit(1);
  });
