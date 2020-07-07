process.env.NODE_ENV = process.env.NODE_ENV || "development";

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
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

if (process.env.REACT_REFRESH === "true") {
  environment.plugins.append(
    "Refresh",
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: 3035,
      },
    }),
  );

  environment.loaders.append("fastrefresh", {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          // ... other options
          // DO NOT apply the Babel plugin in production mode!
          plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
        },
      },
    ],
  });
}

module.exports = environment.toWebpackConfig();
// module.exports = smp.wrap(environment.toWebpackConfig());
