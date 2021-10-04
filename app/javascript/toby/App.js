import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import client from "./apolloClient";
import Routes from "./Routes";
import Resources from "./components/resources";
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
            <Resources>
              <Schema>
                <Routes />
              </Schema>
            </Resources>
          </DonutProvider>
        </NotificationsProvider>
      </Router>
    </ApolloProvider>
  );
};

export default Root;
