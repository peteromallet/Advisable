import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);

  ReactDOM.render(
    <Root />,
    root
  );
});

module.hot.accept('./Root', () => {
  const NextRootContainer = require('./Root').default;
  ReactDOM.render(<NextRootContainer />, document.getElementById('AppRoot'));
})