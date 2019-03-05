import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import client from "./graphqlClient";
import BaseStyling from "./BaseStyling";
import Routes from "./Routes";
import RootErrorBoundary from "./views/RootErrorBoundary";

import "./i18n";
import { NotificationsProvider } from "./components/Notifications";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);

  ReactDOM.render(
    <React.Fragment>
      <BaseStyling />
      <RootErrorBoundary>
        <ApolloProvider client={client}>
          <NotificationsProvider>
            <Routes />
          </NotificationsProvider>
        </ApolloProvider>
      </RootErrorBoundary>
    </React.Fragment>,
    root
  );
});
