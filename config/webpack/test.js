process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { merge } = require("shakapacker");
const environment = require("./environment");

const customConfig = {};

module.exports = merge({}, environment, customConfig);
