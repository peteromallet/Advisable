import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as DonutProvider } from "@advisable/donut";
import client from "./apolloClient";
import Routes from "./Routes";
import Schema from "./components/schema";
import Resources from "./components/resources";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename="/advisatable">
        <DonutProvider>
          <Schema>
            <Resources>
              <Routes />
            </Resources>
          </Schema>
        </DonutProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
