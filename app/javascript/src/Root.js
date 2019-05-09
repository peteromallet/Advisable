import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import client from "./graphqlClient";

import "./i18n";
import App from "./App";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
