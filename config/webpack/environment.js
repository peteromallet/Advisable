const path = require("path");
const { webpackConfig, merge } = require("shakapacker");
const webpack = require("webpack");
const dotenv = require("dotenv");
const version = require("./buildVersion");

dotenv.config({ silent: true });

process.env.RELEASED_AT = new Date().toISOString();
process.env.BUILD_TIME = version;

const customConfig = {
  plugins: [
    new webpack.EnvironmentPlugin({
      RELEASED_AT: null,
      BUILD_TIME: null,
      INTERCOM_APP_ID: null,
      SENTRY_FRONTEND_DSN: null,
      SENTRY_ENVIRONMENT: null,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.(mp3)$/,
        exclude: /node_modules/,
        loader: "file-loader",
      },
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        include: /node_modules/,
      },
    ],
  },
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
};

// webpackConfig.splitChunks();

module.exports = merge({}, webpackConfig, customConfig);
