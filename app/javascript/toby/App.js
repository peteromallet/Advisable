import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import client from "./apolloClient";
import Routes from "./Routes";
import { NotificationsProvider } from "src/components/Notifications";
import { BaseStyles } from "./styles";
import TobyProvider from "./components/TobyProvider";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router basename="/toby">
        <NotificationsProvider>
          <DonutProvider>
            <BaseStyles />
            <TobyProvider>
              <Routes />
            </TobyProvider>
          </DonutProvider>
        </NotificationsProvider>
      </Router>
    </ApolloProvider>
  );
};

export default Root;
