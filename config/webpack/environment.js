const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { webpackConfig, merge } = require("shakapacker");
const webpack = require("webpack");
const dotenv = require("dotenv");
const version = require("./buildVersion");

dotenv.config({ silent: true });

process.env.RELEASED_AT = new Date().toISOString();
process.env.BUILD_TIME = version;

const plugins = [
  new webpack.EnvironmentPlugin({
    RELEASED_AT: null,
    BUILD_TIME: null,
    INTERCOM_APP_ID: null,
    SENTRY_FRONTEND_DSN: null,
    SENTRY_ENVIRONMENT: null,
    NODE_DEBUG: null,
  }),
];

if (process.env.ANALYZE_BUNDLE_SIZE === "true") {
  plugins.push(new BundleAnalyzerPlugin());
}

const customConfig = {
  output: {
    filename: "js/[name]-[contenthash].js",
    chunkFilename: "js/[name]-[contenthash].chunk.js",
  },
  plugins,
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
      "@guild": path.resolve(__dirname, "..", "..", "app/javascript/guild"),
    },
  },
  optimization: {
    usedExports: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxSize: 1260000,
    },
  },
};

module.exports = merge({}, webpackConfig, customConfig);
