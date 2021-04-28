import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "src/components/Route";
import { ApolloProvider } from "@apollo/client";
import client from "../src/graphqlClient";
import Header from "../src/components/Header";
import ApplicationProvider from "../src/components/ApplicationProvider";
import Application from "./views/Application";

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router basename="/internal">
        <ApplicationProvider>
          <Header />
          <Switch>
            <Route path="/applications/:id" component={Application} />
            <Route>Route not found</Route>
          </Switch>
        </ApplicationProvider>
      </Router>
    </ApolloProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.id = "AppRoot";
  document.body.appendChild(root);
  ReactDOM.render(<Root />, root);
});
