process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { merge } = require("shakapacker");
const environment = require("./environment");
const WebpackBar = require("webpackbar");

const plugins = [new WebpackBar()];

const customConfig = {
  stats: "none",
  plugins,
};

module.exports = merge({}, environment, customConfig);
