import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ApolloClient from "apollo-boost";
import { IntlProvider } from "react-intl";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./App";
import { NotificationsProvider } from "./components/Notifications";
import "./reset.css.js";

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: "/graphql",
  fetchOptions: {
    credentials: "same-origin"
  },
  request: operation => {
    const csrfToken = document
      .querySelector("meta[name=csrf-token]")
      .getAttribute("content");
    operation.setContext({
      headers: { "X-CSRF-Token": csrfToken }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <IntlProvider locale={language}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </IntlProvider>
    </ApolloProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
