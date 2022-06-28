import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import createClient from "./apolloClient";
import Routes from "./Routes";
import { NotificationsProvider } from "src/components/Notifications";
import { BaseStyles } from "./styles";
import TobyProvider, { useToby } from "./components/TobyProvider";

function Apollo({ children }) {
  const { resources } = useToby();
  const client = createClient(resources);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

const Root = () => {
  return (
    <TobyProvider>
      <Apollo>
        <Router basename="/toby">
          <NotificationsProvider>
            <DonutProvider>
              <BaseStyles />
              <Routes />
            </DonutProvider>
          </NotificationsProvider>
        </Router>
      </Apollo>
    </TobyProvider>
  );
};

export default Root;
