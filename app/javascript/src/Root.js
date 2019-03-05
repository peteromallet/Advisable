import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./graphqlClient";
import BaseStyling from "./BaseStyling";
import Routes from "./Routes";
import RootErrorBoundary from "./views/RootErrorBoundary";

import "./i18n";
import { NotificationsProvider } from "./components/Notifications";

const Root = () => {
  return (
    <React.Fragment>
      <BaseStyling />
      <RootErrorBoundary>
        <ApolloProvider client={client}>
          <NotificationsProvider>
            <Routes />
          </NotificationsProvider>
        </ApolloProvider>
      </RootErrorBoundary>
    </React.Fragment>
  );
};

export default Root;
