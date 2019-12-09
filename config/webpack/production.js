const version = require("./buildVersion");
const RollbarSourceMapPlugin = require("rollbar-sourcemap-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const environment = require("./environment");

if (process.env.ROLLBAR_TOKEN) {
  environment.plugins.prepend(
    "Rollbar sourcemaps",
    new RollbarSourceMapPlugin({
      accessToken: process.env.ROLLBAR_TOKEN,
      version: version,
      publicPath: `${process.env.ORIGIN}/packs`,
    })
  );
}

module.exports = environment.toWebpackConfig();
