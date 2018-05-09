import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import "./reset.css.js";
import Project from "./views/Project";
import ApplicationContainer from './components/ApplicationContainer';

const client = new ApolloClient({
  uri: "/graphql",
  fetchOptions: {
    credentials: "same-origin"
  },
  request: operation => {
    const csrfToken = document
      .querySelector("meta[name=csrf-token]")
      .getAttribute("content");
    operation.setContext({
      headers: { "X-CSRF-Token": csrfToken }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ApplicationContainer>
          <Route path="/projects/:projectID" component={Project} />
        </ApplicationContainer>
      </BrowserRouter>
    </ApolloProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
