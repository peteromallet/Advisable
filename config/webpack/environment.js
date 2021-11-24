const path = require("path");
const { environment } = require("@rails/webpacker");
const webpack = require("webpack");
const dotenv = require("dotenv");
const version = require("./buildVersion");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

dotenv.config({ silent: true });

process.env.RELEASED_AT = new Date().toISOString();
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

environment.loaders.append("mp3", {
  test: /\.(mp3)$/,
  exclude: /node_modules/,
  loader: "file-loader",
});

environment.config.merge({
  resolve: {
    alias: {
      "@advisable/donut": path.join(__dirname, "../../donut/src"),
      components: path.join(__dirname, "../../app/javascript/src/components"),
      /* Guild */
      "@advisable-main": path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/src",
      ),
      "@guild": path.resolve(__dirname, "..", "..", "app/javascript/guild"),
    },
  },
});

environment.splitChunks();

// https://github.com/framer/motion/issues/1307
environment.config.merge({
  module: {
    rules: [
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        include: /node_modules/,
      },
    ],
  },
});

module.exports = environment;
