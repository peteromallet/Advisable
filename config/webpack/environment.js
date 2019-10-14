const path = require("path");
const lodash = require("lodash");
const { environment } = require("@rails/webpacker");
const typescript = require("./loaders/typescript");
const webpack = require("webpack");
const dotenv = require("dotenv");
const version = require("./buildVersion");

dotenv.config({ silent: true });

process.env.BUILD_TIME = version;

const environmentVariables = lodash.merge(
  JSON.parse(JSON.stringify(process.env)),
  {
    CODE_VERSION: version,
  }
);

environment.plugins.prepend(
  "Environment",
  new webpack.EnvironmentPlugin(environmentVariables)
);

environment.loaders.append("graphql", {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: "graphql-tag/loader",
});

environment.loaders.append("bundle", {
  test: /\.bundle\.js$/,
  exclude: /node_modules/,
  loader: "bundle-loader",
});

environment.config.merge({
  resolve: {
    alias: {
      "@advisable/donut": path.join(__dirname, "../../donut/src"),
    },
  },
});

environment.loaders.append("typescript", typescript);
module.exports = environment;
