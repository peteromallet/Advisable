const path = require("path");

module.exports = ({ config, mode }) => {
  config.resolve.alias = {
    src: path.resolve(__dirname, "../app/javascript/src"),
  };

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: "ts-loader",
      },
    ],
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
