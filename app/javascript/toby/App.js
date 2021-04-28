import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Router } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import client from "./apolloClient";
import Routes from "./Routes";
import Schema from "./components/schema";
import { NotificationsProvider } from "src/components/Notifications";
import { BaseStyles } from "./styles";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router basename="/toby">
        <NotificationsProvider>
          <DonutProvider>
            <BaseStyles />
            <Schema>
              <Routes />
            </Schema>
          </DonutProvider>
        </NotificationsProvider>
      </Router>
    </ApolloProvider>
  );
};

export default Root;
