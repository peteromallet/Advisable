import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "@advisable-main/graphqlClient";
import "@advisable-main/i18n";
import App from "./App";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename="/guild">
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
