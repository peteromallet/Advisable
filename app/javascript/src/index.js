import "intersection-observer"; // Intersection observer polyfill
import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import * as Sentry from "@sentry/react";
import "simplebar/dist/simplebar.min.css";
import "./tailwind.css";

if (process.env.SENTRY_FRONTEND_DSN) {
  // https://docs.sentry.io/clients/javascript/tips/
  Sentry.init({
    whitelistUrls: [/https?:\/\/\w*?.?advisable\.com/],
    dsn: `${process.env.SENTRY_FRONTEND_DSN}`,
    environment: process.env.SENTRY_ENVIRONMENT,
    ignoreErrors: [
      "top.GLOBALS",
      "originalCreateNotification",
      "canvas.contentDocument",
      "MyApp_RemoveAllHighlights",
      "http://tt.epicplay.com",
      "Can't find variable: ZiteReader",
      "jigsaw is not defined",
      "ComboSearch is not defined",
      "http://loading.retry.widdit.com/",
      "atomicFindClose",
      "fb_xd_fragment",
      "bmi_SafeAddOnload",
      "EBCallBackMessageReceived",
      "conduitPage",
      "_avast_submit",
    ],
    denyUrls: [
      // Google Adsense
      /pagead\/js/i,
      // Facebook flakiness
      /graph\.facebook\.com/i,
      // Facebook blocked
      /connect\.facebook\.net\/en_US\/all\.js/i,
      // Woopra flakiness
      /eatdifferent\.com\.woopra-ns\.com/i,
      /static\.woopra\.com\/js\/woopra\.js/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Other plugins
      /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    ],
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
  ReactDOM.render(<Root />, root);
});
