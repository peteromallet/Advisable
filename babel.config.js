module.exports = function (api) {
  var isDevelopmentEnv = api.env("development");
  var isProductionEnv = api.env("production");
  var isTestEnv = api.env("test");
  const defaultConfigFunc = require("shakapacker/package/babel/preset.js");
  const resultConfig = defaultConfigFunc(api);

  const changesOnDefault = {
    presets: [
      [
        "@babel/preset-react",
        {
          development: isDevelopmentEnv || isTestEnv,
          useBuiltIns: true,
        },
      ],
    ].filter(Boolean),
    plugins: [
      "babel-plugin-styled-components",
      isProductionEnv && [
        "babel-plugin-transform-react-remove-prop-types",
        {
          removeImport: true,
        },
      ],
      // process.env.WEBPACK_SERVE && "react-refresh/babel",
    ].filter(Boolean),
  };

  resultConfig.presets = [...resultConfig.presets, ...changesOnDefault.presets];
  resultConfig.plugins = [...resultConfig.plugins, ...changesOnDefault.plugins];

  return resultConfig;
};
