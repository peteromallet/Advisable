import "intersection-observer"; // Intersection observer polyfill
import ReactDOM from "react-dom";
import Root from "./Root";
import * as Sentry from "@sentry/react";

if (process.env.SENTRY_FRONTEND_DSN) {
  Sentry.init({
    dsn: `${process.env.SENTRY_FRONTEND_DSN}`,
    environment: process.env.SENTRY_ENVIRONMENT,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);
  ReactDOM.render(<Root />, root);
});
