process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { merge } = require("shakapacker");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const environment = require("./environment");
const WebpackBar = require("webpackbar");

const customConfig = {
  stats: "minimal",
  plugins: [new WebpackBar()],
};

// if (process.env.REACT_REFRESH === "true" && process.env.RAILS_ENV !== "test") {
//   environment.plugins.append(
//     "Refresh",
//     new ReactRefreshWebpackPlugin({
//       overlay: {
//         sockPort: 3035,
//       },
//     }),
//   );

//   environment.loaders.append("fastrefresh", {
//     test: /\.jsx?$/,
//     exclude: /node_modules/,
//     use: [
//       {
//         loader: require.resolve("babel-loader"),
//         options: {
//           // ... other options
//           // DO NOT apply the Babel plugin in production mode!
//           plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
//         },
//       },
//     ],
//   });
// }

module.exports = merge({}, environment, customConfig);
