const path = require("path");
const { environment } = require("@rails/webpacker");
const webpack = require("webpack");
const dotenv = require("dotenv");
const version = require("./buildVersion");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

dotenv.config({ silent: true });

process.env.BUILD_TIME = version;

if (process.env.ANALYSE_BUNDLE === "true") {
  environment.plugins.append("BundleAnalyzer", new BundleAnalyzerPlugin());
}

environment.plugins.prepend(
  "Environment",
  new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))),
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
module.exports = environment;
