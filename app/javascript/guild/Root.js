import React from "react";
import { Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "@advisable-main/graphqlClient";
import "@advisable-main/i18n";
import App from "./App";

const Root = ({ history }) => {
  return (
    <ApolloProvider client={client}>
      <Router history={history} basename="/guild">
        <App />
      </Router>
    </ApolloProvider>
  );
};

export default Root;
