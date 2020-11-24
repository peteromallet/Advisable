import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

var requireTest = require.context("./attributes", true, /(?!index)\.js$/);
requireTest.keys().forEach(requireTest);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);
  ReactDOM.render(<App />, root);
});
