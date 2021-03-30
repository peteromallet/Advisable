import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import client from "./apolloClient";
import Routes from "./Routes";
import Schema from "./components/schema";
import { NotificationsProvider } from "src/components/Notifications";
import { BaseStyles } from "./styles";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename="/toby">
        <NotificationsProvider>
          <DonutProvider>
            <BaseStyles />
            <Schema>
              <Routes />
            </Schema>
          </DonutProvider>
        </NotificationsProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
