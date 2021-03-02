import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import client from "./apolloClient";
import Routes from "./Routes";
import Schema from "./components/schema";
import { BaseStyles } from "./styles";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename="/toby">
        <DonutProvider>
          <BaseStyles />
          <Schema>
            <Routes />
          </Schema>
        </DonutProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
