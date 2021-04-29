import "intersection-observer"; // Intersection observer polyfill
import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

if (process.env.SENTRY_FRONTEND_DSN) {
  Sentry.init({
    dsn: `${process.env.SENTRY_FRONTEND_DSN}`,
    environment: process.env.SENTRY_ENVIRONMENT,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
      }),
    ],
    tracesSampleRate: 0.2,
  });

  Sentry.setContext("session", {
    page_load: new Date().toISOString(),
    released_at: process.env.RELEASED_AT,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);
  ReactDOM.render(<Root history={history} />, root);
});
