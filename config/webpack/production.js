const SentryWebpackPlugin = require("@sentry/webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const environment = require("./environment");

if (
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN
) {
  environment.plugins.prepend(
    "Sentry",
    new SentryWebpackPlugin({
      include: ".",
      ignoreFile: ".sentrycliignore",
      ignore: ["node_modules", "webpack.config.js"],
      configFile: "sentry.properties",
    }),
  );
}

module.exports = environment.toWebpackConfig();
