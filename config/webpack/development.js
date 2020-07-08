process.env.NODE_ENV = process.env.NODE_ENV || "development";

const environment = require("./environment");
const WebpackBar = require("webpackbar");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

// webpacker includes CaseSensitivePaths plugin and its slow.
environment.plugins.delete("CaseSensitivePaths");

environment.config.set("devServer", {
  noInfo: true,
  stats: "minimal",
});

environment.plugins.append("webpackbar", new WebpackBar());

module.exports = environment.toWebpackConfig();
// module.exports = smp.wrap(environment.toWebpackConfig());
