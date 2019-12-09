const path = require("path");
const lodash = require("lodash");
const { environment } = require("@rails/webpacker");
const typescript = require("./loaders/typescript");
const webpack = require("webpack");
const dotenv = require("dotenv");
const version = require("./buildVersion");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

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

if (process.env.ANALYSE_BUNDLE === "true") {
  environment.plugins.append("BundleAnalyzer", new BundleAnalyzerPlugin());
}

// Prevent momentjs from importing all of its locales. This is used in the created-react-app config.
// https://github.com/facebook/create-react-app/blob/a0030fcf2df5387577ced165198f1f0264022fbd/packages/react-scripts/config/webpack.config.prod.js#L350-L355
environment.plugins.append(
  "Ignore moment locales",
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
);

environment.loaders.append("graphql", {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: "graphql-tag/loader",
});

environment.config.merge({
  resolve: {
    alias: {
      "@advisable/donut": path.join(__dirname, "../../donut/src"),
    },
  },
});

environment.splitChunks();

environment.loaders.append("typescript", typescript);
module.exports = environment;
