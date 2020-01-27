import "intersection-observer"; // Intersection observer polyfill
import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import rollbar from "./rollbar";
import * as Sentry from "@sentry/browser";

window.Rollbar = rollbar;

// Polyfll for Object.entries
if (!Object.entries) {
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: `${process.env.SENTRY_DSN}`,
    environment: process.env.SENTRY_ENVIRONMENT,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);

  ReactDOM.render(<Root />, root);
});

if (module.hot) {
  module.hot.accept("./Root", () => {
    const NextRootContainer = require("./Root").default;
    ReactDOM.render(<NextRootContainer />, document.getElementById("AppRoot"));
  });
}
