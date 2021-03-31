process.env.NODE_ENV = process.env.NODE_ENV || "development";

const environment = require("./environment");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

console.log("Compiling webpack with test config");
module.exports = smp.wrap(environment.toWebpackConfig());
