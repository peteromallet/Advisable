process.env.NODE_ENV = process.env.NODE_ENV || "production";

const { merge } = require("shakapacker");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const environment = require("./environment");

const plugins = [];

const hasSentry =
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN;
if (hasSentry) {
  plugins.push(
    new SentryWebpackPlugin({
      include: ".",
      ignoreFile: ".sentrycliignore",
      ignore: ["node_modules", "webpack.config.js"],
      configFile: "sentry.properties",
    }),
  );
}

const customConfig = {
  mode: "production",
  plugins,
};

module.exports = merge({}, environment, customConfig);
