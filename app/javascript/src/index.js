import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { ApolloProvider } from "react-apollo";
import client from "./graphqlClient";
import BaseStyling from './BaseStyling';
import { BrowserRouter, Route } from "react-router-dom";
import Root from './Root';

import './i18n';
import App from "./App";
import { NotificationsProvider } from "./components/Notifications";

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);

  ReactDOM.render(
    <ApolloProvider client={client}>
      <IntlProvider locale={language}>
          <NotificationsProvider>
            <BaseStyling />
            <BrowserRouter>
              <Route component={Root} />
            </BrowserRouter>
          </NotificationsProvider>
      </IntlProvider>
    </ApolloProvider>,
    root
  );
});
