const path = require("path");

module.exports = {
  addons: ["@storybook/addon-knobs/register"],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias["@advisable/donut"] = path.resolve(
      __dirname,
      "../src",
    );

    // Return the altered config
    return config;
  },
};
