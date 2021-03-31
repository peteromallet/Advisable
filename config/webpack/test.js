process.env.NODE_ENV = process.env.NODE_ENV || "development";

const environment = require("./environment");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// webpacker includes CaseSensitivePaths plugin and its slow.
environment.plugins.delete("CaseSensitivePaths");

console.log("Compiling webpack with test config");
module.exports = smp.wrap(environment.toWebpackConfig());
